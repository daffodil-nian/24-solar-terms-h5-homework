/**
 * 节气文化联动库 · 图片卡片 + 外链
 */
$(document).ready(function () {
  'use strict';

  if (typeof cultureLibraryData === 'undefined') return;

  var data = cultureLibraryData;
  var FALLBACK_POSTER = '../images/bg-spring.svg';

  $('#cultureIntroTitle').text(data.intro.title);
  $('#cultureIntroTagline').text(data.intro.tagline);
  $('#cultureIntroLead').text(data.intro.lead);
  $('#cultureIntroBody').text(data.intro.body);

  var $nav = $('#cultureNavScroll');
  var $featured = $('#cultureFeatured');
  var $sections = $('#cultureSections');
  $nav.empty();
  $featured.empty();
  $sections.empty();

  if (data.featuredGuest) {
    renderFeaturedGuest(data.featuredGuest);
    $nav.append('<a href="#culture-featured" class="culture-nav-chip culture-nav-chip--guest">特邀嘉宾</a>');
  }

  data.categories.forEach(function (cat, index) {
    var items = data.items.filter(function (item) { return item.category === cat.id; });
    if (!items.length) return;

    $nav.append(
      '<a href="#culture-' + cat.id + '" class="culture-nav-chip">' + cat.name + '</a>'
    );

    var cardsHtml = items.map(function (item) {
      return buildPosterCard(item, cat);
    }).join('');

    $sections.append(
      '<section class="culture-section' + (index % 2 === 1 ? ' culture-section--alt' : '') + '" id="culture-' + cat.id + '">' +
        '<div class="container">' +
          '<header class="culture-section-head">' +
            '<span class="culture-section-num">' + String(index + 1).padStart(2, '0') + '</span>' +
            '<div class="culture-section-copy">' +
              '<h2 class="culture-section-title">' + cat.name + '</h2>' +
              '<p class="culture-section-caption">' + cat.caption + '</p>' +
            '</div>' +
          '</header>' +
          '<div class="culture-scroll-row">' + cardsHtml + '</div>' +
        '</div>' +
      '</section>'
    );
  });

  function resolveMediaUrl(filename) {
    if (!filename) return '';
    if (/^(https?:|\/|\.\.\/)/.test(filename)) return filename;
    return '../media/culture/' + filename;
  }

  function renderFeaturedGuest(g) {
    var videoSrc = resolveMediaUrl(g.video);
    var poster = g.poster && !/\.mp4$/i.test(g.poster) ? g.poster : FALLBACK_POSTER;

    $featured.append(
      '<section class="culture-featured" id="culture-featured">' +
        '<div class="container">' +
          '<div class="culture-featured-layout">' +
            '<div class="culture-featured-copy">' +
              '<span class="culture-featured-label">' + g.label + '</span>' +
              '<h2 class="culture-featured-title">' + g.title + '</h2>' +
              '<p class="culture-featured-sub">' + g.subtitle + '</p>' +
              '<p class="culture-featured-desc">' + g.desc + '</p>' +
              (g.quote
                ? '<blockquote class="culture-featured-quote">' +
                    '「' + g.quote + '」' +
                    '<cite>' + g.quoteCite + '</cite>' +
                  '</blockquote>'
                : '') +
            '</div>' +
            '<div class="culture-featured-media">' +
              '<div class="culture-featured-player film-player culture-featured-player--guest">' +
                '<div class="culture-featured-screen">' +
                  '<div class="culture-featured-poster-fallback" id="cultureFeaturedFallback">' +
                    '<span>视频加载中…</span>' +
                    '<small>' + g.video + '</small>' +
                  '</div>' +
                  '<video class="film-video-player culture-featured-video" preload="metadata" playsinline controls poster="' + poster + '">' +
                    '<source src="' + videoSrc + '" type="video/mp4">' +
                  '</video>' +
                '</div>' +
                '<div class="player-controls">' +
                  '<button class="player-btn video-play-btn" type="button" title="播放/暂停">&#9654;</button>' +
                  '<button class="player-btn video-mute-btn" type="button" title="静音">&#128264;</button>' +
                  '<div class="progress-bar-wrap video-progress-wrap">' +
                    '<div class="progress-bar-fill video-progress-fill"></div>' +
                  '</div>' +
                  '<span class="player-time"><span class="video-current-time">00:00</span> / <span class="video-duration">00:00</span></span>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>'
    );

    var $player = $featured.find('.culture-featured-player');
    var $fallback = $('#cultureFeaturedFallback');
    var video = $featured.find('video')[0];

    function markVideoReady() {
      $player.addClass('film-player--ready').removeClass('film-player--unavailable');
      $fallback.attr('hidden', true);
    }

    function markVideoUnavailable(message) {
      $player.addClass('film-player--unavailable').removeClass('film-player--ready');
      $fallback.removeAttr('hidden');
      $fallback.find('span').text('视频暂时无法播放');
      $fallback.find('small').text(message || '请确认 media/culture/' + g.video + ' 存在，并用本地服务器打开页面');
    }

    if (video) {
      video.addEventListener('loadeddata', markVideoReady);
      video.addEventListener('loadedmetadata', markVideoReady);
      video.addEventListener('canplay', markVideoReady);
      video.addEventListener('playing', markVideoReady);
      video.addEventListener('error', function () {
        markVideoUnavailable('路径：' + videoSrc);
      });

      if (video.readyState >= 2) {
        markVideoReady();
      } else {
        window.setTimeout(function () {
          if (video.error) {
            markVideoUnavailable('路径：' + videoSrc);
          } else if (video.readyState >= 1) {
            markVideoReady();
          }
        }, 8000);
      }
    }

    if (typeof window.initFilmVideoPlayer === 'function') {
      window.initFilmVideoPlayer($featured);
    }
  }

  function getLink(item) {
    return item.link || item.external || '';
  }

  function buildPosterCard(item, cat) {
    var href = getLink(item);
    var poster = item.poster || item.cover || FALLBACK_POSTER;
    var hasLink = href && href !== '#';
    var isBook = cat.id === 'book';
    var tag = hasLink ? 'a' : 'div';
    var attrs = hasLink
      ? ' href="' + href + '" class="culture-media-card" target="_blank" rel="noopener noreferrer"'
      : ' class="culture-media-card culture-media-card--pending"';

    return (
      '<' + tag + attrs + ' data-id="' + item.id + '">' +
        '<div class="culture-media-thumb' + (isBook ? ' culture-media-thumb--book' : '') + '">' +
          '<img src="' + poster + '" alt="' + item.title + '" loading="lazy">' +
          (hasLink ? '<span class="culture-media-badge">外链</span>' : '') +
        '</div>' +
        '<div class="culture-media-meta">' +
          '<strong class="culture-media-title">' + item.title + '</strong>' +
          '<span class="culture-media-sub">' + item.subtitle + '</span>' +
        '</div>' +
      '</' + tag + '>'
    );
  }

  $sections.find('.culture-media-card img').on('error', function () {
    if ($(this).attr('src') !== FALLBACK_POSTER) {
      $(this).attr('src', FALLBACK_POSTER);
    }
  });
});
