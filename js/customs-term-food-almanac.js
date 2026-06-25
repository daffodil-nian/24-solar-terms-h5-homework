/**
 * 民俗美食 · 节气美食专题（廿四节气大册翻页 · 本页阅读 + 网上延伸阅读）
 */
$(document).ready(function () {
  'use strict';

  var $root = $('#termFoodAlmanac');
  if (!$root.length || typeof solarTerms === 'undefined' || typeof termFoodData === 'undefined') {
    return;
  }

  var seasonShort = { spring: '春', summer: '夏', autumn: '秋', winter: '冬' };
  var $book = $('#tfaBook');
  var $pages = $('#tfaBookPages');
  var $prev = $('#tfaPrev');
  var $next = $('#tfaNext');
  var $termName = $('#tfaTermName');
  var $pageNum = $('#tfaPageNum');
  var $termLink = $('#tfaTermLink');
  var $seasonJump = $('#tfaSeasonJump');

  var currentIndex = 0;
  var totalPages = solarTerms.length;
  var flipping = false;

  function imgUrl(term) {
    if (typeof termImages !== 'undefined' && termImages.getFoodUrl) {
      return termImages.getFoodUrl(term.name);
    }
    return '';
  }

  function imgAlt(term) {
    if (typeof termImages !== 'undefined' && termImages.getFoodAlt) {
      return termImages.getFoodAlt(term.name);
    }
    return term.name;
  }

  function getFoodInfo(name) {
    var info = $.extend({}, termFoodData[name] || {});
    if (!info.title) info.title = name + ' · 时令风物';
    if (!info.detail && info.summary) info.detail = info.summary;
    if (!info.detail) info.detail = '应时而食，不时不食，是中国人与土地相处的智慧。';
    if (!info.dishes) info.dishes = ['时令佳肴'];
    if (!info.webLink) info.webLink = 'https://baike.baidu.com/item/' + encodeURIComponent(name);
    if (!info.webLinkLabel) info.webLinkLabel = '百度百科 · ' + name + '食俗';
    return info;
  }

  function webLinkHtml(food) {
    return (
      '<a href="' + food.webLink + '" class="tfa-web-link" target="_blank" rel="noopener noreferrer">' +
        food.webLinkLabel + ' ↗' +
      '</a>'
    );
  }

  function buildPage(term, index) {
    var food = getFoodInfo(term.name);
    var dishes = food.dishes.slice(0, 4).join(' · ');

    return (
      '<article class="tfa-page" data-index="' + index + '" data-season="' + term.season + '">' +
        '<div class="tfa-page-inner">' +
          '<span class="tfa-season tfa-season--' + term.season + '">' + seasonShort[term.season] + '季</span>' +
          '<div class="tfa-layout">' +
            '<div class="tfa-visual">' +
              '<div class="tfa-thumb">' +
                '<img src="' + imgUrl(term) + '" alt="' + imgAlt(term) + '" loading="lazy">' +
              '</div>' +
              '<p class="tfa-dishes-label">代表美食</p>' +
              '<p class="tfa-dishes">' + dishes + '</p>' +
            '</div>' +
            '<div class="tfa-text">' +
              '<p class="tfa-index">第 ' + (index + 1) + ' 页 · 共 ' + totalPages + ' 页</p>' +
              '<h3 class="tfa-name">' + term.name + '</h3>' +
              '<p class="tfa-date">' + term.date + '</p>' +
              '<h4 class="tfa-food-title">' + food.title + '</h4>' +
              '<p class="tfa-tagline">' + (food.tagline || '') + '</p>' +
              '<div class="tfa-intro-block">' +
                '<p class="tfa-intro-label">美食介绍</p>' +
                '<p class="tfa-prose">' + food.detail + '</p>' +
              '</div>' +
              (food.folk ? '<blockquote class="tfa-folk">「' + food.folk + '」</blockquote>' : '') +
              webLinkHtml(food) +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderPages() {
    var html = '';
    solarTerms.forEach(function (term, i) {
      html += buildPage(term, i);
    });
    $pages.html(html);
    $pages.find('.tfa-thumb img').each(function () {
      var $img = $(this);
      var $page = $img.closest('.tfa-page');
      var idx = parseInt($page.data('index'), 10);
      var term = solarTerms[idx];
      if (term && typeof termImages !== 'undefined') {
        termImages.bindFoodFallback($img, term.name, term.season);
      }
    });
  }

  function updateBottomLink(food) {
    $termLink
      .attr('href', food.webLink)
      .attr('target', '_blank')
      .attr('rel', 'noopener noreferrer')
      .text(food.webLinkLabel + ' ↗');
  }

  function showPage(index, direction) {
    if (flipping) return;
    index = Math.max(0, Math.min(totalPages - 1, index));
    if (index === currentIndex && direction) return;

    flipping = true;
    $book.removeClass('is-flip-forward is-flip-back').addClass(direction === 'next' ? 'is-flip-forward' : direction === 'prev' ? 'is-flip-back' : '');

    $pages.find('.tfa-page').removeClass('is-active');
    $pages.find('.tfa-page[data-index="' + index + '"]').addClass('is-active');

    currentIndex = index;
    var term = solarTerms[currentIndex];
    var food = getFoodInfo(term.name);

    $termName.text(term.name);
    $pageNum.text((currentIndex + 1) + ' / ' + totalPages);
    updateBottomLink(food);

    $prev.prop('disabled', currentIndex === 0);
    $next.prop('disabled', currentIndex === totalPages - 1);

    $seasonJump.find('.tfa-season-btn').removeClass('is-current');
    $seasonJump.find('.tfa-season-btn[data-season="' + term.season + '"]').addClass('is-current');

    window.setTimeout(function () {
      $book.removeClass('is-flip-forward is-flip-back');
      flipping = false;
    }, 480);
  }

  function jumpToSeason(season) {
    for (var i = 0; i < solarTerms.length; i += 1) {
      if (solarTerms[i].season === season) {
        showPage(i, i > currentIndex ? 'next' : 'prev');
        return;
      }
    }
  }

  renderPages();
  showPage(0);

  $prev.on('click', function () {
    if (currentIndex > 0) showPage(currentIndex - 1, 'prev');
  });

  $next.on('click', function () {
    if (currentIndex < totalPages - 1) showPage(currentIndex + 1, 'next');
  });

  $seasonJump.on('click', '.tfa-season-btn', function () {
    jumpToSeason($(this).data('season'));
  });

  $(document).on('keydown', function (e) {
    if (!$root.is(':visible')) return;
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      e.preventDefault();
      showPage(currentIndex - 1, 'prev');
    } else if (e.key === 'ArrowRight' && currentIndex < totalPages - 1) {
      e.preventDefault();
      showPage(currentIndex + 1, 'next');
    }
  });
});
