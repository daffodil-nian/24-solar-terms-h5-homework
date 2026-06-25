/**
 * 节气信笺 · 角饰花（透明 SVG）
 */
(function (window) {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function el(name, attrs) {
    var node = document.createElementNS(SVG_NS, name);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        node.setAttribute(key, attrs[key]);
      });
    }
    return node;
  }

  function buildOrchidHeroBranchSvg() {
    var svg = el('svg', {
      viewBox: '0 0 120 160',
      width: '120',
      height: '160',
      'aria-hidden': 'true',
      class: 'orchid-hero-branch-svg'
    });

    svg.appendChild(el('path', {
      d: 'M62 148 C60 120 58 92 56 68 C54 48 58 28 64 14',
      stroke: '#3d6658',
      'stroke-width': '2.4',
      fill: 'none',
      'stroke-linecap': 'round'
    }));

    function leaf(x, y, rot, len) {
      var g = el('g', { transform: 'translate(' + x + ',' + y + ') rotate(' + rot + ')' });
      g.appendChild(el('path', {
        d: 'M0 0 Q' + (len * 0.35) + ' ' + (-len * 0.15) + ' ' + len + ' 2 Q' + (len * 0.4) + ' 8 0 10 Q' + (-len * 0.25) + ' 6 0 0',
        fill: 'rgba(100, 148, 118, 0.62)',
        stroke: '#4a7868',
        'stroke-width': '0.8'
      }));
      svg.appendChild(g);
    }

    leaf(56, 72, -28, 42);
    leaf(58, 88, 22, 38);
    leaf(54, 108, -35, 36);
    leaf(60, 48, 18, 40);
    leaf(52, 58, -42, 34);

    function orchidFlower(cx, cy, scale, rot) {
      var g = el('g', { transform: 'translate(' + cx + ',' + cy + ') rotate(' + rot + ') scale(' + scale + ')' });
      var petals = [
        { cx: 0, cy: -9, rx: 4.5, ry: 8, fill: '#c8e8d8' },
        { cx: -7, cy: -2, rx: 5, ry: 7, fill: '#b8dcc8', rot: -55 },
        { cx: 7, cy: -2, rx: 5, ry: 7, fill: '#b8dcc8', rot: 55 },
        { cx: -5, cy: 6, rx: 4.5, ry: 6.5, fill: '#a8d0bc', rot: -120 },
        { cx: 5, cy: 6, rx: 4.5, ry: 6.5, fill: '#a8d0bc', rot: 120 }
      ];
      petals.forEach(function (p) {
        var petal = el('ellipse', {
          cx: String(p.cx),
          cy: String(p.cy),
          rx: String(p.rx),
          ry: String(p.ry),
          fill: p.fill,
          opacity: '0.92'
        });
        if (p.rot) petal.setAttribute('transform', 'rotate(' + p.rot + ' ' + p.cx + ' ' + p.cy + ')');
        g.appendChild(petal);
      });
      g.appendChild(el('ellipse', {
        cx: '0', cy: '0', rx: '2.2', ry: '3.2', fill: '#88b8a0'
      }));
      g.appendChild(el('line', {
        x1: '0', y1: '2', x2: '0', y2: '10',
        stroke: '#6a9880', 'stroke-width': '0.8', 'stroke-linecap': 'round'
      }));
      svg.appendChild(g);
    }

    orchidFlower(64, 16, 0.95, -8);
    orchidFlower(48, 38, 0.75, 12);
    orchidFlower(72, 52, 0.65, -15);

    svg.appendChild(el('circle', { cx: '68', cy: '22', r: '1.8', fill: 'rgba(180, 210, 220, 0.75)' }));
    svg.appendChild(el('circle', { cx: '52', cy: '42', r: '1.4', fill: 'rgba(180, 210, 220, 0.65)' }));
    svg.appendChild(el('circle', { cx: '76', cy: '58', r: '1.2', fill: 'rgba(180, 210, 220, 0.6)' }));

    return svg;
  }

  function mount(type, target) {
    if (!target || !type) return;

    if (type === 'plum-branch' && window.PlumBlossomFx && window.PlumBlossomFx.mountHeroBranch) {
      window.PlumBlossomFx.mountHeroBranch(target);
      return;
    }

    target.innerHTML = '';
    target.classList.add('term-hero-flower--svg');

    if (type === 'orchid-branch') {
      target.appendChild(buildOrchidHeroBranchSvg());
    }
  }

  window.TermHeroFlower = {
    mount: mount,
    buildOrchidBranch: buildOrchidHeroBranchSvg
  };
})(window);
