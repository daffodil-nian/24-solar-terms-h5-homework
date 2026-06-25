/**
 * 栏目页 · 渲染节气入口网格（图片卡片）
 */
$(document).ready(function () {
  'use strict';

  if (typeof solarTerms === 'undefined' || typeof termSlugs === 'undefined') return;

  var featured = ['lichun', 'yushui', 'jingzhe', 'chunfen'];

  function imgUrl(name, season) {
    if (typeof termImages === 'undefined') return '';
    return termImages.getUrl(name) || termImages.getSeasonFallback(season);
  }

  function imgAlt(name) {
    return typeof termImages !== 'undefined' ? termImages.getAlt(name) : name;
  }

  function foodHint(name) {
    if (typeof termFoodData !== 'undefined' && termFoodData[name]) {
      return termFoodData[name].title;
    }
    return '寻味';
  }

  var $customsGrid = $('#customsTermGrid');
  if ($customsGrid.length) {
    var currentName = $.solarTerm && $.solarTerm.getCurrent
      ? $.solarTerm.getCurrent().name
      : null;

    solarTerms.forEach(function (term) {
      var slug = termSlugs[term.name];
      var href = getTermPageUrl(term.name) + '#food';
      var isFeatured = featured.indexOf(slug) !== -1;
      var isCurrent = term.name === currentName;

      $customsGrid.append(
        '<a class="customs-term-card customs-term-card--' + term.season +
          (isFeatured ? ' is-featured' : '') +
          (isCurrent ? ' is-current' : '') +
          ' page-link-transition" href="' + href + '">' +
          '<div class="customs-term-card-thumb">' +
            '<img src="' + imgUrl(term.name, term.season) + '" alt="' + imgAlt(term.name) + '" loading="lazy" width="160" height="120">' +
          '</div>' +
          '<div class="customs-term-card-body">' +
            '<span class="customs-term-card-name">' + term.name + '</span>' +
            '<small class="customs-term-card-date">' + term.date + '</small>' +
            '<span class="customs-term-card-hint">' + foodHint(term.name) + '</span>' +
          '</div>' +
        '</a>'
      );
    });

    $customsGrid.find('.customs-term-card-thumb img').each(function () {
      var $img = $(this);
      var $card = $img.closest('.customs-term-card');
      var name = $card.find('.customs-term-card-name').text();
      var season = ($card.attr('class').match(/customs-term-card--(\w+)/) || [])[1];
      if (name && season && typeof termImages !== 'undefined') {
        termImages.bindFallback($img, name, season);
      }
    });
  }

  var $poetryGrid = $('#poetryTermGrid');
  if ($poetryGrid.length) {
    var currentPoetry = $.solarTerm && $.solarTerm.getCurrent
      ? $.solarTerm.getCurrent().name
      : null;

    solarTerms.forEach(function (term) {
      var slug = termSlugs[term.name];
      var href = getTermPageUrl(term.name) + '#poetry';
      var isFeatured = featured.indexOf(slug) !== -1;
      var isCurrent = term.name === currentPoetry;
      var hint = isFeatured ? '专题' : '品诗';

      $poetryGrid.append(
        '<a class="poetry-term-card poetry-term-card--' + term.season +
          (isFeatured ? ' is-featured' : '') +
          (isCurrent ? ' is-current' : '') +
          ' page-link-transition" href="' + href + '">' +
          '<div class="poetry-term-card-thumb">' +
            '<img src="' + imgUrl(term.name, term.season) + '" alt="' + imgAlt(term.name) + '" loading="lazy" width="160" height="120">' +
          '</div>' +
          '<div class="poetry-term-card-body">' +
            '<span class="poetry-term-card-name">' + term.name + '</span>' +
            '<small class="poetry-term-card-date">' + term.date + '</small>' +
            '<span class="poetry-term-card-hint">' + hint + '</span>' +
          '</div>' +
        '</a>'
      );
    });

    $poetryGrid.find('.poetry-term-card-thumb img').each(function () {
      var $img = $(this);
      var $card = $img.closest('.poetry-term-card');
      var name = $card.find('.poetry-term-card-name').text();
      var season = ($card.attr('class').match(/poetry-term-card--(\w+)/) || [])[1];
      if (name && season && typeof termImages !== 'undefined') {
        termImages.bindFallback($img, name, season);
      }
    });
  }
});
