/**
 * 二十四节气 · 公转圆盘导航
 * 太阳居中，地球公转，24 扇形对应 24 节气
 */

$(document).ready(function () {
  'use strict';

  var $orbitWrap = $('#termOrbitView');
  if (!$orbitWrap.length || typeof solarTerms === 'undefined') return;

  var CX = 300;
  var CY = 300;
  var R_INNER = 95;
  var R_OUTER = 248;
  var R_ORBIT = 268;
  var R_LABEL = 178;
  var currentFilter = 'all';
  var selectedIndex = -1;

  var seasonFill = {
    spring: 'url(#fillSpring)',
    summer: 'url(#fillSummer)',
    autumn: 'url(#fillAutumn)',
    winter: 'url(#fillWinter)'
  };

  function polar(r, deg) {
    var rad = deg * Math.PI / 180;
    return {
      x: CX + r * Math.cos(rad),
      y: CY + r * Math.sin(rad)
    };
  }

  function sectorPath(i) {
    var start = (i - 3) * 15 - 7.5;
    var end = (i - 3) * 15 + 7.5;
    var p1 = polar(R_OUTER, start);
    var p2 = polar(R_OUTER, end);
    var p3 = polar(R_INNER, end);
    var p4 = polar(R_INNER, start);
    var large = end - start > 180 ? 1 : 0;
    return 'M' + p1.x + ',' + p1.y +
      ' A' + R_OUTER + ',' + R_OUTER + ' 0 ' + large + ' 1 ' + p2.x + ',' + p2.y +
      ' L' + p3.x + ',' + p3.y +
      ' A' + R_INNER + ',' + R_INNER + ' 0 ' + large + ' 0 ' + p4.x + ',' + p4.y + ' Z';
  }

  function sectorAngle(i) {
    return (i - 3) * 15;
  }

  function getCurrentTermIndex() {
    return $.solarTerm ? $.solarTerm.getIndex() : 0;
  }

  function buildOrbitSvg() {
    var svg = '<svg class="orbit-svg" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" aria-label="二十四节气公转圆盘">';

    svg += '<defs>';
    svg += '<radialGradient id="sunGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff8e0"/><stop offset="40%" stop-color="#ffd970"/><stop offset="100%" stop-color="#ff9a3c"/></radialGradient>';
    svg += '<radialGradient id="earthGrad" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="#8fd4e8"/><stop offset="100%" stop-color="#2a6a8a"/></radialGradient>';
    svg += '<linearGradient id="fillSpring" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="rgba(168,230,224,0.95)"/><stop offset="100%" stop-color="rgba(126,200,216,0.75)"/></linearGradient>';
    svg += '<linearGradient id="fillSummer" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="rgba(148,220,232,0.95)"/><stop offset="100%" stop-color="rgba(110,201,212,0.75)"/></linearGradient>';
    svg += '<linearGradient id="fillAutumn" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="rgba(176,224,232,0.95)"/><stop offset="100%" stop-color="rgba(122,184,200,0.75)"/></linearGradient>';
    svg += '<linearGradient id="fillWinter" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="rgba(200,236,232,0.95)"/><stop offset="100%" stop-color="rgba(148,204,216,0.75)"/></linearGradient>';
    svg += '<filter id="sunBlur"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
    svg += '</defs>';

    svg += '<circle class="orbit-glow-ring" cx="' + CX + '" cy="' + CY + '" r="' + (R_OUTER + 18) + '"/>';
    svg += '<circle class="orbit-track" cx="' + CX + '" cy="' + CY + '" r="' + R_ORBIT + '" fill="none"/>';

    svg += '<g class="orbit-sectors">';
    solarTerms.forEach(function (term, i) {
      svg += '<path class="orbit-sector season-' + term.season + '" data-index="' + i + '" data-name="' + term.name + '" data-detail="' + term.detail + '" data-season="' + term.season + '" d="' + sectorPath(i) + '" fill="' + seasonFill[term.season] + '"/>';
    });
    svg += '</g>';

    svg += '<g class="orbit-dividers">';
    for (var d = 0; d < 24; d++) {
      var ang = (d - 3) * 15 - 7.5;
      var inner = polar(R_INNER, ang);
      var outer = polar(R_OUTER, ang);
      svg += '<line x1="' + inner.x + '" y1="' + inner.y + '" x2="' + outer.x + '" y2="' + outer.y + '" class="orbit-divider"/>';
    }
    svg += '</g>';

    svg += '<g class="orbit-labels">';
    solarTerms.forEach(function (term, i) {
      var pos = polar(R_LABEL, sectorAngle(i));
      var rot = sectorAngle(i);
      var flip = rot > 90 && rot < 270;
      var textRot = flip ? rot + 180 : rot;
      svg += '<text x="' + pos.x + '" y="' + pos.y + '" class="orbit-label" transform="rotate(' + textRot + ' ' + pos.x + ' ' + pos.y + ')" data-index="' + i + '">' + term.name + '</text>';
    });
    svg += '</g>';

    svg += '<g class="orbit-markers">';
    var markers = [
      { label: '春分', angle: 0 },
      { label: '夏至', angle: 90 },
      { label: '秋分', angle: 180 },
      { label: '冬至', angle: 270 }
    ];
    markers.forEach(function (mk) {
      var p = polar(R_OUTER + 14, mk.angle);
      svg += '<text x="' + p.x + '" y="' + p.y + '" class="orbit-marker" text-anchor="middle" dominant-baseline="middle">' + mk.label + '</text>';
    });
    svg += '</g>';

    svg += '<circle class="orbit-sun" cx="' + CX + '" cy="' + CY + '" r="52" fill="url(#sunGlow)" filter="url(#sunBlur)"/>';
    svg += '<text x="' + CX + '" y="' + (CY + 6) + '" class="orbit-sun-text" text-anchor="middle">太阳</text>';

    var earthPos = polar(R_ORBIT, sectorAngle(getCurrentTermIndex()));
    svg += '<g id="earthGroup" class="earth-group" transform="translate(' + earthPos.x + ',' + earthPos.y + ')">';
    svg += '<circle class="earth-orbit-dot" r="14" fill="url(#earthGrad)"/>';
    svg += '<circle class="earth-orbit-ring" r="20" fill="none"/>';
    svg += '<text class="earth-label" y="32" text-anchor="middle">地球</text>';
    svg += '</g>';

    svg += '</svg>';
    return svg;
  }

  function moveEarth(index) {
    var angle = sectorAngle(index);
    var pos = polar(R_ORBIT, angle);
    $('#earthGroup').attr('transform', 'translate(' + pos.x + ',' + pos.y + ')');
  }

  function updateOrbitInfo(term, index) {
    if (!term) return;
    $('#orbitInfoName').text(term.name);
    $('#orbitInfoDate').text(term.date);
    $('#orbitInfoDesc').text(term.desc);
    $('#orbitInfoDetail').text(term.detail);
    $('#orbitInfoSeason').text(
      { spring: '春季', summer: '夏季', autumn: '秋季', winter: '冬季' }[term.season]
    );
    selectedIndex = index;
    moveEarth(index);
  }

  function applyOrbitFilter(season) {
    currentFilter = season;
    $('.orbit-sector').each(function () {
      var $s = $(this);
      var match = season === 'all' || $s.data('season') === season;
      $s.toggleClass('filtered-out', !match);
      $s.toggleClass('filtered-in', match && season !== 'all');
    });
    $('.orbit-label').each(function () {
      var idx = $(this).data('index');
      var match = season === 'all' || solarTerms[idx].season === season;
      $(this).toggleClass('filtered-out', !match);
    });
  }

  function highlightSector(index) {
    $('.orbit-sector').removeClass('active current-term');
    if (index >= 0) {
      $('.orbit-sector[data-index="' + index + '"]').addClass('active');
    }
    var cur = getCurrentTermIndex();
    $('.orbit-sector[data-index="' + cur + '"]').addClass('current-term');
  }

  function initOrbit() {
    $('#orbitDiagram').html(buildOrbitSvg());

    var curIdx = getCurrentTermIndex();
    updateOrbitInfo(solarTerms[curIdx], curIdx);
    highlightSector(curIdx);
  }

  $orbitWrap.on('click', '.orbit-sector', function () {
    var idx = $(this).data('index');
    updateOrbitInfo(solarTerms[idx], idx);
    highlightSector(idx);
    if (typeof window.showTermModal === 'function') {
      window.showTermModal($(this).data('name'), $(this).data('detail'));
    }
  });

  $orbitWrap.on('mouseenter', '.orbit-sector', function () {
    var idx = $(this).data('index');
    $(this).addClass('hovered');
    moveEarth(idx);
  });

  $orbitWrap.on('mouseleave', '.orbit-sector', function () {
    $(this).removeClass('hovered');
    if (selectedIndex >= 0) {
      moveEarth(selectedIndex);
    }
  });

  window.updateOrbitFilter = applyOrbitFilter;

  window.setOrbitView = function (view) {
    $('#termOrbitView').toggleClass('d-none', view !== 'orbit');
    $('#termCardView').toggleClass('d-none', view !== 'cards');
  };

  initOrbit();
  applyOrbitFilter('all');
});
