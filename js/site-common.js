/**
 * 全站内页 · 导航、滚动、页面过渡
 */
$(document).ready(function () {
  'use strict';

  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  $('.film-nav .nav-link').each(function () {
    var href = $(this).attr('href');
    if (href === currentPage || href && href.endsWith('/' + currentPage)) {
      $(this).addClass('active');
    }
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

  if (typeof window.initScrollReveal === 'function') {
    window.initScrollReveal();
  }

  initBackToTop();
});

var BACK_TO_TOP_PAGES = [
  'knowledge.html',
  'customs.html',
  'poetry.html',
  'health.html',
  'calendar.html',
  'culture-library.html',
  'heritage.html'
];

function initBackToTop() {
  var page = window.location.pathname.split('/').pop() || 'index.html';
  if (BACK_TO_TOP_PAGES.indexOf(page) === -1) return;

  if (!$('#backToTop').length) {
    $('body').append(
      '<button type="button" id="backToTop" class="back-to-top" aria-label="回到顶部" title="回到顶部">' +
        '<span class="back-to-top-icon" aria-hidden="true">↑</span>' +
      '</button>'
    );
  }

  var $btn = $('#backToTop');
  var showAt = 320;

  $(window).on('scroll.backToTop', function () {
    $btn.toggleClass('is-visible', $(window).scrollTop() > showAt);
  }).trigger('scroll');

  $btn.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
  });
}
