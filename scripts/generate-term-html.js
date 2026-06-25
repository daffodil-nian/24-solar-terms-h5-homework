/**
 * 生成 html/terms/{slug}.html · 24 节气独立页面（结构对齐立春）
 * 运行：node scripts/generate-term-html.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'html', 'terms');

const termSlugs = {
  '立春': 'lichun', '雨水': 'yushui', '惊蛰': 'jingzhe', '春分': 'chunfen',
  '清明': 'qingming', '谷雨': 'guyu', '立夏': 'lixia', '小满': 'xiaoman',
  '芒种': 'mangzhong', '夏至': 'xiazhi', '小暑': 'xiaoshu', '大暑': 'dashu',
  '立秋': 'liqiu', '处暑': 'chushu', '白露': 'bailu', '秋分': 'qiufen',
  '寒露': 'hanlu', '霜降': 'shuangjiang', '立冬': 'lidong', '小雪': 'xiaoxue',
  '大雪': 'daxue', '冬至': 'dongzhi', '小寒': 'xiaohan', '大寒': 'dahan'
};

const termFx = {
  lichun: 'plum', yushui: 'rain', jingzhe: 'thunder', chunfen: 'spring-breeze',
  qingming: 'qingming', guyu: 'guyu', lixia: 'foliage', xiaoman: 'cloud-light',
  mangzhong: 'pond-dragonfly', xiazhi: 'lotus', xiaoshu: 'bamboo-shade', dashu: 'lotus-deep',
  liqiu: 'autumn-leaf', chushu: 'thin-mist', bailu: 'dew-light', qiufen: 'osmanthus',
  hanlu: 'frost-mist', shuangjiang: 'maple-leaf', lidong: 'winter-still', xiaoxue: 'snow-light',
  daxue: 'snow-heavy', dongzhi: 'river-mist', xiaohan: 'wind-snow', dahan: 'ice-snow'
};

const metaDesc = {
  lichun: '二十四节气 · 立春 · 诗词书画与民俗美食',
  yushui: '二十四节气 · 雨水 · 烟雨江南与荠菜民俗',
  jingzhe: '二十四节气 · 惊蛰 · 春雷杏花与春笋',
  chunfen: '二十四节气 · 春分 · 辛夷燕子与食春',
  qingming: '二十四节气 · 清明 · 春和景明与踏青食俗'
};

const NAV = `  <nav class="navbar navbar-expand-lg navbar-light film-nav fixed-top">
    <div class="container">
      <a class="navbar-brand page-link-transition" href="../index.html">二十四节气</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link page-link-transition" href="../index.html">首页</a></li>
          <li class="nav-item"><a class="nav-link page-link-transition" href="../knowledge.html">节气知识</a></li>
          <li class="nav-item"><a class="nav-link page-link-transition" href="../customs.html">民俗美食</a></li>
          <li class="nav-item"><a class="nav-link active page-link-transition" href="../poetry.html">诗词书画</a></li>
          <li class="nav-item"><a class="nav-link page-link-transition" href="../health.html">时令养生</a></li>
          <li class="nav-item"><a class="nav-link page-link-transition" href="../calendar.html">节气日历</a></li>
          <li class="nav-item"><a class="nav-link page-link-transition" href="../challenge.html">知识挑战</a></li>
          <li class="nav-item"><a class="nav-link page-link-transition" href="../culture-library.html">文化联动库</a></li>
          <li class="nav-item"><a class="nav-link page-link-transition" href="../games.html">游戏</a></li>
          <li class="nav-item"><a class="nav-link page-link-transition" href="../heritage.html">四时之约</a></li>
        </ul>
      </div>
    </div>
  </nav>`;

const SECTIONS = `  <section class="term-hero">
    <div class="term-hero-inner" id="termHeroContent"></div>
  </section>

  <section class="term-zone term-zone-poetry" id="poetry">
    <div id="poetryZone"></div>
  </section>

  <section class="term-zone term-zone-food" id="food">
    <div id="foodZone"></div>
  </section>

  <section class="term-zone term-zone-audio" id="audio">
    <div id="audioZone"></div>
  </section>

  <section class="term-zone term-zone-media" id="media">
    <div id="mediaZone"></div>
  </section>`;

const FOOTER = `  <footer class="film-footer">
    <div class="container">
      <div class="footer-links mb-3">
        <a href="../customs.html#food" class="page-link-transition">民俗美食</a>
        <a href="../poetry.html" class="page-link-transition">诗词书画</a>
      </div>
      <p class="mb-0">二十四节气 · 观象授时</p>
    </div>
  </footer>`;

function buildPage(name, slug) {
  const fx = termFx[slug] || 'plum';
  const title = '二十四节气 · ' + name;
  const desc = metaDesc[slug] || ('二十四节气 · ' + name + ' · 诗词书画与民俗美食');

  let bodyClass;
  if (slug === 'yushui') {
    bodyClass = 'term-page term-yushui page-enter';
  } else {
    bodyClass = 'term-page term-' + slug + ' term-themed page-enter';
  }

  const css = [
    '../../lib/bootstrap.min.css',
    '../../css/main.css',
    '../../css/modern.css',
    '../../css/term-pages.css',
    '../../css/term-theme-base.css',
    '../../css/term-fx-common.css'
  ];
  if (slug === 'lichun') css.push('../../css/lichun.css');
  if (slug === 'yushui') css.push('../../css/yushui.css', '../../css/dew-drop-fx.css');
  if (slug === 'qingming') css.push('../../css/qingming.css', '../../css/qingming-fx.css');
  if (slug === 'guyu') css.push('../../css/guyu.css', '../../css/guyu-fx.css');
  css.push('../../css/animate.css', '../../css/site-bgm.css');
  if (slug === 'lichun') css.push('../../css/plum-blossom-fx.css');
  css.push('../../css/responsive.css');

  const scripts = [
    '../../lib/jquery.min.js',
    '../../lib/bootstrap.bundle.min.js',
    '../../js/terms-data.js',
    '../../js/term-slugs.js',
    '../../js/term-themes.js',
    '../../js/term-food-data.js',
    '../../js/term-pages-data.js',
    '../../js/site-common.js',
    '../../js/scroll.js',
    '../../js/term-nav.js',
    '../../js/video.js',
    '../../js/term-theme-init.js'
  ];
  if (slug === 'lichun') {
    scripts.push('../../js/plum-blossom-fx.js', '../../js/term-hero-flower.js');
  }
  if (slug === 'yushui') {
    scripts.push('../../js/dew-drop-fx.js');
  }
  if (slug === 'qingming') {
    scripts.push('../../js/qingming-fx.js');
  }
  if (slug === 'guyu') {
    scripts.push('../../js/guyu-fx.js');
  }
  scripts.push(
    '../../js/term-page.js',
    '../../js/term-fx.js',
    '../../js/site-bgm-config.js',
    '../../js/site-bgm.js'
  );

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${desc}">
  <title>${title}</title>
${css.map(function (h) { return '  <link href="' + h + '" rel="stylesheet">'; }).join('\n')}
</head>
<body class="${bodyClass}" data-slug="${slug}" data-fx="${fx}">

  <div id="termFxLayer" class="term-fx-layer"></div>
  <div id="scrollProgress" class="scroll-progress-bar"></div>

${NAV}

  <div id="termSubNav" data-in-terms="true" data-current="${slug}"></div>

${SECTIONS}

${FOOTER}

${scripts.map(function (s) { return '  <script src="' + s + '"></script>'; }).join('\n')}
</body>
</html>
`;
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

Object.keys(termSlugs).forEach(function (name) {
  var slug = termSlugs[name];
  var file = path.join(OUT_DIR, slug + '.html');
  fs.writeFileSync(file, buildPage(name, slug), 'utf8');
  console.log('wrote ' + slug + '.html');
});

console.log('Done: 24 term pages in html/terms/');
