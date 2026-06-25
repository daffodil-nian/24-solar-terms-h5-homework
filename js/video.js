/**
 * 二十四节气 · 音视频交互脚本
 * 自定义影视播放器控件（支持同一页多个播放器）
 */

function initSingleFilmPlayer($wrap) {
  'use strict';

  var $player = $wrap.find('.film-video-player').first();
  if (!$player.length || $player.data('player-init')) return;

  var video = $player[0];
  var $playBtn = $wrap.find('.video-play-btn, #videoPlayBtn').first();
  var $muteBtn = $wrap.find('.video-mute-btn, #videoMuteBtn').first();
  var $progressWrap = $wrap.find('.video-progress-wrap, #videoProgress').first();
  var $progressFill = $wrap.find('.video-progress-fill, #videoProgressFill').first();
  var $currentTime = $wrap.find('.video-current-time, #videoCurrentTime').first();
  var $duration = $wrap.find('.video-duration, #videoDuration').first();
  var $qualityBtn = $wrap.find('.video-quality-btn, #videoQualityBtn').first();

  function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function updateProgress() {
    if (video.duration) {
      var percent = (video.currentTime / video.duration) * 100;
      $progressFill.css('width', percent + '%');
      $currentTime.text(formatTime(video.currentTime));
    }
  }

  $playBtn.on('click', function () {
    if (video.paused) {
      video.play();
      $playBtn.html('&#9646;&#9646;').addClass('active');
    } else {
      video.pause();
      $playBtn.html('&#9654;').removeClass('active');
    }
  });

  $muteBtn.on('click', function () {
    video.muted = !video.muted;
    $muteBtn.html(video.muted ? '&#128263;' : '&#128264;');
    $muteBtn.toggleClass('active', video.muted);
  });

  $progressWrap.on('click', function (e) {
    var offset = $(this).offset();
    var width = $(this).width();
    var clickX = e.pageX - offset.left;
    var percent = clickX / width;
    if (video.duration) {
      video.currentTime = percent * video.duration;
    }
  });

  video.addEventListener('timeupdate', updateProgress);

  function markReady() {
    $wrap.removeClass('film-player--unavailable').addClass('film-player--ready');
  }

  function markUnavailable() {
    $wrap.addClass('film-player--unavailable').removeClass('film-player--ready');
  }

  video.addEventListener('loadedmetadata', function () {
    if (video.duration && isFinite(video.duration)) {
      $duration.text(formatTime(video.duration));
      markReady();
    }
  });

  video.addEventListener('error', markUnavailable);

  video.addEventListener('emptied', function () {
    if (video.error) markUnavailable();
  });

  video.addEventListener('playing', function () {
    $wrap.addClass('film-player--playing');
  });

  video.addEventListener('pause', function () {
    $wrap.removeClass('film-player--playing');
  });

  video.addEventListener('ended', function () {
    $playBtn.html('&#9654;').removeClass('active');
    $wrap.removeClass('film-player--playing');
  });

  if (video.readyState >= 1 && video.duration && isFinite(video.duration)) {
    markReady();
  } else {
    window.setTimeout(function () {
      if (video.error || (video.networkState === 3 && !video.duration)) {
        markUnavailable();
      }
    }, 1200);
  }

  if ($qualityBtn.length) {
    $qualityBtn.on('click', function () {
      var qualities = ['标清 480P', '高清 720P', '超清 1080P'];
      var current = $(this).data('quality') || 0;
      current = (current + 1) % qualities.length;
      $(this).data('quality', current);
      $(this).text(qualities[current]);
    });
  }

  $(video).on('click', function () {
    $playBtn.trigger('click');
  });

  $player.data('player-init', true);
}

function initFilmVideoPlayer($root) {
  'use strict';

  $root = $root || $(document);

  $root.find('.film-player').each(function () {
    initSingleFilmPlayer($(this));
  });

  if (!$root.find('.film-player').length) {
    var $legacy = $root.find('#filmVideoPlayer, .film-video-player').first();
    if ($legacy.length) {
      initSingleFilmPlayer($legacy.closest('.film-player').length ? $legacy.closest('.film-player') : $legacy.parent());
    }
  }
}

window.initFilmVideoPlayer = initFilmVideoPlayer;

$(document).ready(function () {
  'use strict';

  initFilmVideoPlayer();

  /* ---- 音频播放器 ---- */
  var currentAudio = null;
  var currentAudioCard = null;

  $(document).on('click', '.audio-card:not([data-heritage-managed])', function () {
    var $card = $(this);
    var audioSrc = $card.data('audio');
    var $audio = $card.find('audio');

    if (!$audio.length && audioSrc) {
      $audio = $('<audio preload="metadata"><source src="' + audioSrc + '" type="audio/mpeg"></audio>');
      $card.append($audio);
    }

    var audio = $audio[0];

    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      if (currentAudioCard) {
        currentAudioCard.removeClass('playing');
        currentAudioCard.find('.play-icon').html('&#9654;');
        currentAudioCard.find('.audio-progress-fill').css('width', '0%');
      }
    }

    if (audio.paused) {
      audio.play();
      $card.addClass('playing');
      $card.find('.play-icon').html('&#9646;&#9646;');
      currentAudio = audio;
      currentAudioCard = $card;
    } else {
      audio.pause();
      $card.removeClass('playing');
      $card.find('.play-icon').html('&#9654;');
      currentAudio = null;
      currentAudioCard = null;
    }
  });

  $(document).on('timeupdate', '.audio-card audio', function () {
    var audio = this;
    var $card = $(audio).closest('.audio-card');
    if (audio.duration) {
      var percent = (audio.currentTime / audio.duration) * 100;
      $card.find('.audio-progress-fill').css('width', percent + '%');
    }
  });

  $(document).on('ended', '.audio-card audio', function () {
    var $card = $(this).closest('.audio-card');
    $card.removeClass('playing');
    $card.find('.play-icon').html('&#9654;');
    $card.find('.audio-progress-fill').css('width', '0%');
    currentAudio = null;
    currentAudioCard = null;
  });

  /* ---- 媒体标签切换 ---- */
  $('.media-tab').on('click', function () {
    var tab = $(this).data('tab');
    $('.media-tab').removeClass('active');
    $(this).addClass('active');
    $('.media-panel').hide();
    $('#' + tab + 'Panel').fadeIn(800);
  });
});
