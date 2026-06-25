/**
 * 清明 · 春和景明动效：燕鸟飞入、草芽萌发
 */
(function (window) {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function buildBirdSvg(scale) {
    scale = scale || 1;
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 40 16');
    svg.setAttribute('width', String(36 * scale));
    svg.setAttribute('height', String(14 * scale));
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('qm-bird-svg');

    var body = document.createElementNS(SVG_NS, 'path');
    body.setAttribute(
      'd',
      'M4 8 C10 6 14 5 20 8 C26 11 30 10 36 8 C30 9 24 10 20 8 C14 6 10 7 4 8 Z'
    );
    body.setAttribute('fill', 'rgba(58, 88, 72, 0.82)');
    svg.appendChild(body);

    var wingL = document.createElementNS(SVG_NS, 'path');
    wingL.setAttribute('d', 'M12 8 Q8 2 16 6');
    wingL.setAttribute('fill', 'none');
    wingL.setAttribute('stroke', 'rgba(48, 78, 62, 0.75)');
    wingL.setAttribute('stroke-width', '1.4');
    wingL.setAttribute('stroke-linecap', 'round');
    wingL.classList.add('qm-bird-wing', 'qm-bird-wing--left');
    svg.appendChild(wingL);

    var wingR = document.createElementNS(SVG_NS, 'path');
    wingR.setAttribute('d', 'M28 8 Q32 2 24 6');
    wingR.setAttribute('fill', 'none');
    wingR.setAttribute('stroke', 'rgba(48, 78, 62, 0.75)');
    wingR.setAttribute('stroke-width', '1.4');
    wingR.setAttribute('stroke-linecap', 'round');
    wingR.classList.add('qm-bird-wing', 'qm-bird-wing--right');
    svg.appendChild(wingR);

    return svg;
  }

  function createSprout(leftPct, delay, height) {
    var sprout = document.createElement('div');
    sprout.className = 'qm-sprout';
    sprout.style.left = leftPct + '%';
    sprout.style.animationDelay = delay + 's';

    var blades = [height, height * 0.72, height * 0.58];
    var tilts = [-14, 0, 12];
    blades.forEach(function (h, i) {
      var blade = document.createElement('span');
      blade.className = 'qm-sprout-blade';
      blade.style.height = h + 'px';
      blade.style.setProperty('--qm-tilt', tilts[i] + 'deg');
      blade.style.animationDelay = (delay + i * 0.15) + 's';
      sprout.appendChild(blade);
    });

    return sprout;
  }

  function QingmingFx(container, options) {
    this.container = container;
    this.options = Object.assign({
      birdCount: 5,
      sproutCount: 22,
      spawnInterval: 5200
    }, options || {});
    this.ground = null;
    this.spawnTimer = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  QingmingFx.prototype.mount = function () {
    if (this.ground) return;

    var ground = document.createElement('div');
    ground.className = 'qm-ground';
    this.container.appendChild(ground);
    this.ground = ground;

    var i;
    for (i = 0; i < this.options.sproutCount; i += 1) {
      var left = 2 + Math.random() * 96;
      var delay = Math.random() * 2.8;
      var height = 10 + Math.random() * 18;
      ground.appendChild(createSprout(left, delay, height));
    }

    if (this.reducedMotion) {
      for (i = 0; i < 3; i += 1) {
        this.spawnBird(i * 1.2, true);
      }
      return;
    }

    for (i = 0; i < this.options.birdCount; i += 1) {
      this.spawnBird(i * 1.6 + Math.random() * 0.8, false);
    }

    var self = this;
    this.spawnTimer = window.setInterval(function () {
      self.spawnBird(Math.random() * 2, false);
    }, this.options.spawnInterval);
  };

  QingmingFx.prototype.spawnBird = function (delay, staticBird) {
    var bird = document.createElement('div');
    bird.className = 'qm-bird' + (staticBird ? ' qm-bird--static' : '');
    bird.style.top = (12 + Math.random() * 38) + '%';
    bird.style.animationDuration = (14 + Math.random() * 10) + 's';
    bird.style.animationDelay = delay + 's';
    bird.appendChild(buildBirdSvg(0.85 + Math.random() * 0.35));
    this.container.appendChild(bird);

    if (!staticBird) {
      var self = this;
      bird.addEventListener('animationiteration', function onIter() {
        bird.removeEventListener('animationiteration', onIter);
        if (bird.parentNode) bird.parentNode.removeChild(bird);
        self.spawnBird(rand(0.4, 2.2), false);
      });
    }
  };

  QingmingFx.prototype.destroy = function () {
    if (this.spawnTimer) {
      window.clearInterval(this.spawnTimer);
      this.spawnTimer = null;
    }
  };

  window.QingmingFx = {
    init: function (el, opts) {
      var fx = new QingmingFx(el, opts);
      fx.mount();
      return fx;
    }
  };
})(window);
