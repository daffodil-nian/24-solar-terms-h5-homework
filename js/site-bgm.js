/**
 * 背景音乐 · 多首循环播放
 * 文件命名：bg_music.mp3、bg_music_2.mp3、bg_music_3.mp3 …
 * 放在 media/ 目录，改 config.count 为歌曲数量
 */
(function ($) {
  'use strict';

  var config = {
    dir: '',
    baseName: 'bg_music',
    ext: '.mp3',
    count: 3,
    volume: 0.5,
    files: null
  };

  /** 根据 site-bgm.js 所在路径推算 media/ 目录 */
  function resolveMediaDir() {
    var scripts = document.getElementsByTagName('script');
    var i;
    for (i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src') || '';
      if (src.indexOf('site-bgm.js') !== -1) {
        return src.replace(/js\/site-bgm\.js(\?.*)?$/, 'media/');
      }
    }
    return '../media/';
  }

  var $audio = null;
  var playlist = [];
  var currentIndex = 0;
  var isPlaying = false;
  var needGesture = false;
  var userPaused = false;
  var skipErrors = 0;
  var pendingSeek = 0;
  var STORAGE_KEY = 'siteBgmState';
  var pageHold = false;
  var resumeAfterPageHold = false;

  function isHomePage() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    return page === 'index.html' || document.body.classList.contains('home-page');
  }

  function shouldAutoplayHome() {
    return isHomePage() && config.autoplayHome !== false;
  }

  function saveState() {
    if (!$audio || !$audio.length) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        index: currentIndex,
        time: $audio[0].currentTime || 0,
        paused: userPaused
      }));
    } catch (e) { /* ignore */ }
  }

  function readState() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function applyUiConfig() {
    var ui = $.extend({
      icon: '♫',
      right: '1rem',
      top: 'calc(56px + 0.75rem)',
      size: '44px',
      zIndex: 10050
    }, config.ui || {});

    var root = document.documentElement;

    root.style.setProperty('--site-bgm-top', ui.top);
    root.style.setProperty('--site-bgm-right', ui.right);
    root.style.setProperty('--site-bgm-size', ui.size);
    root.style.setProperty('--site-bgm-z', String(ui.zIndex));
  }

  function buildPlaylist() {
    if ($.isArray(config.files) && config.files.length) {
      return config.files.slice();
    }
    var dir = config.dir || resolveMediaDir();
    var list = [dir + config.baseName + config.ext];
    var i;
    for (i = 2; i <= config.count; i++) {
      list.push(dir + config.baseName + '_' + i + config.ext);
    }
    return list;
  }

  function updateToggleUi() {
    var $btn = $('#siteBgmToggle');
    if (!$btn.length) return;
    $btn.toggleClass('is-playing', isPlaying);
    $btn.toggleClass('needs-tap', needGesture && !isPlaying && !userPaused);
    $btn.removeClass('is-error');
    $btn.attr('aria-label', isPlaying ? '暂停背景音乐' : '播放背景音乐');
    if (needGesture && !isPlaying && !userPaused) {
      $btn.attr('title', '点击开启音乐（' + (currentIndex + 1) + '/' + playlist.length + '）');
    } else if (isPlaying) {
      $btn.attr('title', '暂停 · 第 ' + (currentIndex + 1) + ' 首');
    } else {
      $btn.attr('title', '播放 · 第 ' + (currentIndex + 1) + ' 首');
    }
  }

  function loadTrack(index, seekTime) {
    if (!playlist.length) return;
    currentIndex = index;
    skipErrors = 0;
    pendingSeek = seekTime || 0;
    $audio.attr('src', playlist[currentIndex]);
    $audio[0].load();
    updateToggleUi();
  }

  function playNext() {
    if (!playlist.length || userPaused) return;
    var next = (currentIndex + 1) % playlist.length;
    loadTrack(next);
  }

  function tryPlay() {
    if (!$audio || !$audio.length || userPaused || pageHold) return;

    var playPromise = $audio[0].play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.then(function () {
        isPlaying = true;
        needGesture = false;
        updateToggleUi();
        saveState();
      }).catch(function () {
        isPlaying = false;
        needGesture = true;
        updateToggleUi();
      });
    }
  }

  function pauseForPage() {
    pageHold = true;
    resumeAfterPageHold = isPlaying && !userPaused;
    if ($audio && $audio.length && !$audio[0].paused) {
      $audio[0].pause();
      isPlaying = false;
      updateToggleUi();
    }
  }

  function releasePageHold() {
    if (!pageHold) return;
    pageHold = false;
    if (resumeAfterPageHold && !userPaused) {
      tryPlay();
    }
    resumeAfterPageHold = false;
  }

  function pauseBgm() {
    if (!$audio || !$audio.length) return;
    userPaused = true;
    $audio[0].pause();
    isPlaying = false;
    needGesture = false;
    updateToggleUi();
    saveState();
  }

  function resumeBgm() {
    userPaused = false;
    tryPlay();
  }

  function toggleBgm() {
    if (!$audio || !$audio.length) return;
    if (pageHold) {
      pageHold = false;
      resumeAfterPageHold = false;
      if (window.HeritagePageAudio && typeof window.HeritagePageAudio.pause === 'function') {
        window.HeritagePageAudio.pause(true);
      }
    }
    if ($audio[0].paused || userPaused) {
      userPaused = false;
      tryPlay();
    } else {
      pauseBgm();
    }
  }

  function onCanPlay() {
    if (pendingSeek > 0 && $audio[0].duration > pendingSeek) {
      $audio[0].currentTime = pendingSeek;
      pendingSeek = 0;
    }
    if (!userPaused && !pageHold) {
      tryPlay();
    }
  }

  function onTrackError() {
    isPlaying = false;
    skipErrors += 1;
    if (skipErrors >= playlist.length) {
      needGesture = false;
      $('#siteBgmToggle').addClass('is-error').attr('title', '找不到音乐文件，请检查 media/bg_music.mp3 等');
      updateToggleUi();
      return;
    }
    playNext();
  }

  function ensureFloatingUi() {
    var $btn = $('#siteBgmToggle');
    var $aud = $('#siteBgm');
    if ($btn.length && !$btn.parent().is('body')) {
      $btn.detach().appendTo('body');
    }
    if ($aud.length && !$aud.parent().is('body')) {
      $aud.detach().appendTo('body');
    }
  }

  function bindGestureRetry() {
    function retryFromGesture() {
      if (needGesture && !userPaused && !pageHold) {
        tryPlay();
      }
    }

    $(document).on('click.siteBgmGesture touchstart.siteBgmGesture keydown.siteBgmGesture', retryFromGesture);

    if (shouldAutoplayHome()) {
      $(window).one('scroll.siteBgmGesture wheel.siteBgmGesture', retryFromGesture);
    }
  }

  function scheduleHomeAutoplay() {
    if (!shouldAutoplayHome() || userPaused || pageHold) return;

    tryPlay();
    setTimeout(function () {
      if (!isPlaying && !userPaused) tryPlay();
    }, 350);
    $(window).one('load.siteBgmHome', function () {
      if (!isPlaying && !userPaused) tryPlay();
    });
  }

  function initSiteBgm(userConfig) {
    if (userConfig) {
      $.extend(config, userConfig);
    }

    playlist = buildPlaylist();
    if (!playlist.length) return;

    if (!$('#siteBgm').length) {
      var icon = (config.ui && config.ui.icon) ? config.ui.icon : '♫';
      $('body').append(
        '<audio id="siteBgm" preload="auto" playsinline></audio>' +
        '<button type="button" id="siteBgmToggle" class="site-bgm-btn" aria-label="背景音乐">' + icon + '</button>'
      );
    }

    applyUiConfig();
    ensureFloatingUi();

    $audio = $('#siteBgm');
    $audio[0].volume = config.volume;

    $audio.off('.siteBgm');
    $audio.on('canplaythrough.siteBgm loadeddata.siteBgm', onCanPlay);
    $audio.on('ended.siteBgm', function () {
      if (!userPaused) playNext();
    });
    $audio.on('error.siteBgm', onTrackError);

    $('#siteBgmToggle').off('click.siteBgm').on('click.siteBgm', function (e) {
      e.preventDefault();
      toggleBgm();
    });

    bindGestureRetry();

    var saved = readState();
    var startIdx = 0;
    var startSeek = 0;

    if (shouldAutoplayHome()) {
      userPaused = false;
      if (saved && typeof saved.index === 'number') {
        startIdx = Math.max(0, Math.min(saved.index, playlist.length - 1));
        startSeek = saved.time || 0;
      }
    } else if (saved && typeof saved.index === 'number') {
      startIdx = Math.max(0, Math.min(saved.index, playlist.length - 1));
      startSeek = saved.time || 0;
      userPaused = !!saved.paused;
    }

    loadTrack(startIdx, startSeek);
    scheduleHomeAutoplay();

    $(window).on('pagehide.siteBgm beforeunload.siteBgm', saveState);
  }

  window.SiteBgm = {
    init: initSiteBgm,
    applyUi: applyUiConfig,
    config: config,
    play: resumeBgm,
    pause: pauseBgm,
    pauseForPage: pauseForPage,
    releasePageHold: releasePageHold,
    toggle: toggleBgm,
    next: playNext,
    getPlaylist: function () { return playlist.slice(); },
    getCurrentIndex: function () { return currentIndex; },
    isPageHold: function () { return pageHold; }
  };

  $(function () {
    if ($('body').data('bgm') === false) return;
    initSiteBgm(window.SiteBgmConfig || null);
  });

})(jQuery);
