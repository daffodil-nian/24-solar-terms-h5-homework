/**
 * 二十四节气 · 滚动特效脚本
 * 渐显、视差、时间线动画
 */

(function ($) {
  'use strict';

  var revealObserver = null;

  function initScrollReveal() {
    var $reveals = $('.reveal:not(.visible)');

    if (revealObserver) {
      revealObserver.disconnect();
    }

    if ('IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            $(entry.target).addClass('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      $reveals.each(function () {
        revealObserver.observe(this);
      });
    } else {
      $reveals.addClass('visible');
    }
  }

  window.initScrollReveal = initScrollReveal;

  $(document).ready(function () {
    initScrollReveal();

    /* ---- 视差慢推 ---- */
    var $heroBg = $('.hero-bg, .ocean-deep');
    if ($heroBg.length) {
      $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        var rate = scrollTop * 0.25;
        $('.hero-bg').css('transform', 'scale(1.08) translateY(' + rate + 'px)');
        $('.ocean-deep').css('transform', 'scale(1) translateY(' + (rate * 0.5) + 'px)');
        $('.ocean-mid').css('transform', 'translateY(' + (rate * 0.3) + 'px)');
      });
    }

    /* ---- 时间线交错显现 ---- */
    var $timelineItems = $('.timeline-item');
    if ($timelineItems.length && 'IntersectionObserver' in window) {
      var timelineObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var $item = $(entry.target);
            var delay = $item.index() * 200;
            setTimeout(function () {
              $item.addClass('show');
            }, delay);
            timelineObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      $timelineItems.each(function () {
        timelineObserver.observe(this);
      });
    }

    /* ---- 平滑锚点滚动 ---- */
    $('a[href^="#"]').on('click', function (e) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 70
        }, 1200, 'swing');
      }
    });

    /* ---- 滚动进度指示 ---- */
    var $progressBar = $('#scrollProgress');
    if ($progressBar.length) {
      $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height() - $(window).height();
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        $progressBar.css('width', progress + '%');
      });
    }

    /* ---- 数字计数动画 ---- */
    $('.count-up').each(function () {
      var $el = $(this);
      var target = parseInt($el.data('target'), 10);

      if ('IntersectionObserver' in window) {
        var countObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount($el, target);
              countObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });

        countObserver.observe(this);
      }
    });

    function animateCount($el, target) {
      var current = 0;
      var step = Math.ceil(target / 40);
      var timer = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        $el.text(current);
      }, 40);
    }

  });
})(jQuery);
