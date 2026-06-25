/**
 * 首页加载屏 · jQuery + Bootstrap 进度条
 * 预加载 images/icon/icon.png，完成后进入首页
 */
(function ($) {
  'use strict';

  var ICON_SRC = '../images/icon/icon.png';
  var MIN_SHOW_MS = 1400;

  $(function () {
    var $loader = $('#siteLoader');
    if (!$loader.length) return;

    var started = Date.now();
    var progress = 0;
    var imageDone = false;
    var windowDone = false;
    var finished = false;
    var tickTimer;

    var $bar = $('#siteLoaderBar');
    var $percent = $('#siteLoaderPercent');
    var $icon = $('#siteLoaderIcon');

    function setProgress(next) {
      progress = Math.min(100, Math.max(progress, next));
      var val = Math.round(progress);
      $bar.css('width', val + '%').attr('aria-valuenow', val);
      $percent.text(val + '%');
    }

    function finish() {
      if (finished) return;
      finished = true;
      clearInterval(tickTimer);
      setProgress(100);

      setTimeout(function () {
        $loader.addClass('is-done');
        $('body').removeClass('is-loading').addClass('site-ready page-enter');
        setTimeout(function () {
          $loader.remove();
        }, 700);
      }, 320);
    }

    function tryFinish() {
      if (!imageDone || !windowDone || progress < 96) return;
      var elapsed = Date.now() - started;
      var delay = Math.max(0, MIN_SHOW_MS - elapsed);
      setTimeout(finish, delay);
    }

    tickTimer = setInterval(function () {
      if (finished) return;
      if (progress < 35 && !imageDone) {
        setProgress(progress + 0.6);
      } else if (progress < 88 && imageDone && !windowDone) {
        setProgress(progress + 0.35);
      } else if (progress < 96 && windowDone) {
        setProgress(progress + 0.5);
      }
    }, 40);

    var img = new Image();
    img.onload = function () {
      $icon.addClass('is-visible');
      imageDone = true;
      setProgress(Math.max(progress, 68));
      tryFinish();
    };
    img.onerror = function () {
      $icon.hide();
      $('#siteLoaderIconFallback').show();
      imageDone = true;
      setProgress(Math.max(progress, 68));
      tryFinish();
    };
    img.src = ICON_SRC;

    function onWindowLoad() {
      windowDone = true;
      setProgress(Math.max(progress, 90));
      tryFinish();
    }

    if (document.readyState === 'complete') {
      onWindowLoad();
    } else {
      $(window).on('load', onWindowLoad);
    }

    setTimeout(function () {
      if (!finished) {
        windowDone = true;
        imageDone = true;
        tryFinish();
      }
    }, 8000);
  });
})(jQuery);
