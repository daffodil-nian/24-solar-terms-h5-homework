/**
 * 二十四节气 · 地理分布页交互
 * 基于 MapOfChina1.png 分区热区 + 下方标签
 */
$(document).ready(function () {
  'use strict';

  var $panel = $('#mapInfoPanel');
  var $hotspots = $('#chinaMapHotspots');
  var $chips = $('#mapRegionChips');
  if (!$panel.length || !$hotspots.length) return;

  /* 热区位置按 1536×1024 地图百分比估算，可按实际图片微调 */
  var mapRegions = [
    {
      id: 'northwest',
      name: '西北地区',
      info: '西北地域辽阔，节气变化剧烈。立春仍寒，清明方暖，处暑后昼夜温差大，霜降早至。',
      box: { left: '2%', top: '4%', width: '34%', height: '46%' }
    },
    {
      id: 'north',
      name: '华北地区',
      info: '华北为二十四节气发源地之一。春分前后回暖，夏至昼长，秋分天高气爽，冬至数九寒天。',
      box: { left: '34%', top: '23%', width: '22%', height: '28%' }
    },
    {
      id: 'northeast',
      name: '东北地区',
      info: '东北节气偏晚，春季短促。谷雨方种，小满麦苗绿，白露早霜，大雪封河，大寒极寒。',
      box: { left: '56%', top: '2%', width: '30%', height: '34%' }
    },
    {
      id: 'east',
      name: '华东地区',
      info: '华东雨热同期，节气与农事紧密。雨水即湿，芒种忙种，小暑伏天，寒露蟹肥，霜降赏菊。',
      box: { left: '58%', top: '34.5%', width: '24%', height: '46%' }
    },
    {
      id: 'central',
      name: '华中地区',
      info: '华中四季分明，节气过渡清晰。惊蛰雷动，清明踏青，大暑酷热，秋分平衡，小雪初降。',
      box: { left: '40%', top: '48%', width: '20%', height: '24%' }
    },
    {
      id: 'south',
      name: '华南地区',
      info: '华南几乎无冬，节气偏暖。立春即花，夏至台风季，白露仍热，霜降少见，冬至如秋。',
      box: { left: '38%', top: '76%', width: '28%', height: '14%' }
    },
    {
      id: 'southwest',
      name: '西南地区',
      info: '西南地形复杂，节气垂直差异大。高原春迟，盆地春早，夏至多雨，霜降可见于高海拔。',
      box: { left: '8%', top: '44%', width: '32%', height: '38%' }
    }
  ];

  var activeId = null;

  function selectRegion(id) {
    var region = mapRegions.filter(function (r) { return r.id === id; })[0];
    if (!region) return;

    activeId = id;
    $('.map-hotspot, .map-region-chip').removeClass('active');
    $('.map-hotspot[data-id="' + id + '"], .map-region-chip[data-id="' + id + '"]').addClass('active');

    $panel.addClass('updating');
    setTimeout(function () {
      $('#mapInfoTitle').text(region.name);
      $('#mapInfoText').text(region.info);
      $panel.removeClass('updating');
    }, 200);
  }

  $.each(mapRegions, function (_, region) {
    var box = region.box;
    var $hotspot = $('<button type="button" class="map-hotspot"></button>');
    $hotspot
      .attr({
        'data-id': region.id,
        'data-name': region.name,
        'aria-label': region.name
      })
      .css({
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height
      })
      .on('mouseenter click', function (e) {
        e.preventDefault();
        selectRegion(region.id);
      });
    $hotspots.append($hotspot);

    var $chip = $('<button type="button" class="map-region-chip"></button>');
    $chip
      .attr('data-id', region.id)
      .text(region.name)
      .on('click', function () {
        selectRegion(region.id);
      });
    $chips.append($chip);
  });
});
