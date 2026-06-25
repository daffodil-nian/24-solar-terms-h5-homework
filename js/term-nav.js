/**
 * 节气专题 · 横向节气导航栏
 */
$(document).ready(function () {
  'use strict';

  var $bar = $('#termSubNav');
  if (!$bar.length || typeof solarTerms === 'undefined' || typeof termSlugs === 'undefined') return;

  var currentSlug = $bar.attr('data-current') || '';
  var inTermsFolder = $bar.attr('data-in-terms') === 'true';

  function termHref(name) {
    var slug = termSlugs[name];
    if (inTermsFolder) {
      return slug + '.html';
    }
    return typeof getTermPageUrl === 'function' ? getTermPageUrl(name) : 'term.html?t=' + slug;
  }

  var html = '<div class="term-sub-nav"><div class="term-sub-nav-inner"><div class="term-sub-nav-scroll">';
  solarTerms.forEach(function (term) {
    var slug = termSlugs[term.name];
    var href = termHref(term.name);
    var active = slug === currentSlug ? ' active' : '';
    html += '<a class="term-nav-chip season-' + term.season + active + '" href="' + href + '">' + term.name + '</a>';
  });
  html += '</div></div></div>';

  $bar.html(html);

  var $active = $bar.find('.term-nav-chip.active');
  if ($active.length && $active[0].scrollIntoView) {
    setTimeout(function () {
      $active[0].scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }, 400);
  }
});
