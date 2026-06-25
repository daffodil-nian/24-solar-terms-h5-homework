/**
 * 节气专题 · 主题初始化
 */
(function () {
  'use strict';

  var DEDICATED = ['yushui'];

  function getSlug() {
    var body = document.body;
    if (!body) return '';
    var slug = body.getAttribute('data-slug');
    if (slug) return slug;
    return new URLSearchParams(window.location.search).get('t') || '';
  }

  function run() {
    if (typeof termThemes === 'undefined') return;
    var slug = getSlug();
    if (!slug || !termThemes[slug]) return;

    var theme = termThemes[slug];
    var body = document.body;
    var isDedicated = DEDICATED.indexOf(slug) !== -1;

    body.classList.add('term-' + slug);

    if (!isDedicated) {
      body.classList.add('term-themed');
      applyTermThemeVars(body, theme);
    }

    if (!body.getAttribute('data-slug')) body.setAttribute('data-slug', slug);
    body.setAttribute('data-fx', theme.fx);

    var sub = document.getElementById('termSubNav');
    if (sub && !sub.getAttribute('data-current')) sub.setAttribute('data-current', slug);
  }

  if (document.body) run();
  else document.addEventListener('DOMContentLoaded', run);
})();
