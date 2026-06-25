/**
 * 节气日历 · 月历格（图片卡片）
 */
$(document).ready(function () {
  'use strict';

  if (typeof solarTerms === 'undefined') return;

  function imgUrl(term) {
    if (typeof termImages === 'undefined') return '';
    return termImages.getUrl(term.name) || termImages.getSeasonFallback(term.season);
  }

  function imgAlt(term) {
    return typeof termImages !== 'undefined' ? termImages.getAlt(term.name) : term.name;
  }

  function daysUntilNextTerm() {
    return $.solarTerm.getNext().days;
  }

  var curIdx = $.solarTerm.getIndex();
  var cur = solarTerms[curIdx];
  var nextIdx = (curIdx + 1) % 24;
  var next = solarTerms[nextIdx];

  $('#todayTermName').text(cur.name);
  $('#todayTermDesc').text(cur.desc);
  $('#todayTermDate').text(cur.date);
  $('#nextTermInfo').text('距「' + next.name + '」还有 ' + daysUntilNextTerm() + ' 天');

  var seasonLabel = { spring: '春', summer: '夏', autumn: '秋', winter: '冬' };
  var $tbody = $('#calendarBody');
  $tbody.empty();

  solarTerms.forEach(function (term, i) {
    var isCurrent = i === curIdx;
    var row = $(
      '<tr class="' + (isCurrent ? 'calendar-row-current' : '') + '">' +
        '<td><span class="calendar-index">' + (i + 1) + '</span></td>' +
        '<td><strong>' + term.name + '</strong>' +
          (isCurrent ? ' <span class="badge bg-info ms-1">当前</span>' : '') + '</td>' +
        '<td>' + term.date + '</td>' +
        '<td><span class="calendar-season season-' + term.season + '">' + seasonLabel[term.season] + '</span></td>' +
        '<td class="d-none d-md-table-cell">' + term.desc + '</td>' +
      '</tr>'
    );
    $tbody.append(row);
  });

  var $grid = $('#calendarGrid');
  if ($grid.length) {
    solarTerms.forEach(function (term, i) {
      var cls = 'calendar-cell calendar-cell--thumb season-' + term.season;
      if (i === curIdx) cls += ' current';

      $grid.append(
        '<button type="button" class="' + cls + '" data-name="' + term.name + '">' +
          '<span class="calendar-cell-thumb">' +
            '<img src="' + imgUrl(term) + '" alt="' + imgAlt(term) + '" loading="lazy" width="160" height="100">' +
            '<span class="calendar-cell-season">' + seasonLabel[term.season] + '</span>' +
          '</span>' +
          '<span class="calendar-cell-body">' +
            '<span class="cell-name">' + term.name + '</span>' +
            '<span class="cell-date">' + term.date + '</span>' +
          '</span>' +
        '</button>'
      );
    });

    $grid.find('.calendar-cell-thumb img').each(function () {
      var $img = $(this);
      var $cell = $img.closest('.calendar-cell');
      var name = $cell.data('name');
      var term = solarTerms.find(function (t) { return t.name === name; });
      if (term && typeof termImages !== 'undefined') {
        termImages.bindFallback($img, term.name, term.season);
      }
    });
  }

  $grid.on('click', '.calendar-cell', function () {
    var name = $(this).data('name');
    var term = solarTerms.find(function (t) { return t.name === name; });
    if (term && typeof window.showTermModal === 'function') {
      showTermModal(term.name, term.detail);
    }
  });
});
