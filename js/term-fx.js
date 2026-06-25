/**
 * 节气专题 · 全屏背景动画
 */
$(document).ready(function () {
  'use strict';

  var fx = $('body').attr('data-fx');
  var $layer = $('#termFxLayer');
  if (!$layer.length || !fx) return;

  switch (fx) {
    case 'rain':
      initRainFx($layer);
      break;
    case 'plum':
      initPlumFx($layer);
      break;
    case 'thunder':
      initThunderFx($layer);
      break;
    case 'magnolia':
      initMagnoliaFx($layer);
      break;
    case 'qingming':
      initQingmingFx($layer);
      break;
    case 'guyu':
      initGuyuFx($layer);
      break;
    default:
      if (typeof initGenericTermFx === 'function') {
        initGenericTermFx($layer, fx);
      }
      break;
  }
});

function initRainFx($layer) {
  $layer.addClass('fx-rain-scene');

  $layer.append('<div class="fx-rain-ink-vignette"></div>');
  $layer.append('<div class="fx-rain-mist-drift"></div>');
  $layer.append('<div class="fx-rain-mist-veil"></div>');

  var mist = $('<div class="fx-rain-mist"></div>');
  var jiangnan = $('<div class="fx-rain-jiangnan"></div>');
  var hills = $('<div class="fx-rain-hills"></div>');
  var water = $('<div class="fx-rain-water"><div class="fx-ripples"></div><div class="fx-leaf-ripples"></div></div>');
  $layer.append(mist, jiangnan, hills, water);

  for (var l = 0; l < 3; l++) {
    $layer.append(
      $('<div class="fx-rain-leaf"></div>').css({
        left: (18 + l * 22) + '%',
        bottom: (24 + l * 3) + '%',
        transform: 'rotate(' + (-30 + l * 8) + 'deg)'
      })
    );
  }

  for (var i = 0; i < 220; i++) {
    var left = Math.random() * 100;
    var delay = Math.random() * 6;
    var dur = 1.4 + Math.random() * 1.6;
    var len = 10 + Math.random() * 22;
    var opacity = 0.06 + Math.random() * 0.14;
    $layer.append(
      $('<div class="fx-rain-streak"></div>').css({
        left: left + '%',
        animationDelay: delay + 's',
        animationDuration: dur + 's',
        height: len + 'px',
        opacity: opacity
      })
    );
  }

  function addRipple($container, topRange) {
    var $r = $('<div class="fx-ripple"></div>').css({
      width: (8 + Math.random() * 12) + 'px',
      height: (8 + Math.random() * 12) + 'px',
      left: (10 + Math.random() * 80) + '%',
      top: topRange[0] + Math.random() * (topRange[1] - topRange[0]) + '%'
    });
    $container.append($r);
    setTimeout(function () { $r.remove(); }, 3200);
  }

  setInterval(function () {
    addRipple($layer.find('.fx-ripples'), [0, 75]);
  }, 1400);

  setInterval(function () {
    addRipple($layer.find('.fx-leaf-ripples'), [0, 55]);
  }, 2200);

  if (typeof window.DewDropFx !== 'undefined') {
    window.DewDropFx.init($layer[0], {
      count: 26,
      minSize: 10,
      maxSize: 28,
      speedMin: 0.85,
      speedMax: 2.2
    });
  }
}

function initPlumFx($layer) {
  $layer.addClass('fx-plum-scene');

  if (typeof window.PlumBlossomFx !== 'undefined') {
    window.PlumBlossomFx.init($layer[0], {
      count: 22,
      minSize: 22,
      maxSize: 44,
      speedMin: 0.35,
      speedMax: 1.1
    });
  }
}

function initThunderFx($layer) {
  $layer.addClass('fx-thunder-scene');

  for (var i = 0; i < 18; i++) {
    $layer.append(
      $('<div class="fx-apricot-petal"></div>').css({
        left: Math.random() * 100 + '%',
        animationDuration: (6 + Math.random() * 8) + 's',
        animationDelay: (Math.random() * 6) + 's'
      })
    );
  }

  for (var j = 0; j < 5; j++) {
    $layer.append(
      $('<div class="fx-bamboo-shoot"></div>').css({
        left: (10 + j * 18) + '%',
        animationDelay: (j * 0.8) + 's'
      })
    );
  }

  setInterval(function () {
    $layer.addClass('flash');
    setTimeout(function () { $layer.removeClass('flash'); }, 180);
  }, 4500 + Math.random() * 3000);
}

