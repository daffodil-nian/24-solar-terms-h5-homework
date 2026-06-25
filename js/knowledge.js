/**
 * 节气知识页
 */
$(document).ready(function () {
  'use strict';

  if (typeof solarTerms === 'undefined' || !$.solarTerm) return;

  var seasonLabel = { spring: '春季', summer: '夏季', autumn: '秋季', winter: '冬季' };
  var seasonShort = { spring: '春', summer: '夏', autumn: '秋', winter: '冬' };

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
    var url = termImages.getUrl(name);
    if (!url) {
      url = termImages.getSeasonFallback(season);
    }
    $img.attr('src', url).attr('alt', termImages.getAlt(name));
    bindImageFallback($img, season);
  }

  function applySeasonHero() {
    var season = $.solarTerm.getCurrent().season;
    var $bg = $('.hero-section .hero-bg');
    $bg.removeClass('hero-bg-spring hero-bg-summer hero-bg-autumn hero-bg-winter')
      .addClass('hero-bg-' + season);
    $('#seasonParticles').attr('data-season', season);
  }

  function updateSpotlight() {
    var term = $.solarTerm.getCurrent();
    var next = $.solarTerm.getNext();
    var $spot = $('#knowledgeSpotlight');
    if (!$spot.length) return;

    var termUrl = typeof getTermPageUrl === 'function' ? getTermPageUrl(term.name) : 'term.html';
    var hasPage = termUrl.indexOf('t=') !== -1;
    var poetryLine = term.poetry ? term.poetry.verse : term.desc;

    $spot.find('#spotlightTermName').text(term.name);
    $spot.find('#spotlightTermDate').text(term.date + ' · ' + seasonLabel[term.season]);
    $spot.find('#spotlightTermDesc').text(term.desc);
    $spot.find('#spotlightTermDetail').text(term.detail);
    $spot.find('#spotlightPoetry').text(poetryLine);
    $spot.find('#spotlightNext').text('距「' + next.name + '」还有 ' + next.days + ' 天');
    $spot.find('#spotlightTermCaption').text(term.name + ' · ' + term.desc);

    setTermImage($spot.find('#spotlightTermImg'), term.name, term.season);

    var $deepLink = $spot.find('#spotlightDeepLink');
    if (hasPage && typeof termPagesData !== 'undefined') {
      var slug = termUrl.split('t=')[1];
      if (termPagesData[slug]) {
        $deepLink.attr('href', termUrl).removeClass('d-none');
      } else {
        $deepLink.addClass('d-none');
      }
    } else {
      $deepLink.addClass('d-none');
    }
  }

  function renderTermGrid(filter) {
    var $grid = $('#knowledgeTermGrid');
    if (!$grid.length) return;
    $grid.empty();

    var currentName = $.solarTerm.getCurrent().name;
    var list = $.solarTerm.filterBySeason(filter);

    $.each(list, function (_, term) {
      var imgUrl = typeof termImages !== 'undefined'
        ? (termImages.getUrl(term.name) || termImages.getSeasonFallback(term.season))
        : '';
      var imgAlt = typeof termImages !== 'undefined'
        ? termImages.getAlt(term.name)
        : term.name;

      var $card = $(
        '<div class="col-6 col-md-4 col-lg-3">' +
          '<button type="button" class="knowledge-term-card knowledge-term-card--' + term.season +
            (term.name === currentName ? ' is-current' : '') + '">' +
            '<div class="knowledge-term-card-thumb">' +
              '<img src="' + imgUrl + '" alt="' + imgAlt + '" loading="lazy" width="320" height="240">' +
            '</div>' +
            '<div class="knowledge-term-card-body">' +
              '<span class="knowledge-term-season">' + seasonShort[term.season] + '</span>' +
              '<strong class="knowledge-term-name">' + term.name + '</strong>' +
              '<small class="knowledge-term-date">' + term.date + '</small>' +
              '<p class="knowledge-term-desc">' + term.desc + '</p>' +
            '</div>' +
          '</button>' +
        '</div>'
      );

      bindImageFallback($card.find('img'), term.season);
      $card.find('button')
        .data('name', term.name)
        .data('detail', term.detail)
        .data('season', term.season);
      $grid.append($card);
    });
  }

  window.showTermModal = function (name, detail, season) {
    var modalEl = document.getElementById('termModal');
    if (!modalEl) return;

    var termSeason = season;
    if (!termSeason && typeof $.solarTerm !== 'undefined') {
      var idx = $.solarTerm.getIndex ? $.solarTerm.getIndex() : -1;
      if (idx >= 0 && solarTerms[idx] && solarTerms[idx].name === name) {
        termSeason = solarTerms[idx].season;
      }
    }
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

    var $link = $('#termModalDeepLink');
    if ($link.length && typeof getTermPageUrl === 'function') {
      var url = getTermPageUrl(name);
      if (url.indexOf('t=') !== -1 && typeof termPagesData !== 'undefined') {
        var slug = url.split('t=')[1];
        if (termPagesData[slug]) {
          $link.attr('href', url).removeClass('d-none');
        } else {
          $link.addClass('d-none');
        }
      } else {
        $link.addClass('d-none');
      }
    }
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  };

  $('#knowledgeSeasonFilter .filter-btn').on('click', function () {
    $('#knowledgeSeasonFilter .filter-btn').removeClass('active');
    $(this).addClass('active');
    renderTermGrid($(this).data('season'));
  });

  $(document).on('click', '.knowledge-term-card', function () {
    showTermModal($(this).data('name'), $(this).data('detail'), $(this).data('season'));
  });

  applySeasonHero();
  updateSpotlight();
  renderTermGrid('all');
});
