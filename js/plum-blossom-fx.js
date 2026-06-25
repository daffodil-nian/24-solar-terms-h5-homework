/**
 * 梅花 · SVG 生成 + 飘落动画（纯 JS）
 */
(function (window) {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  var PALETTE = {
    petal: ['#f0d4dc', '#e8c0cc', '#ddb0bc', '#f5e0e6'],
    bud: ['#d4a0ac', '#c89098'],
    center: ['#b87888', '#a86878']
  };

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  /** 生成单朵五瓣梅花 SVG */
  function buildBlossomSvg(size, variant) {
    variant = variant || 'bloom';
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 40 40');
    svg.setAttribute('width', String(size));
    svg.setAttribute('height', String(size));
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('plum-blossom-svg');

    var g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('transform', 'translate(20,20)');

    var petalColor = pick(PALETTE.petal);
    var i;
    for (i = 0; i < 5; i += 1) {
      var petal = document.createElementNS(SVG_NS, 'ellipse');
      petal.setAttribute('cx', '0');
      petal.setAttribute('cy', variant === 'bud' ? '-5' : '-8');
      petal.setAttribute('rx', variant === 'bud' ? '3' : '4.2');
      petal.setAttribute('ry', variant === 'bud' ? '5' : '7.2');
      petal.setAttribute('fill', variant === 'bud' ? pick(PALETTE.bud) : petalColor);
      petal.setAttribute('opacity', '0.92');
      petal.setAttribute('transform', 'rotate(' + (i * 72) + ')');
      g.appendChild(petal);
    }

    var center = document.createElementNS(SVG_NS, 'circle');
    center.setAttribute('cx', '0');
    center.setAttribute('cy', '0');
    center.setAttribute('r', variant === 'bud' ? '2.2' : '2.8');
    center.setAttribute('fill', pick(PALETTE.center));
    g.appendChild(center);

    svg.appendChild(g);
    return svg;
  }

  function PlumBlossomFx(container, options) {
    this.container = container;
    this.options = Object.assign({
      count: 22,
      minSize: 22,
      maxSize: 44,
      speedMin: 0.35,
      speedMax: 1.1,
      drift: 0.5,
      spin: 0.016
    }, options || {});
    this.items = [];
    this.raf = null;
    this.running = false;
    this.stage = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  PlumBlossomFx.prototype.mount = function () {
    if (this.stage) return;

    this.stage = document.createElement('div');
    this.stage.className = 'plum-blossom-stage';
    this.container.appendChild(this.stage);

    if (this.reducedMotion) {
      for (var s = 0; s < 6; s += 1) {
        this.spawn(true);
      }
      return;
    }

    var n = this.options.count;
    while (this.items.length < n) {
      this.spawn(true);
    }
    this.running = true;
    this.tick = this.tick.bind(this);
    this.raf = window.requestAnimationFrame(this.tick);
  };

  PlumBlossomFx.prototype.spawn = function (scatter) {
    var w = this.container.clientWidth || window.innerWidth;
    var h = this.container.clientHeight || window.innerHeight;
    var size = rand(this.options.minSize, this.options.maxSize);
    var el = document.createElement('div');
    el.className = 'plum-blossom-fall';
    el.appendChild(buildBlossomSvg(size, Math.random() > 0.78 ? 'bud' : 'bloom'));

    var item = {
      el: el,
      x: rand(0, Math.max(w - size, 1)),
      y: scatter ? rand(-h * 0.2, h) : rand(-size * 3, -size),
      size: size,
      speed: rand(this.options.speedMin, this.options.speedMax),
      drift: rand(-this.options.drift, this.options.drift),
      rot: rand(0, 360),
      spin: rand(-this.options.spin, this.options.spin),
      sway: rand(0, Math.PI * 2),
      swaySpeed: rand(0.008, 0.022),
      opacity: rand(0.55, 0.95)
    };

    el.style.opacity = String(item.opacity);
    this.stage.appendChild(el);
    this.items.push(item);
    this.applyItem(item);
  };

  PlumBlossomFx.prototype.applyItem = function (item) {
    item.el.style.transform =
      'translate3d(' + item.x + 'px,' + item.y + 'px,0) rotate(' + item.rot + 'deg)';
  };

  PlumBlossomFx.prototype.tick = function () {
    if (!this.running) return;

    var h = this.container.clientHeight || window.innerHeight;
    var w = this.container.clientWidth || window.innerWidth;
    var i;

    for (i = this.items.length - 1; i >= 0; i -= 1) {
      var item = this.items[i];
      item.y += item.speed;
      item.sway += item.swaySpeed;
      item.x += item.drift + Math.sin(item.sway) * 0.35;
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

  PlumBlossomFx.prototype.destroy = function () {
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
    target.classList.add('plum-blossom-static');
    target.appendChild(buildBlossomSvg(size || 56, 'bloom'));
  }

  /** 在父 SVG 上绘制一朵梅花 */
  function appendBlossom(parent, cx, cy, scale, variant, rotate) {
    variant = variant || 'bloom';
    scale = scale || 1;
    rotate = rotate || 0;

    var g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('transform', 'translate(' + cx + ',' + cy + ') rotate(' + rotate + ') scale(' + scale + ')');

    var petalColor = pick(PALETTE.petal);
    var i;
    for (i = 0; i < 5; i += 1) {
      var petal = document.createElementNS(SVG_NS, 'ellipse');
      petal.setAttribute('cx', '0');
      petal.setAttribute('cy', variant === 'bud' ? '-5' : '-8');
      petal.setAttribute('rx', variant === 'bud' ? '3' : '4.2');
      petal.setAttribute('ry', variant === 'bud' ? '5' : '7.2');
      petal.setAttribute('fill', variant === 'bud' ? pick(PALETTE.bud) : petalColor);
      petal.setAttribute('opacity', '0.9');
      petal.setAttribute('transform', 'rotate(' + (i * 72) + ')');
      g.appendChild(petal);
    }

    var center = document.createElementNS(SVG_NS, 'circle');
    center.setAttribute('cx', '0');
    center.setAttribute('cy', '0');
    center.setAttribute('r', variant === 'bud' ? '2.2' : '2.8');
    center.setAttribute('fill', pick(PALETTE.center));
    g.appendChild(center);

    parent.appendChild(g);
  }

  /** 信笺角饰 · 透明梅枝（无底色） */
  function buildHeroBranchSvg() {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 120 160');
    svg.setAttribute('width', '120');
    svg.setAttribute('height', '160');
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('plum-hero-branch-svg');

    var defs = document.createElementNS(SVG_NS, 'defs');
    var grad = document.createElementNS(SVG_NS, 'linearGradient');
    grad.setAttribute('id', 'plumBranchGrad');
    grad.setAttribute('x1', '0%');
    grad.setAttribute('y1', '100%');
    grad.setAttribute('x2', '100%');
    grad.setAttribute('y2', '0%');
    var stop1 = document.createElementNS(SVG_NS, 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#3a2820');
    var stop2 = document.createElementNS(SVG_NS, 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#5a4038');
    grad.appendChild(stop1);
    grad.appendChild(stop2);
    defs.appendChild(grad);
    svg.appendChild(defs);

    var branch = document.createElementNS(SVG_NS, 'path');
    branch.setAttribute(
      'd',
      'M58 148 C56 128 54 108 50 88 C46 68 44 52 48 36 C52 24 58 16 66 12'
    );
    branch.setAttribute('stroke', 'url(#plumBranchGrad)');
    branch.setAttribute('stroke-width', '2.4');
    branch.setAttribute('fill', 'none');
    branch.setAttribute('stroke-linecap', 'round');
    svg.appendChild(branch);

    var twig1 = document.createElementNS(SVG_NS, 'path');
    twig1.setAttribute('d', 'M50 88 Q38 82 32 72');
    twig1.setAttribute('stroke', '#4a3830');
    twig1.setAttribute('stroke-width', '1.4');
    twig1.setAttribute('fill', 'none');
    twig1.setAttribute('stroke-linecap', 'round');
    svg.appendChild(twig1);

    var twig2 = document.createElementNS(SVG_NS, 'path');
    twig2.setAttribute('d', 'M52 58 Q64 52 72 44');
    twig2.setAttribute('stroke', '#4a3830');
    twig2.setAttribute('stroke-width', '1.2');
    twig2.setAttribute('fill', 'none');
    twig2.setAttribute('stroke-linecap', 'round');
    svg.appendChild(twig2);

    appendBlossom(svg, 66, 18, 0.85, 'bloom', -12);
    appendBlossom(svg, 48, 34, 0.7, 'bloom', 8);
    appendBlossom(svg, 72, 42, 0.6, 'bud', 20);
    appendBlossom(svg, 32, 70, 0.65, 'bloom', -25);
    appendBlossom(svg, 54, 72, 0.55, 'bud', 5);
    appendBlossom(svg, 44, 98, 0.75, 'bloom', -8);

    return svg;
  }

  function mountHeroBranch(target) {
    if (!target) return;
    target.innerHTML = '';
    target.classList.add('term-hero-flower--svg');
    target.appendChild(buildHeroBranchSvg());
  }

  window.PlumBlossomFx = {
    buildSvg: buildBlossomSvg,
    buildHeroBranch: buildHeroBranchSvg,
    mountStatic: mountStatic,
    mountHeroBranch: mountHeroBranch,
    init: function (container, options) {
      if (!container) return null;
      var fx = new PlumBlossomFx(container, options);
      fx.mount();
      return fx;
    }
  };
})(window);
