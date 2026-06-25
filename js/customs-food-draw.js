/**
 * 民俗美食 · 食签问俗（摇签 + 古籍翻页）
 */
$(document).ready(function () {
  'use strict';

  var $root = $('#foodStickDraw');
  if (!$root.length || typeof solarTerms === 'undefined' || typeof termFoodData === 'undefined') {
    return;
  }

  var seasonShort = { spring: '春', summer: '夏', autumn: '秋', winter: '冬' };
  var pageNums = ['壹', '贰', '叁'];
  var drawing = false;
  var currentTerm = null;
  var currentPage = 0;
  var pageCount = 3;

  var $btn = $('#foodStickDrawBtn');
  var $status = $('#foodStickDrawStatus');
  var $tube = $('#foodStickTube');
  var $picked = $('#foodStickPicked');
  var $book = $('#foodAncientBook');
  var $pages = $('#foodBookPages');
  var $pageNum = $('#foodBookPageNum');
  var $prev = $('#foodBookPrev');
  var $next = $('#foodBookNext');
  var $link = $('#foodBookLink');

  function imgUrl(term) {
    if (typeof termImages === 'undefined') return '';
    return termImages.getUrl(term.name) || termImages.getSeasonFallback(term.season);
  }

  function imgAlt(term) {
    return typeof termImages !== 'undefined' ? termImages.getAlt(term.name) : term.name;
  }

  function getFoodInfo(name) {
    var info = $.extend({}, termFoodData[name] || {});
    if (typeof termPagesData !== 'undefined' && typeof termSlugs !== 'undefined') {
      var slug = termSlugs[name];
      var page = slug && termPagesData[slug];
      if (page && page.food) {
        var f = page.food;
        if (f.title) info.title = f.title;
        if (f.intro) info.summary = f.intro;
        if (f.folk) info.folk = f.folk;
        if (f.items && f.items.length) {
          info.dishes = f.items.map(function (item) { return item.title; });
          info.recipes = f.items;
        }
      }
    }
    if (!info.title) info.title = name + ' · 时令风物';
    if (!info.summary) info.summary = '应时而食，不时不食，是中国人与土地相处的智慧。';
    if (!info.folk) info.folk = '每个节气都有独特的饮食记忆，待君细品。';
    if (!info.dishes) info.dishes = ['时令佳肴'];
    return info;
  }

  function pickRandomTerm() {
    return solarTerms[Math.floor(Math.random() * solarTerms.length)];
  }

  function resetBook() {
    currentPage = 0;
    $book.removeClass('is-open is-flipping').attr('hidden', true);
    $pages.empty();
    $picked.removeClass('is-visible').attr('hidden', true).text('');
  }

  function buildPages(term, food) {
    var dishesHtml = food.dishes.map(function (d) {
      return '<li>' + d + '</li>';
    }).join('');

    var recipeHtml = '';
    if (food.recipes && food.recipes.length) {
      recipeHtml = food.recipes.map(function (r) {
        return '<div class="food-book-recipe">' +
          '<strong>' + r.title + '</strong>' +
          '<p>' + r.desc + '</p>' +
          (r.recipe ? '<em>' + r.recipe + '</em>' : '') +
        '</div>';
      }).join('');
    } else {
      recipeHtml = '<p class="food-book-plain">' + food.dishes.join('、') + '，皆为此时节常见食俗，应季而食，最得天地之气。 </p>';
    }

    var href = typeof getTermPageUrl === 'function' ? getTermPageUrl(term.name) + '#food' : '#';

    return [
      '<article class="food-book-page food-book-page--cover" data-page="0">' +
        '<div class="food-book-page-inner">' +
          '<span class="food-book-season food-book-season--' + term.season + '">' + seasonShort[term.season] + '</span>' +
          '<div class="food-book-cover-thumb">' +
            '<img src="' + imgUrl(term) + '" alt="' + imgAlt(term) + '">' +
          '</div>' +
          '<h4 class="food-book-term">' + term.name + '</h4>' +
          '<p class="food-book-food-title">' + food.title + '</p>' +
          '<p class="food-book-tagline">' + (food.tagline || term.date) + '</p>' +
          '<span class="food-book-seal">食签</span>' +
        '</div>' +
      '</article>',
      '<article class="food-book-page food-book-page--prose" data-page="1">' +
        '<div class="food-book-page-inner">' +
          '<p class="food-book-page-label">食俗</p>' +
          '<h4>' + food.title + '</h4>' +
          '<p class="food-book-summary">' + food.summary + '</p>' +
          '<blockquote class="food-book-folk">「' + food.folk + '」</blockquote>' +
        '</div>' +
      '</article>',
      '<article class="food-book-page food-book-page--dishes" data-page="2">' +
        '<div class="food-book-page-inner">' +
          '<p class="food-book-page-label">食单</p>' +
          '<ul class="food-book-dish-list">' + dishesHtml + '</ul>' +
          recipeHtml +
          '<a href="' + href + '" class="food-book-term-link page-link-transition">进入「' + term.name + '」美食专题 →</a>' +
        '</div>' +
      '</article>'
    ];
  }

  function showPage(index) {
    currentPage = Math.max(0, Math.min(pageCount - 1, index));
    $pages.find('.food-book-page').removeClass('is-active is-turned');
    $pages.find('.food-book-page[data-page="' + currentPage + '"]').addClass('is-active');
    $pages.find('.food-book-page').each(function () {
      var p = parseInt($(this).data('page'), 10);
      if (p < currentPage) $(this).addClass('is-turned');
    });
    $pageNum.text(pageNums[currentPage] + ' / ' + pageNums[pageCount - 1]);
    $prev.prop('disabled', currentPage === 0);
    $next.prop('disabled', currentPage === pageCount - 1);
  }

  function openBook(term) {
    var food = getFoodInfo(term.name);
    currentTerm = term;

    $pages.html(buildPages(term, food).join(''));
    $pages.find('.food-book-cover-thumb img').each(function () {
      if (typeof termImages !== 'undefined') {
        termImages.bindFallback($(this), term.name, term.season);
      }
    });

    var href = typeof getTermPageUrl === 'function' ? getTermPageUrl(term.name) + '#food' : '#';
    $link.removeClass('d-none').attr('href', href).text('进入「' + term.name + '」专题 →');

    $book.removeAttr('hidden');
    requestAnimationFrame(function () {
      $book.addClass('is-open');
      showPage(0);
    });
  }

  function finishDraw(term) {
    $root.removeClass('is-shaking is-drawing');
    $picked.text(term.name).removeAttr('hidden');
    requestAnimationFrame(function () {
      $picked.addClass('is-visible');
    });
    $status.text('抽得「' + term.name + '」食签 · 展卷细读');
    $btn.prop('disabled', false).text('再摇一签');
    drawing = false;

    window.setTimeout(function () {
      openBook(term);
    }, 650);
  }

  function startDraw() {
    if (drawing) return;

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var term = pickRandomTerm();

    drawing = true;
    resetBook();
    $btn.prop('disabled', true).text('摇签中…');
    $status.text('签筒轻摇，随机择一……');
    $link.addClass('d-none').attr('href', '#');
    $root.addClass('is-shaking');

    if (reducedMotion) {
      $root.removeClass('is-shaking');
      finishDraw(term);
      return;
    }

    window.setTimeout(function () {
      finishDraw(term);
    }, 950);
  }

  $btn.on('click', startDraw);

  $prev.on('click', function () {
    if (!$book.hasClass('is-open') || currentPage <= 0) return;
    $book.addClass('is-flipping');
    showPage(currentPage - 1);
    window.setTimeout(function () { $book.removeClass('is-flipping'); }, 420);
  });

  $next.on('click', function () {
    if (!$book.hasClass('is-open') || currentPage >= pageCount - 1) return;
    $book.addClass('is-flipping');
    showPage(currentPage + 1);
    window.setTimeout(function () { $book.removeClass('is-flipping'); }, 420);
  });

  $link.on('click', function (e) {
    var href = $(this).attr('href');
    if (!href || href === '#') return;
    e.preventDefault();
    window.location.href = href;
  });
});
