/**
 * 露珠 · SVG 生成 + 飘落动画（纯 JS，结构对齐 plum-blossom-fx.js）
 */
(function (window) {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  var PALETTE = {
    body: ['rgba(186, 218, 228, 0.88)', 'rgba(168, 204, 216, 0.85)', 'rgba(200, 228, 236, 0.9)'],
    highlight: ['rgba(255, 255, 255, 0.92)', 'rgba(248, 252, 255, 0.88)'],
    tail: ['rgba(140, 180, 192, 0.35)', 'rgba(120, 168, 182, 0.28)']
  };

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  /** 生成单颗露珠 SVG */
  function buildDewSvg(size, variant) {
    variant = variant || 'bead';
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 32');
    svg.setAttribute('width', String(size));
    svg.setAttribute('height', String(size * 1.28));
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('dew-drop-svg');

    var defs = document.createElementNS(SVG_NS, 'defs');
    var grad = document.createElementNS(SVG_NS, 'linearGradient');
    var gradId = 'dewGrad' + Math.random().toString(36).slice(2, 9);
    grad.setAttribute('id', gradId);
    grad.setAttribute('x1', '0%');
    grad.setAttribute('y1', '0%');
    grad.setAttribute('x2', '100%');
    grad.setAttribute('y2', '100%');

    var stop1 = document.createElementNS(SVG_NS, 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', pick(PALETTE.highlight));
    var stop2 = document.createElementNS(SVG_NS, 'stop');
    stop2.setAttribute('offset', '55%');
    stop2.setAttribute('stop-color', pick(PALETTE.body));
    var stop3 = document.createElementNS(SVG_NS, 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('stop-color', 'rgba(120, 168, 180, 0.55)');
    grad.appendChild(stop1);
    grad.appendChild(stop2);
    grad.appendChild(stop3);
    defs.appendChild(grad);
    svg.appendChild(defs);

    if (variant === 'trail') {
      var tail = document.createElementNS(SVG_NS, 'ellipse');
      tail.setAttribute('cx', '12');
      tail.setAttribute('cy', '22');
      tail.setAttribute('rx', String(variant === 'trail' ? 2.2 : 1.8));
      tail.setAttribute('ry', '7');
      tail.setAttribute('fill', pick(PALETTE.tail));
      tail.setAttribute('opacity', '0.65');
      svg.appendChild(tail);
    }

    var drop = document.createElementNS(SVG_NS, 'path');
    var scale = variant === 'large' ? 1.15 : variant === 'small' ? 0.82 : 1;
    drop.setAttribute(
      'd',
      'M12 ' + (3 * scale) +
      ' C' + (16 * scale) + ' ' + (10 * scale) + ' ' + (17 * scale) + ' ' + (16 * scale) +
      ' 12 ' + (24 * scale) +
      ' C' + (7 * scale) + ' ' + (16 * scale) + ' ' + (8 * scale) + ' ' + (10 * scale) +
      ' 12 ' + (3 * scale) + ' Z'
    );
    drop.setAttribute('fill', 'url(#' + gradId + ')');
    drop.setAttribute('opacity', '0.94');
    svg.appendChild(drop);

    var shine = document.createElementNS(SVG_NS, 'ellipse');
    shine.setAttribute('cx', String(10 * scale));
    shine.setAttribute('cy', String(10 * scale));
    shine.setAttribute('rx', String(2.2 * scale));
    shine.setAttribute('ry', String(3.2 * scale));
    shine.setAttribute('fill', 'rgba(255, 255, 255, 0.75)');
    shine.setAttribute('transform', 'rotate(-18 ' + (10 * scale) + ' ' + (10 * scale) + ')');
    svg.appendChild(shine);

    return svg;
  }

  function DewDropFx(container, options) {
    this.container = container;
    this.options = Object.assign({
      count: 26,
      minSize: 10,
      maxSize: 28,
      speedMin: 0.85,
      speedMax: 2.2,
      drift: 0.35,
      spin: 0.008
    }, options || {});
    this.items = [];
    this.raf = null;
    this.running = false;
    this.stage = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  DewDropFx.prototype.mount = function () {
    if (this.stage) return;

    this.stage = document.createElement('div');
    this.stage.className = 'dew-drop-stage';
    this.container.appendChild(this.stage);

    if (this.reducedMotion) {
      for (var s = 0; s < 8; s += 1) {
        this.spawn(true);
      }
      return;
    }

    while (this.items.length < this.options.count) {
      this.spawn(true);
    }
    this.running = true;
    this.tick = this.tick.bind(this);
    this.raf = window.requestAnimationFrame(this.tick);
  };

  DewDropFx.prototype.pickVariant = function () {
    var r = Math.random();
    if (r > 0.82) return 'large';
    if (r > 0.55) return 'trail';
    if (r > 0.25) return 'bead';
    return 'small';
  };

  DewDropFx.prototype.spawn = function (scatter) {
    var w = this.container.clientWidth || window.innerWidth;
    var h = this.container.clientHeight || window.innerHeight;
    var variant = this.pickVariant();
    var size = rand(this.options.minSize, this.options.maxSize) * (variant === 'small' ? 0.75 : variant === 'large' ? 1.08 : 1);
    var el = document.createElement('div');
    el.className = 'dew-drop-fall';
    el.appendChild(buildDewSvg(size, variant));

    var item = {
      el: el,
      x: rand(0, Math.max(w - size, 1)),
      y: scatter ? rand(-h * 0.15, h) : rand(-size * 4, -size),
      size: size,
      speed: rand(this.options.speedMin, this.options.speedMax),
      drift: rand(-this.options.drift, this.options.drift),
      rot: rand(-8, 8),
      spin: rand(-this.options.spin, this.options.spin),
      sway: rand(0, Math.PI * 2),
      swaySpeed: rand(0.012, 0.028),
      opacity: rand(0.45, 0.92)
    };

    el.style.opacity = String(item.opacity);
    this.stage.appendChild(el);
    this.items.push(item);
    this.applyItem(item);
  };

  DewDropFx.prototype.applyItem = function (item) {
    item.el.style.transform =
      'translate3d(' + item.x + 'px,' + item.y + 'px,0) rotate(' + item.rot + 'deg)';
  };

  DewDropFx.prototype.tick = function () {
    if (!this.running) return;

    var h = this.container.clientHeight || window.innerHeight;
    var i;

    for (i = this.items.length - 1; i >= 0; i -= 1) {
      var item = this.items[i];
      item.y += item.speed;
      item.sway += item.swaySpeed;
      item.x += item.drift + Math.sin(item.sway) * 0.22;
      item.rot += item.spin;
      this.applyItem(item);

      if (item.y > h + item.size * 2) {
        item.el.remove();
        this.items.splice(i, 1);
        this.spawn(false);
      }
    }

    while (this.items.length < this.options.count) {
      this.spawn(false);
    }

    this.raf = window.requestAnimationFrame(this.tick);
  };

  DewDropFx.prototype.destroy = function () {
    this.running = false;
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
      this.raf = null;
    }
    this.items = [];
    if (this.stage) {
      this.stage.remove();
      this.stage = null;
    }
  };

  function mountStatic(target, size) {
    if (!target) return;
    target.innerHTML = '';
    target.classList.add('dew-drop-static');
    target.appendChild(buildDewSvg(size || 40, 'bead'));
  }

  window.DewDropFx = {
    buildSvg: buildDewSvg,
    mountStatic: mountStatic,
    init: function (container, options) {
      if (!container) return null;
      var fx = new DewDropFx(container, options);
      fx.mount();
      return fx;
    }
  };
})(window);
