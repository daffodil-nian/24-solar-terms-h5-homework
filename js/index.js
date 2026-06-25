/**
 * 二十四节气 · 首页
 */
$(document).ready(function () {
  'use strict';

  if (typeof solarTerms === 'undefined' || !$.solarTerm) return;

  var seasonLabel = { spring: '春季', summer: '夏季', autumn: '秋季', winter: '冬季' };
  var seasonBodyClass = {
    spring: 'season-spring-active',
    summer: 'season-summer-active',
    autumn: 'season-autumn-active',
    winter: 'season-winter-active'
  };

  function bindImageFallback($img, season) {
    if (!$img || !$img.length || typeof termImages === 'undefined') return;
    $img.off('error.termImg').on('error.termImg', function () {
      var fallback = termImages.getSeasonFallback(season);
      if ($(this).attr('src') !== fallback) {
        $(this).attr('src', fallback);
      }
    });
  }

  function setTermImage($img, name, season) {
    if (!$img || !$img.length || typeof termImages === 'undefined') return;
    var url = termImages.getUrl(name) || termImages.getSeasonFallback(season);
    $img.attr('src', url).attr('alt', termImages.getAlt(name));
    bindImageFallback($img, season);
  }

  window.showTermModal = function (name, detail, season) {
    var modalEl = document.getElementById('termModal');
    if (!modalEl) return;

    var termSeason = season;
    if (!termSeason) {
      for (var i = 0; i < solarTerms.length; i++) {
        if (solarTerms[i].name === name) {
          termSeason = solarTerms[i].season;
          break;
        }
      }
    }

    $('#termModalTitle').text(name);
    $('#termModalBody').text(detail);

    var $figure = $('#termModalFigure');
    var $img = $('#termModalImg');
    if ($img.length && typeof termImages !== 'undefined') {
      setTermImage($img, name, termSeason || 'spring');
      $figure.removeClass('d-none');
    } else if ($figure.length) {
      $figure.addClass('d-none');
    }

    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  };

  function updateTodayChip() {
    var info = $.solarTerm.getCurrent();
    $('#todayTermName').text('今日 · ' + info.name);
    $('#todayTermMeta').text(info.date + ' · ' + seasonLabel[info.season]);
  }

  function updateCountdown() {
    var next = $.solarTerm.getNext();
    $('#countdownNextName').text(next.name);
    $('#countdownDays').text('还有 ' + next.days + ' 天');
  }

  function updateSeasonalBlocks() {
    var term = $.solarTerm.getCurrent();

    if (term.poetry) {
      $('#homePoetryVerse').text(term.poetry.verse);
      $('#poetryTermLabel').text(term.name);
      $('#poetryAuthor').text(term.poetry.author);
      $('#poetryMeaning').text(term.poetry.meaning);
    }

    $('#phenologyTitle').text(term.name + '三候');

    var $row = $('#phenologyRow');
    if ($row.length && term.phenology) {
      $row.empty();
      $.each(term.phenology, function (_, p) {
        $row.append(
          '<div class="col-md-4">' +
            '<div class="phenology-card card h-100 border-0">' +
              '<div class="card-body">' +
                '<div class="phenology-rail">' +
                  '<span class="phenology-order">' + p.order + '</span>' +
                  '<span class="phenology-icon">' + p.icon + '</span>' +
                '</div>' +
                '<div class="phenology-content">' +
                  '<h5 class="card-title">' + p.title + '</h5>' +
                  '<p class="card-text">' + p.text + '</p>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      });
    }

    if (term.saying) {
      $('#seasonalSayingText').text('「' + term.saying.text + '」');
      $('#seasonalSayingSource').text('——' + term.saying.source);
    }

    var $body = $('body.home-page');
    $.each(seasonBodyClass, function (_, cls) {
      $body.removeClass(cls);
    });
    $body.addClass(seasonBodyClass[term.season]);
  }

  function renderTermStrip(filter) {
    var $strip = $('#termStrip');
    if (!$strip.length) return;
    $strip.empty();

    var currentName = $.solarTerm.getCurrent().name;
    var list = $.solarTerm.filterBySeason(filter);

    $.each(list, function (_, term) {
      var imgUrl = typeof termImages !== 'undefined'
        ? (termImages.getUrl(term.name) || termImages.getSeasonFallback(term.season))
        : '';
      var imgAlt = typeof termImages !== 'undefined'
        ? termImages.getAlt(term.name)
        : term.name;
      var isCurrent = term.name === currentName;

      var $chip = $(
        '<button type="button" class="term-strip-card term-strip-card--' + term.season +
          (isCurrent ? ' is-current' : '') + '" role="listitem">' +
          '<div class="term-strip-card-thumb">' +
            '<img src="' + imgUrl + '" alt="' + imgAlt + '" loading="lazy" width="160" height="120">' +
          '</div>' +
          '<div class="term-strip-card-body">' +
            '<span class="term-strip-card-name">' + term.name + '</span>' +
            '<small class="term-strip-card-date">' + term.date + '</small>' +
          '</div>' +
        '</button>'
      );

      bindImageFallback($chip.find('img'), term.season);
      $chip.data('name', term.name).data('detail', term.detail).data('season', term.season);
      $strip.append($chip);
    });
  }

  $('.season-pills .filter-btn').on('click', function () {
    $('.season-pills .filter-btn').removeClass('active');
    $(this).addClass('active');
    renderTermStrip($(this).data('season'));
  });

  $(document).on('click', '.term-strip-card', function () {
    showTermModal($(this).data('name'), $(this).data('detail'), $(this).data('season'));
  });

  var carouselEl = document.getElementById('heroCarousel');
  if (carouselEl) {
    new bootstrap.Carousel(carouselEl, { interval: 5500, pause: 'hover', wrap: true });
  }

  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $('.film-nav .nav-link').each(function () {
    if ($(this).attr('href') === currentPage) $(this).addClass('active');
  });

  $('a.page-link-transition').on('click', function (e) {
    var href = $(this).attr('href');
    if (!href || href.startsWith('#') || href.startsWith('http')) return;
    e.preventDefault();
    window.location.href = href;
  });

  $(window).on('scroll', function () {
    $('.film-nav').toggleClass('scrolled', $(window).scrollTop() > 40);
  });

  updateTodayChip();
  updateCountdown();
  updateSeasonalBlocks();
  renderTermStrip('all');

  if (typeof window.initScrollReveal === 'function') {
    window.initScrollReveal();
  }
});
