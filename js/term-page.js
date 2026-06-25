/**
 * 节气专题页 · 内容渲染
 */
$(document).ready(function () {
  'use strict';

  var slug = $('body').data('slug') || getQuerySlug();
  if (!slug || typeof termPagesData === 'undefined' || !termPagesData[slug]) return;

  var data = termPagesData[slug];
  document.title = '二十四节气 · ' + data.name;

  var imgBase = window.location.pathname.indexOf('/terms/') !== -1
    ? '../../images/terms/'
    : '../images/terms/';

  var flowerBase = window.location.pathname.indexOf('/terms/') !== -1
    ? '../../images/flowers/'
    : '../images/flowers/';

  var $hero = $('#termHeroContent');
  if ($hero.length) {
    var heroHtml =
      '<span class="term-date-badge">' + data.date + '</span>' +
      '<h1>' + data.heroTitle + '</h1>' +
      '<p class="term-hero-desc">' + data.heroDesc + '</p>';
    var theme = typeof termThemes !== 'undefined' ? termThemes[slug] : null;
    if (theme) {
      var flowerHtml = '';
      if (theme.heroFlower === 'plum-branch' || theme.heroFlower === 'orchid-branch') {
        flowerHtml = '<div class="term-hero-flower term-hero-flower--svg" id="termHeroFlower" aria-hidden="true"></div>';
      } else if (theme.heroFlower) {
        flowerHtml = '<img class="term-hero-flower term-hero-flower--img" src="' + flowerBase + theme.heroFlower + '" alt="" aria-hidden="true" width="120" height="160">';
      }
      heroHtml =
        flowerHtml +
        '<span class="term-hero-seal" aria-hidden="true">' + theme.seal + '</span>' +
        heroHtml +
        '<p class="term-hero-motto">' + theme.motto + '</p>';
      if (flowerHtml) {
        $hero.addClass('has-hero-flower');
      }
    }
    $hero.html(heroHtml);

    if ($('#termHeroFlower').length && theme && theme.heroFlower && window.TermHeroFlower) {
      window.TermHeroFlower.mount(theme.heroFlower, document.getElementById('termHeroFlower'));
    }
  }

  var p = data.poetry;
  var poetryExtra = '';
  if (p.poemDu) {
    poetryExtra +=
      '<div class="classic-prose-block reveal reveal-delay-2">' +
        '<div class="classic-quote">「' + p.poemDu.text + '」</div>' +
        '<div class="classic-cite">—— ' + p.poemDu.cite + '</div>' +
      '</div>';
  }
  if (p.sanhou) {
    poetryExtra += '<p class="term-sanhou reveal reveal-delay-2">' + p.sanhou + '</p>';
  }
  if (p.illustration) {
    if (p.illustration.type === 'svg-plum') {
      poetryExtra +=
        '<figure class="poetry-illustration poetry-illustration--compact reveal reveal-delay-3">' +
          '<div class="plum-blossom-static" data-plum-static aria-hidden="true"></div>' +
          '<figcaption>' + p.illustration.caption + '</figcaption>' +
        '</figure>';
    } else {
      poetryExtra +=
        '<figure class="poetry-illustration reveal reveal-delay-3">' +
          '<img src="' + imgBase + p.illustration.src + '" alt="' + p.illustration.alt + '">' +
          '<figcaption>' + p.illustration.caption + '</figcaption>' +
        '</figure>';
    }
  }

  $('#poetryZone').html(
    '<div class="container">' +
      '<p class="zone-label reveal">' + p.label.toUpperCase() + '</p>' +
      '<h2 class="zone-title reveal reveal-delay-1">' + p.title + '</h2>' +
      '<div class="classic-prose-block reveal reveal-delay-2">' +
        '<div class="classic-quote">「' + p.quote + '」</div>' +
        '<div class="classic-cite">—— ' + p.cite + '</div>' +
        '<p class="classic-prose">' + p.prose + '</p>' +
        '<p class="classic-art-note">' + p.artNote + '</p>' +
      '</div>' +
      poetryExtra +
    '</div>'
  );

  var f = data.food;
  var poem = f.poem;
  if (!poem && typeof termFoodData !== 'undefined' && termFoodData[data.name]) {
    poem = termFoodData[data.name].poem;
  }
  var itemsHtml = '';
  f.items.forEach(function (item) {
    itemsHtml +=
      '<div class="col-md-6 mb-4"><div class="food-recipe-card">' +
        '<h4>' + item.title + '</h4>' +
        '<p class="food-desc">' + item.desc + '</p>' +
        '<p class="food-recipe"><strong>做法：</strong>' + item.recipe + '</p>' +
      '</div></div>';
  });

  var imgsHtml = '';
  if (f.images && f.images.length) {
    imgsHtml = '<div class="food-visual-grid reveal reveal-delay-3">';
    f.images.forEach(function (img) {
      imgsHtml +=
        '<div class="food-visual-item">' +
          '<img src="' + imgBase + img.src + '" alt="' + img.alt + '">' +
          '<p class="visual-role">' + img.role + '</p>' +
        '</div>';
    });
    imgsHtml += '</div>';
  }

  var poemHtml = '';
  if (poem && poem.verse) {
    poemHtml =
      '<div class="food-poem-box reveal reveal-delay-2">' +
        '<p class="food-poem-label">食俗诗韵</p>' +
        '<p class="food-poem-verse">「' + poem.verse + '」</p>' +
        (poem.author ? '<p class="food-poem-author">—— ' + poem.author + '</p>' : '') +
      '</div>';
  }

  $('#foodZone').html(
    '<div class="container">' +
      '<p class="zone-label food-zone-label reveal">' + f.label.toUpperCase() + '</p>' +
      '<h2 class="zone-title food-zone-title reveal reveal-delay-1">' + f.title + '</h2>' +
      '<p class="food-intro reveal reveal-delay-1">' + f.intro + '</p>' +
      '<div class="row">' + itemsHtml + '</div>' +
      '<div class="food-folk-box reveal reveal-delay-2">' + f.folk + '</div>' +
      poemHtml +
      imgsHtml +
    '</div>'
  );

  var mediaBase = window.location.pathname.indexOf('/terms/') !== -1
    ? '../../media/terms/'
    : '../media/terms/';

  var videos = data.videos;
  if (!videos && data.video) {
    videos = [data.video];
  }
  if (!videos || !videos.length) {
    videos = [
      { title: data.name + ' · 节气影像（一）', desc: '本节气主题短片，请放入对应视频文件后播放。', src: slug + '-1.mp4' },
      { title: data.name + ' · 节气影像（二）', desc: '本节气补充短片，请放入对应视频文件后播放。', src: slug + '-2.mp4' }
    ];
  }

  var posterUrl = imgBase + slug + '.png';
  var ordinals = ['其一', '其二', '其三', '其四'];
  var playersHtml = '<div class="term-video-stack">';
  var tipsHtml = '';
  videos.forEach(function (v, i) {
    var poster = v.poster ? imgBase + v.poster : posterUrl;
    playersHtml +=
      '<article class="term-video-card reveal reveal-delay-' + (i + 1) + '">' +
        '<header class="term-video-card-head">' +
          '<span class="term-video-ordinal">' + (ordinals[i] || String(i + 1)) + '</span>' +
          '<h3 class="term-video-title">' + v.title + '</h3>' +
          '<p class="term-video-card-desc">' + v.desc + '</p>' +
        '</header>' +
        '<div class="film-player term-film-player">' +
          '<div class="term-video-screen">' +
            '<div class="term-video-poster-fallback" aria-hidden="true">' +
              '<span class="term-video-poster-hint">节气短片 · 敬请期待</span>' +
            '</div>' +
            '<video class="film-video-player" preload="metadata" playsinline poster="' + poster + '">' +
              '<source src="' + mediaBase + v.src + '" type="video/mp4">' +
              '您的浏览器不支持 HTML5 视频播放。' +
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
      '</article>';
    tipsHtml += '<code>media/terms/' + v.src + '</code>' + (i < videos.length - 1 ? ' · ' : '');
  });
  playersHtml += '</div>';

  $('#mediaZone').html(
    '<div class="container term-video-zone-inner">' +
      '<p class="zone-label reveal">影像</p>' +
      '<h2 class="zone-title reveal reveal-delay-1">' + data.name + ' · 节气影像</h2>' +
      '<p class="term-video-desc reveal reveal-delay-1">两段主题短片，从不同角度呈现节令风物与人文。</p>' +
      playersHtml +
      '<p class="term-video-tip term-dev-tip reveal reveal-delay-3">视频文件请放入：' + tipsHtml + '</p>' +
    '</div>'
  );

  var audioBase = mediaBase;
  var a = data.audio || {
    title: data.name + ' · 节令音频',
    subtitle: '节气主题音乐',
    desc: '聆听本节气主题音频，感受节令流转。',
    src: slug + '.mp3'
  };

  $('#audioZone').html(
    '<div class="container">' +
      '<p class="zone-label reveal">AUDIO</p>' +
      '<h2 class="zone-title reveal reveal-delay-1">' + data.name + ' · 节令音频</h2>' +
      '<p class="term-audio-desc reveal reveal-delay-1">' + a.desc + '</p>' +
      '<div class="term-audio-wrap reveal reveal-delay-2">' +
        '<div class="audio-card" data-audio="' + audioBase + a.src + '">' +
          '<div class="play-icon">&#9654;</div>' +
          '<div class="term-audio-info">' +
            '<h4>' + a.title + '</h4>' +
            '<p>' + a.subtitle + '</p>' +
            '<div class="audio-progress"><div class="audio-progress-fill"></div></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<p class="term-audio-tip term-dev-tip reveal reveal-delay-3">音频文件请放入 <code>media/terms/' + a.src + '</code></p>' +
    '</div>'
  );

  if (typeof window.initFilmVideoPlayer === 'function') {
    window.initFilmVideoPlayer($('#mediaZone'));
  }

  if (typeof window.initScrollReveal === 'function') {
    window.initScrollReveal();
  }

  if (typeof window.PlumBlossomFx !== 'undefined') {
    $('[data-plum-static]').each(function () {
      window.PlumBlossomFx.mountStatic(this, 52);
    });
  }
});

function getQuerySlug() {
  var params = new URLSearchParams(window.location.search);
  return params.get('t') || '';
}