function initMagnoliaFx($layer) {
  $layer.addClass('fx-magnolia-scene');

  for (var i = 0; i < 20; i++) {
    $layer.append(
      $('<div class="fx-magnolia-petal"></div>').css({
        left: Math.random() * 100 + '%',
        animationDuration: (10 + Math.random() * 12) + 's',
        animationDelay: (Math.random() * 10) + 's'
      })
    );
  }

  for (var s = 0; s < 3; s++) {
    $layer.append(
      $('<div class="fx-swallow"></div>').css({
        top: (16 + s * 14) + '%',
        animationDuration: (16 + s * 4) + 's',
        animationDelay: (s * 3) + 's'
      })
    );
  }
}

function initQingmingFx($layer) {
  $layer.addClass('fx-qingming-scene');
  addLightShaft($layer);
  addClouds($layer, 4);

  if (typeof window.QingmingFx !== 'undefined') {
    window.QingmingFx.init($layer[0], {
      birdCount: 5,
      sproutCount: 24,
      spawnInterval: 4800
    });
  }
}

function initGuyuFx($layer) {
  $layer.addClass('fx-guyu-scene');
  $layer.append('<div class="fx-guyu-vignette"></div>');
  $layer.append('<div class="fx-guyu-mist"></div>');

  if (typeof window.GuyuFx !== 'undefined') {
    window.GuyuFx.init($layer[0], {
      fineCount: 300,
      midCount: 240,
      heavyCount: 140,
      rippleInterval: 550
    });
  } else {
    spawnRain($layer, 420, { fine: false, slow: false });
    addRippleFx($layer, 700);
  }
}

/* ========== 通用节气动效 ========== */

function addFxInkBase($layer) {
  $layer.addClass('fx-scene');
  $layer.append('<div class="fx-ink-bg"></div><div class="fx-ink-vignette"></div>');
}

function addFxMist($layer) {
  $layer.append('<div class="fx-mist-drift"></div><div class="fx-mist-breathe"></div>');
}

function spawnRain($layer, count, opts) {
  opts = opts || {};
  var n = count || 180;
  for (var i = 0; i < n; i++) {
    $layer.append(
      $('<div class="fx-rain-streak"></div>').css({
        left: Math.random() * 100 + '%',
        animationDelay: (Math.random() * 6) + 's',
        animationDuration: ((opts.slow ? 1.6 : 1.2) + Math.random() * (opts.slow ? 1.8 : 1.4)) + 's',
        height: (8 + Math.random() * (opts.fine ? 16 : 24)) + 'px',
        opacity: (opts.fine ? 0.05 : 0.08) + Math.random() * 0.12
      })
    );
  }
}

function spawnDrift($layer, cls, count, sizeRange, durRange) {
  for (var i = 0; i < count; i++) {
    var w = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
    $layer.append(
      $('<div class="' + cls + '"></div>').css({
        left: Math.random() * 100 + '%',
        width: w + 'px',
        height: (cls === 'fx-catkin' ? w * 0.5 : w * 0.65) + 'px',
        animationDuration: (durRange[0] + Math.random() * (durRange[1] - durRange[0])) + 's',
        animationDelay: (Math.random() * durRange[1]) + 's'
      })
    );
  }
}

function addRippleFx($layer, interval) {
  var $ripples = $('<div class="fx-water-band"><div class="fx-ripples"></div></div>');
  $layer.append($ripples);
  setInterval(function () {
    var $r = $('<div class="fx-ripple"></div>').css({
      width: (8 + Math.random() * 12) + 'px',
      height: (8 + Math.random() * 12) + 'px',
      left: (10 + Math.random() * 80) + '%',
      top: (20 + Math.random() * 60) + '%'
    });
    $ripples.find('.fx-ripples').append($r);
    setTimeout(function () { $r.remove(); }, 3000);
  }, interval || 1600);
}

function addSwallows($layer, n) {
  for (var s = 0; s < (n || 3); s++) {
    $layer.append(
      $('<div class="fx-swallow"></div>').css({
        top: (14 + s * 12) + '%',
        animationDuration: (18 + s * 5) + 's',
        animationDelay: (s * 2.5) + 's'
      })
    );
  }
}

function addClouds($layer, n) {
  for (var c = 0; c < (n || 4); c++) {
    $layer.append(
      $('<div class="fx-cloud"></div>').css({
        top: (12 + c * 14) + '%',
        animationDuration: (40 + c * 12) + 's',
        animationDelay: (c * 6) + 's'
      })
    );
  }
}

