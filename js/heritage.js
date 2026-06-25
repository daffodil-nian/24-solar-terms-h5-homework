/**
 * 四时之约 · 时序人物动画 + 页面配乐自动播放
 */
$(document).ready(function () {
  'use strict';

  var cfg = window.heritageConfig || {};
  var audioCfg = cfg.audio || {};
  var audioSrc = audioCfg.file ? '../media/heritage/' + audioCfg.file : '';

  if (audioCfg.title) {
    $('#heritageAudioTitle').text(audioCfg.title);
  }
  if (audioCfg.artist) {
    $('#heritageAudioArtist').text(audioCfg.artist);
  }
  if (audioCfg.desc) {
    $('#heritageAudioDesc').text(audioCfg.desc);
  }

  var $card = $('#heritageAudioCard');
  if (audioSrc && $card.length) {
    $card.attr('data-audio', audioSrc);
    $card.attr('data-heritage-managed', 'true');
  }

  initEraTimeline();
  initHeritageAudio();
});

function initEraTimeline() {
  var $eras = $('.heritage-era');
  var $track = $('.heritage-era-track');
  if (!$eras.length || !$track.length) return;

  var activeIndex = 0;
  var cycleTimer = null;

  function setActiveEra(index) {
    activeIndex = index;
    $eras.removeClass('is-active').attr('aria-pressed', 'false');
    $eras.eq(index).addClass('is-active').attr('aria-pressed', 'true');
    $track.attr('data-active-era', String(index));
  }

  function startCycle() {
    stopCycle();
    cycleTimer = setInterval(function () {
      setActiveEra((activeIndex + 1) % $eras.length);
    }, 5500);
  }

  function stopCycle() {
    if (cycleTimer) {
      clearInterval(cycleTimer);
      cycleTimer = null;
    }
  }

  $eras.on('click', function () {
    setActiveEra($eras.index(this));
    startCycle();
  });

  if ('IntersectionObserver' in window) {
    var trackObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $track.addClass('is-animating');
          startCycle();
        } else {
          $track.removeClass('is-animating');
          stopCycle();
        }
      });
    }, { threshold: 0.35 });

    trackObserver.observe($track[0]);
  } else {
    $track.addClass('is-animating');
    startCycle();
  }

  setActiveEra(0);
}

function initHeritageAudio() {
  var $card = $('#heritageAudioCard');
  if (!$card.length) return;

  var audioSrc = $card.data('audio');
  if (!audioSrc) return;

  var userStopped = false;
  var pageLeaving = false;
  var needGesture = false;
  var $hint = null;

  function ensureAudio() {
    var $audio = $card.find('audio');
    if (!$audio.length) {
      $audio = $('<audio preload="auto" playsinline><source src="' + audioSrc + '" type="audio/mpeg"></audio>');
      $card.append($audio);
    }
    return $audio[0];
  }

  function setPlayingUi(playing) {
    $card.toggleClass('playing', playing);
    $card.find('.play-icon').html(playing ? '&#9646;&#9646;' : '&#9654;');
    if (!playing) {
      $card.find('.audio-progress-fill').css('width', '0%');
    }
    if (playing && $hint) {
      $hint.remove();
      $hint = null;
    }
  }

  function showGestureHint() {
    if ($hint || userStopped) return;
    if (!$card.closest('.heritage-audio-wrap').find('.heritage-audio-autoplay-hint').length) {
      $hint = $('<p class="heritage-audio-autoplay-hint">点击页面任意处，开始播放《Forever Young》</p>');
      $card.closest('.heritage-audio-wrap').append($hint);
    }
  }

  function pauseGlobalBgm() {
    if (window.SiteBgm && typeof window.SiteBgm.pauseForPage === 'function') {
      window.SiteBgm.pauseForPage();
    }
  }

  function releaseGlobalBgm() {
    if (window.SiteBgm && typeof window.SiteBgm.releasePageHold === 'function') {
      window.SiteBgm.releasePageHold();
    }
  }

  function playHeritage(fromUser) {
    if (userStopped && !fromUser) return;

    var audio = ensureAudio();
    pauseGlobalBgm();

    var promise = audio.play();
    if (promise && typeof promise.then === 'function') {
      promise.then(function () {
        needGesture = false;
        setPlayingUi(true);
      }).catch(function () {
        needGesture = true;
        setPlayingUi(false);
        showGestureHint();
      });
    } else {
      setPlayingUi(!audio.paused);
    }
  }

  function pauseHeritage(fromUser) {
    var audio = $card.find('audio')[0];
    if (!audio) return;
    audio.pause();
    setPlayingUi(false);
    if (fromUser) {
      userStopped = true;
    }
  }

  window.HeritagePageAudio = {
    play: function () { playHeritage(true); },
    pause: function (fromUser) { pauseHeritage(!!fromUser); },
    isUserStopped: function () { return userStopped; }
  };

  ensureAudio().addEventListener('pause', function () {
    if (pageLeaving || this.ended) return;
    if (!this.paused) return;
    setPlayingUi(false);
    userStopped = true;
  });

  ensureAudio().addEventListener('play', function () {
    userStopped = false;
    pauseGlobalBgm();
    setPlayingUi(true);
  });

  ensureAudio().addEventListener('timeupdate', function () {
    if (this.duration) {
      var percent = (this.currentTime / this.duration) * 100;
      $card.find('.audio-progress-fill').css('width', percent + '%');
    }
  });

  ensureAudio().addEventListener('ended', function () {
    setPlayingUi(false);
  });

  $card.on('click', function (e) {
    e.stopPropagation();
    var audio = ensureAudio();
    if (audio.paused) {
      userStopped = false;
      playHeritage(true);
    } else {
      pauseHeritage(true);
    }
  });

  $(document).one('click.heritageAutoplay touchstart.heritageAutoplay', function (e) {
    if ($(e.target).closest('#siteBgmToggle').length) return;
    if (needGesture && !userStopped) {
      playHeritage(false);
    }
  });

  $(window).on('pagehide.heritageAudio beforeunload.heritageAudio', function () {
    pageLeaving = true;
    pauseHeritage(false);
    releaseGlobalBgm();
  });

  pauseGlobalBgm();
  playHeritage(false);
}
