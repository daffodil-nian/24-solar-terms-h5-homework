/**
 * 时令养生页
 */
$(document).ready(function () {
  'use strict';

  var seasonWellness = {
    spring: {
      organ: '肝',
      quote: '春三月，此谓发陈。天地俱生，万物以荣。',
      tip: '阳气生发，宜早睡早起、广步于庭。饮食少酸多甘，情志当舒展，以免肝气郁结。'
    },
    summer: {
      organ: '心',
      quote: '夏三月，此谓蕃秀。天地气交，万物华实。',
      tip: '心气当旺，宜晚睡早起、饮食清淡。食苦瓜、绿豆以清热，避免大汗后立即冲凉。'
    },
    autumn: {
      organ: '肺',
      quote: '秋三月，此谓容平。天气以急，地气以明。',
      tip: '燥气当令，宜早卧早起。食梨、银耳、百合以润肺，「春捂秋冻」但霜降后须添衣。'
    },
    winter: {
      organ: '肾',
      quote: '冬三月，此谓闭藏。水冰地坼，无扰乎阳。',
      tip: '阳气内藏，宜早卧晚起、必待日光。饮食温补，冬至「一阳生」，宜静养藏精。'
    }
  };

  var seasonLabel = { spring: '春季', summer: '夏季', autumn: '秋季', winter: '冬季' };

  function updateHealthHero() {
    if (!$.solarTerm) return;
    var term = $.solarTerm.getCurrent();
    var info = seasonWellness[term.season];
    if (!info) return;

    $('#healthHeroChip').html(
      '当前 <strong>' + term.name + '</strong> · ' + seasonLabel[term.season] + '养' + info.organ
    );

    $('#healthSpotlightTitle').text(term.name + ' · 养' + info.organ);
    $('#healthSpotlightMeta').text(term.date + ' · ' + seasonLabel[term.season] + '时令');
    $('#healthSpotlightTip').text(info.tip);
    $('#healthSpotlightQuote').text('「' + info.quote + '」');

    $('.health-season-card').removeClass('is-current');
    $('.health-season-card--' + term.season).addClass('is-current');
  }

  $('.health-tip-btn').on('click', function () {
    var $btn = $(this);
    var target = $btn.data('bs-target');
    var $collapse = $(target);
    var isOpen = $collapse.hasClass('show');

    $('.health-tip-btn').attr('aria-expanded', 'false');
    $('.health-tip-collapse').removeClass('show');

    if (!isOpen) {
      $collapse.addClass('show');
      $btn.attr('aria-expanded', 'true');
    }
  });

  updateHealthHero();
});