function addLightShaft($layer) {
  $layer.append('<div class="fx-light-shaft"></div>');
}

function addBamboo($layer) {
  for (var b = 0; b < 8; b++) {
    $layer.append(
      $('<div class="fx-bamboo-sway"></div>').css({
        left: (8 + b * 11) + '%',
        height: (35 + Math.random() * 25) + '%',
        animationDelay: (b * 0.4) + 's'
      })
    );
  }
}

function addFoliage($layer, n) {
  for (var f = 0; f < (n || 6); f++) {
    $layer.append(
      $('<div class="fx-foliage"></div>').css({
        left: (10 + f * 14) + '%',
        animationDelay: (f * 0.6) + 's'
      })
    );
  }
}

function addDew($layer, n) {
  for (var d = 0; d < (n || 20); d++) {
    $layer.append(
      $('<div class="fx-dew"></div>').css({
        left: (5 + Math.random() * 90) + '%',
        top: (40 + Math.random() * 45) + '%',
        animationDelay: (Math.random() * 4) + 's'
      })
    );
  }
}

function addDragonflies($layer) {
  for (var i = 0; i < 2; i++) {
    $layer.append(
      $('<div class="fx-dragonfly"></div>').css({
        animationDelay: (i * 5) + 's',
        animationDuration: (14 + i * 4) + 's'
      })
    );
  }
}

function initGenericTermFx($layer, fx) {
  addFxInkBase($layer);

  switch (fx) {
    case 'spring-breeze':
      addFxMist($layer);
      spawnDrift($layer, 'fx-catkin', 90, [3, 7], [14, 24]);
      addSwallows($layer, 4);
      break;
    case 'mist-rain-petal':
      addFxMist($layer);
      spawnRain($layer, 200, { fine: true, slow: true });
      spawnDrift($layer, 'fx-petal', 28, [6, 11], [16, 28]);
      break;
    case 'grain-rain':
      addFxMist($layer);
      spawnRain($layer, 160, { fine: true });
      spawnDrift($layer, 'fx-petal', 22, [5, 9], [14, 22]);
      addRippleFx($layer, 1800);
      break;
    case 'foliage':
      addLightShaft($layer);
      addFoliage($layer, 8);
      break;
    case 'cloud-light':
      addLightShaft($layer);
      addClouds($layer, 5);
      break;
    case 'pond-dragonfly':
      addFxMist($layer);
      addRippleFx($layer, 2000);
      addDragonflies($layer);
      spawnDrift($layer, 'fx-petal', 12, [5, 8], [18, 26]);
      break;
    case 'lotus':
      addFxMist($layer);
      addRippleFx($layer, 1500);
      addFoliage($layer, 5);
      break;
    case 'bamboo-shade':
      addLightShaft($layer);
      addBamboo($layer);
      break;
    case 'lotus-deep':
      addLightShaft($layer);
      addFoliage($layer, 7);
      addRippleFx($layer, 2200);
      break;
    case 'autumn-leaf':
      spawnDrift($layer, 'fx-leaf', 35, [8, 14], [12, 22]);
      addFxMist($layer);
      break;
    case 'thin-mist':
      addFxMist($layer);
      break;
    case 'dew-light':
      addFxMist($layer);
      addDew($layer, 28);
      break;
    case 'osmanthus':
      spawnDrift($layer, 'fx-petal', 30, [4, 8], [16, 26]);
      addFxMist($layer);
      break;
    case 'frost-mist':
      addFxMist($layer);
      addDew($layer, 12);
      break;
    case 'maple-leaf':
      spawnDrift($layer, 'fx-leaf', 40, [7, 13], [14, 24]);
      break;
    case 'winter-still':
      addFxMist($layer);
      break;
    case 'snow-light':
      spawnDrift($layer, 'fx-snow', 60, [2, 5], [16, 30]);
      addFxMist($layer);
      break;
    case 'snow-heavy':
      spawnDrift($layer, 'fx-snow', 110, [3, 8], [10, 22]);
      addFxMist($layer);
      break;
    case 'river-mist':
      addFxMist($layer);
      addRippleFx($layer, 2500);
      break;
    case 'wind-snow':
      spawnDrift($layer, 'fx-snow', 70, [2, 6], [8, 18]);
      addFxMist($layer);
      spawnRain($layer, 40, { fine: true, slow: true });
      break;
    case 'ice-snow':
      spawnDrift($layer, 'fx-snow', 50, [2, 4], [18, 32]);
      addFxMist($layer);
      break;
    default:
      addFxMist($layer);
      break;
  }
}
