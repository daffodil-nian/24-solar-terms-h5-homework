/**
 * index2 · Bemox 风格首页 · Bootstrap + jQuery
 */
$(function () {
  'use strict';

  if (typeof solarTerms === 'undefined') return;

  var seasonLabel = { spring: '春', summer: '夏', autumn: '秋', winter: '冬' };

  function showTermModal(name, detail) {
    $('#termModalTitle').text(name);
    $('#termModalBody').text(detail);
    bootstrap.Modal.getOrCreateInstance(document.getElementById('termModal')).show();
  }

  function updateToday() {
    var info = $.solarTerm.getCurrent();
    $('#todayTermText').text(info.name + ' · ' + info.date + ' · ' + seasonLabel[info.season]);
  }

  function renderTermStrip(filter) {
    var currentName = $.solarTerm.getCurrent().name;
    var list = $.solarTerm.filterBySeason(filter);

    var $strip = $('#termStrip').empty();
    $.each(list, function (_, term) {
      var isCurrent = term.name === currentName;
      var $btn = $('<button type="button" class="btn btn-outline-secondary btn-sm"></button>')
        .text(term.name)
        .toggleClass('btn-term-current', isCurrent)
        .on('click', function () {
          showTermModal(term.name, term.detail);
        });
      $strip.append($btn);
    });
  }

  function animateCount($el) {
    var target = parseInt($el.data('target'), 10);
    if (isNaN(target)) return;
    var duration = 1200;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var value = Math.floor(progress * target);
      $el.text(value);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        $el.text(target);
      }
    }
    requestAnimationFrame(step);
  }

  $('#seasonPills .btn').on('click', function () {
    $('#seasonPills .btn').removeClass('active');
    $(this).addClass('active');
    renderTermStrip($(this).data('season'));
  });

  $(window).on('scroll', function () {
    $('.film-nav').toggleClass('scrolled', $(this).scrollTop() > 40);
  });

  $('.count-up').each(function () {
    animateCount($(this));
  });

  updateToday();
  renderTermStrip('all');
});
