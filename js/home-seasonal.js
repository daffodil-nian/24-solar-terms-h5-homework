/**
 * 首页 · 时令增强脚本
 * 依赖 $.solarTerm（terms-data.js）
 */
(function ($, window) {
  'use strict';

  var seasonLabelFull = { spring: '春季', summer: '夏季', autumn: '秋季', winter: '冬季' };
  var seasonMap = {
    spring: 'season-spring-active',
    summer: 'season-summer-active',
    autumn: 'season-autumn-active',
    winter: 'season-winter-active'
  };

  function getCurrentTermIndex() {
    return $.solarTerm ? $.solarTerm.getIndex() : 0;
  }

  function updateTodayChipEnhanced() {
    if (!$.solarTerm) return;
    var term = $.solarTerm.getCurrent();
    var next = $.solarTerm.getNext();

    var $chip = $('#todayTermChipEnhanced');
    if ($chip.length) {
      $chip.find('#todayTermNameEnhanced').text('今日 · ' + term.name);
      $chip.find('#todaySeasonLabel').text(seasonLabelFull[term.season]);
      $chip.find('#todayCountdown').text('距' + next.name + '还有 ' + next.days + ' 天');
    }

    var $body = $('body.home-page');
    $.each(seasonMap, function (_, cls) {
      $body.removeClass(cls);
    });
    $body.addClass(seasonMap[term.season]);

    $('#todayTermName').text('今日 · ' + term.name);
    $('#todayTermMeta').text(term.date + ' · ' + seasonLabelFull[term.season]);
  }

  function spawnSeasonParticles() {
    var $container = $('#seasonParticlesEl');
    if (!$container.length) return;

    var season = $.solarTerm ? $.solarTerm.getCurrent().season : 'summer';
    $container.empty();

    var particleConfig = {
      summer: { count: 30, types: ['gold', 'warm', 'firefly'], minSize: 2, maxSize: 7, minDur: 8, maxDur: 18 },
      spring: { count: 20, types: ['warm'], minSize: 2, maxSize: 5, minDur: 10, maxDur: 22 },
      autumn: { count: 22, types: ['gold', 'warm'], minSize: 2, maxSize: 6, minDur: 9, maxDur: 20 },
      winter: { count: 18, types: ['warm'], minSize: 1, maxSize: 4, minDur: 12, maxDur: 25 }
    };

    var config = particleConfig[season] || particleConfig.summer;

    for (var i = 0; i < config.count; i++) {
      var type = config.types[Math.floor(Math.random() * config.types.length)];
      var size = config.minSize + Math.random() * (config.maxSize - config.minSize);
      var left = Math.random() * 100;
      var duration = config.minDur + Math.random() * (config.maxDur - config.minDur);
      var delay = Math.random() * duration;

      var $particle = $('<div class="season-particle ' + type + '"></div>');
      $particle.css({
        width: size + 'px',
        height: size + 'px',
        left: left + '%',
        bottom: '-10px',
        animation: 'particleRiseSeasonal ' + duration + 's ' + delay + 's linear infinite',
        opacity: 0.3 + Math.random() * 0.5
      });

      $container.append($particle);
    }
  }

  function injectSeasonalKeyframes() {
    var styleId = 'seasonal-keyframes';
    if (document.getElementById(styleId)) return;

    var style = document.createElement('style');
    style.id = styleId;
    style.textContent =
      '@keyframes particleRiseSeasonal {' +
      '  0%   { transform: translateY(0) translateX(0) scale(0.5); opacity: 0; }' +
      '  8%   { opacity: 0.7; }' +
      '  85%  { opacity: 0.35; }' +
      '  100% { transform: translateY(-105vh) translateX(' + (Math.random() > 0.5 ? '' : '-') + '40px) scale(1.1); opacity: 0; }' +
      '}';
    document.head.appendChild(style);
  }

  $(document).ready(function () {
    injectSeasonalKeyframes();
    updateTodayChipEnhanced();
    spawnSeasonParticles();
  });

  window.updateTodayChipEnhanced = updateTodayChipEnhanced;
  window.spawnSeasonParticles = spawnSeasonParticles;

})(jQuery, window);
