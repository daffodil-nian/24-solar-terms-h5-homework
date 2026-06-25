/**
 * 谷雨 · 密集降水动效（雨生百谷，雨量显著增加）
 */
(function (window) {
  'use strict';

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function spawnRainLayer(container, className, count, opts) {
    opts = opts || {};
    for (var i = 0; i < count; i += 1) {
      var el = document.createElement('div');
      el.className = className;
      el.style.left = Math.random() * 100 + '%';
      el.style.animationDelay = rand(0, opts.delayMax || 5) + 's';
      el.style.animationDuration = rand(opts.durMin || 0.5, opts.durMax || 1.2) + 's';
      el.style.height = rand(opts.hMin || 12, opts.hMax || 28) + 'px';
      el.style.opacity = String(rand(opts.oMin || 0.08, opts.oMax || 0.2));
      if (opts.width) {
        el.style.width = opts.width + 'px';
      }
      container.appendChild(el);
    }
  }

  function addRipple(container, topRange) {
    var ripple = document.createElement('div');
    ripple.className = 'gy-ripple';
    ripple.style.width = rand(10, 22) + 'px';
    ripple.style.height = ripple.style.width;
    ripple.style.left = rand(8, 88) + '%';
    ripple.style.top = rand(topRange[0], topRange[1]) + '%';
    container.appendChild(ripple);
    window.setTimeout(function () {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 2800);
  }

  function GuyuFx(container, options) {
    this.container = container;
    this.options = Object.assign({
      fineCount: 300,
      midCount: 240,
      heavyCount: 140,
      rippleInterval: 550
    }, options || {});
    this.rippleTimer = null;
    this.rippleRoot = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  GuyuFx.prototype.mount = function () {
    if (this.container.querySelector('.gy-rain-stage')) return;

    var stage = document.createElement('div');
    stage.className = 'gy-rain-stage';
    this.container.appendChild(stage);

    if (this.reducedMotion) {
      spawnRainLayer(stage, 'gy-rain gy-rain--mid', 40, { durMin: 1.2, durMax: 2, oMax: 0.12 });
      return;
    }

    spawnRainLayer(stage, 'gy-rain gy-rain--fine', this.options.fineCount, {
      hMin: 8, hMax: 18, durMin: 0.7, durMax: 1.3, oMin: 0.06, oMax: 0.14, delayMax: 4
    });
    spawnRainLayer(stage, 'gy-rain gy-rain--mid', this.options.midCount, {
      hMin: 14, hMax: 30, durMin: 0.55, durMax: 1.0, oMin: 0.1, oMax: 0.22, delayMax: 5
    });
    spawnRainLayer(stage, 'gy-rain gy-rain--heavy', this.options.heavyCount, {
      hMin: 22, hMax: 44, durMin: 0.38, durMax: 0.78, oMin: 0.16, oMax: 0.32, delayMax: 3, width: 1.4
    });

    var water = document.createElement('div');
    water.className = 'gy-water';
    this.rippleRoot = document.createElement('div');
    this.rippleRoot.className = 'gy-ripples';
    water.appendChild(this.rippleRoot);
    stage.appendChild(water);

    var self = this;
    this.rippleTimer = window.setInterval(function () {
      addRipple(self.rippleRoot, [0, 72]);
      if (Math.random() > 0.45) addRipple(self.rippleRoot, [0, 72]);
    }, this.options.rippleInterval);

    for (var p = 0; p < 18; p += 1) {
      var petal = document.createElement('div');
      petal.className = 'gy-peony-petal';
      petal.style.left = rand(0, 100) + '%';
      petal.style.animationDuration = rand(12, 22) + 's';
      petal.style.animationDelay = rand(0, 12) + 's';
      stage.appendChild(petal);
    }
  };

  GuyuFx.prototype.destroy = function () {
    if (this.rippleTimer) window.clearInterval(this.rippleTimer);
  };

  window.GuyuFx = {
    init: function (el, opts) {
      var fx = new GuyuFx(el, opts);
      fx.mount();
      return fx;
    }
  };
})(window);
