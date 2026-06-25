/**
 * 诗词书画 · 典籍抽诗（随机节气书卷）
 */
$(document).ready(function () {
  'use strict';

  var $root = $('#poetryBookDraw');
  if (!$root.length || typeof solarTerms === 'undefined' || typeof getTermPageUrl !== 'function') {
    return;
  }

  var seasonShort = { spring: '春', summer: '夏', autumn: '秋', winter: '冬' };
  var drawing = false;
  var redirectTimer = null;
  var pendingHref = '';

  var $btn = $('#poetryBookDrawBtn');
  var $status = $('#poetryBookDrawStatus');
  var $link = $('#poetryBookDrawLink');
  var $float = $('#poetryBookFloat');
  var $cover = $('#poetryBookFloatCover');

  function imgUrl(term) {
    if (typeof termImages === 'undefined') return '';
    return termImages.getUrl(term.name) || termImages.getSeasonFallback(term.season);
  }

  function imgAlt(term) {
    return typeof termImages !== 'undefined' ? termImages.getAlt(term.name) : term.name;
  }

  function pickRandomTerm() {
    return solarTerms[Math.floor(Math.random() * solarTerms.length)];
  }

  function clearTimers() {
    if (redirectTimer) {
      clearTimeout(redirectTimer);
      redirectTimer = null;
    }
  }

  function goToScroll(href) {
    if (!href) return;
    clearTimers();
    window.location.href = href;
  }

  function resetFloat() {
    $float.removeClass('is-visible is-leaving').attr('hidden', true);
    $cover.removeClass('poetry-book-float-cover--spring poetry-book-float-cover--summer poetry-book-float-cover--autumn poetry-book-float-cover--winter');
  }

  function populateFloat(term) {
    var verse = term.poetry && term.poetry.verse ? term.poetry.verse : term.desc;

    $cover.addClass('poetry-book-float-cover--' + term.season);
    $('#poetryBookFloatSeason').text(seasonShort[term.season] || '');
    $('#poetryBookFloatName').text(term.name);
    $('#poetryBookFloatDesc').text(term.date + ' · ' + term.desc);
    $('#poetryBookFloatVerse').text(verse);

    var $img = $('#poetryBookFloatImg');
    $img.attr('src', imgUrl(term)).attr('alt', imgAlt(term));
    $img.off('error.poetryDraw').on('error.poetryDraw', function () {
      if (typeof termImages === 'undefined') return;
      var fallback = termImages.getSeasonFallback(term.season);
      if ($(this).attr('src') !== fallback) {
        $(this).attr('src', fallback);
      }
    });
  }

  function finishDraw(term, href) {
    $root.removeClass('is-shuffling');
    populateFloat(term);
    $float.removeAttr('hidden');

    requestAnimationFrame(function () {
      $float.addClass('is-visible');
    });

    $status.text('抽得「' + term.name + '」诗卷，即将展卷……');
    $link.removeClass('d-none').attr('href', href).text('进入「' + term.name + '」诗卷 →');
    $btn.prop('disabled', false).text('再抽一卷');

    redirectTimer = setTimeout(function () {
      goToScroll(href);
    }, 2600);
  }

  function startDraw() {
    if (drawing) return;

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var term = pickRandomTerm();
    var href = getTermPageUrl(term.name) + '#poetry';

    clearTimers();
    drawing = true;
    pendingHref = href;
    $btn.prop('disabled', true).text('抽卷中…');
    $link.addClass('d-none').attr('href', '#');
    $status.text('古卷轻颤，随机择一……');
    resetFloat();
    $root.addClass('is-shuffling');

    if (reducedMotion) {
      $root.removeClass('is-shuffling');
      drawing = false;
      goToScroll(href);
      return;
    }

    setTimeout(function () {
      drawing = false;
      finishDraw(term, href);
    }, 900);
  }

  $btn.on('click', startDraw);

  $link.on('click', function (e) {
    var href = $(this).attr('href');
    if (!href || href === '#') return;
    e.preventDefault();
    goToScroll(href);
  });

  $float.on('click', function () {
    if (pendingHref && $float.hasClass('is-visible')) {
      goToScroll(pendingHref);
    }
  });
});
