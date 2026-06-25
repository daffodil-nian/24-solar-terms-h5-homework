/**
 * 二十四节气 · 共享数据
 */
var solarTerms = [
  { name: '立春', date: '2月3-5日', season: 'spring', desc: '万物起始，一切更生', detail: '立春，为二十四节气之首。立，是"开始"之意；春，代表着温暖、生长。立春意味着万物由静转动，万物复苏。' },
  { name: '雨水', date: '2月18-20日', season: 'spring', desc: '降雨开始，雨量渐增', detail: '雨水节气意味着降雨开始，雨量渐增。此时气温回升、冰雪融化、降水增多，故取名为雨水。' },
  { name: '惊蛰', date: '3月5-7日', season: 'spring', desc: '春雷乍动，蛰虫苏醒', detail: '惊蛰，古称"启蛰"，是指春雷乍动，惊醒了蛰伏在土中冬眠的动物。' },
  { name: '春分', date: '3月20-22日', season: 'spring', desc: '昼夜平分，春意正浓', detail: '春分，是春季第四个节气。春分时，太阳直射赤道，全球昼夜等长。' },
  { name: '清明', date: '4月4-6日', season: 'spring', desc: '气清景明，万物皆显', detail: '清明，因节令期间气清景明、万物皆显而得名。此时大地呈现春和景明之象。' },
  { name: '谷雨', date: '4月19-21日', season: 'spring', desc: '雨生百谷，播种时节', detail: '谷雨，是春季的最后一个节气。谷雨取自"雨生百谷"之意，此时降水明显增加。' },
  { name: '立夏', date: '5月5-7日', season: 'summer', desc: '万物至此皆长大', detail: '立夏，是夏季的第一个节气。立夏表示告别春天，是夏天的开始。' },
  { name: '小满', date: '5月20-22日', season: 'summer', desc: '麦类等夏熟作物籽粒初满', detail: '小满，指夏熟作物的籽粒开始灌浆饱满，但还未成熟，只是小满，还未大满。' },
  { name: '芒种', date: '6月5-7日', season: 'summer', desc: '有芒之种，忙收忙种', detail: '芒种，是"有芒之谷类作物可种"的意思。这个时节气温显著升高、雨量充沛。' },
  { name: '夏至', date: '6月21-22日', season: 'summer', desc: '日长之至，日影短至', detail: '夏至，是北半球白昼最长、黑夜最短的一天。夏至过后，太阳直射点开始从北回归线向南移动。' },
  { name: '小暑', date: '7月6-8日', season: 'summer', desc: '温风至，蟋蟀居宇', detail: '小暑，是农历二十四节气中第十一个节气。暑，表示炎热的意思，小暑为小热。' },
  { name: '大暑', date: '7月22-24日', season: 'summer', desc: '一年中最热的时候', detail: '大暑，是夏季最后一个节气。大暑相对小暑，更加炎热，是一年中日照最多、气温最高的时期。' },
  { name: '立秋', date: '8月7-9日', season: 'autumn', desc: '凉风至，白露生', detail: '立秋，是秋季的第一个节气。立秋并不代表酷热天气就此结束，还在暑热时段。' },
  { name: '处暑', date: '8月22-24日', season: 'autumn', desc: '暑气至此而止', detail: '处暑，是"出暑"的意思，即"出暑"，炎热将离开的意思。' },
  { name: '白露', date: '9月7-9日', season: 'autumn', desc: '露凝而白，秋意渐浓', detail: '白露，是"二十四节气"中的第十五个节气。白露是反映自然界寒气增长的重要节气。' },
  { name: '秋分', date: '9月22-24日', season: 'autumn', desc: '昼夜平分，秋意正浓', detail: '秋分，是秋季第四个节气。秋分过后，太阳直射点继续由赤道进入南半球。' },
  { name: '寒露', date: '10月8-9日', season: 'autumn', desc: '露气寒冷，将凝结', detail: '寒露，是二十四节气之第十七个节气。进入寒露，时有冷空气南下，昼夜温差较大。' },
  { name: '霜降', date: '10月23-24日', season: 'autumn', desc: '天气渐冷，初霜出现', detail: '霜降，是秋季的最后一个节气。霜降不是表示"降霜"，而是表示气温骤降、昼夜温差大。' },
  { name: '立冬', date: '11月7-8日', season: 'winter', desc: '万物收藏，冬之伊始', detail: '立冬，是二十四节气之第十九个节气，也是冬季的起始。立，建始也，表示冬季自此开始。' },
  { name: '小雪', date: '11月22-23日', season: 'winter', desc: '雪量渐增，天寒地冻', detail: '小雪，是二十四节气中的第二十个节气。小雪是反映降水与气温的节气，它是寒潮和强冷空气活动频数较高的节气。' },
  { name: '大雪', date: '12月6-8日', season: 'winter', desc: '雪量增大，地面积雪', detail: '大雪，是二十四节气中的第二十一个节气。大雪节气是一个以降水为特征的节气，标志着仲冬时节正式开始。' },
  { name: '冬至', date: '12月21-23日', season: 'winter', desc: '日短之至，日影长至', detail: '冬至，又称"冬节"，是二十四节气中最早被制定的一个。冬至这天，太阳直射南回归线。' },
  { name: '小寒', date: '1月5-7日', season: 'winter', desc: '冷气积久，天渐寒', detail: '小寒，是二十四节气中的第二十三个节气，冬季第五个节气。小寒标志着季冬时节的开始。' },
  { name: '大寒', date: '1月20-21日', season: 'winter', desc: '一年中最冷的时候', detail: '大寒，是二十四节气中的最后一个节气。大寒同小寒一样，都是表示天气寒冷程度的节气。' }
];

/* 各节气大致起始日期 [月, 日] 用于判断当前节气 */
var termDates = [
  [2, 4], [2, 19], [3, 6], [3, 21], [4, 5], [4, 20],
  [5, 6], [5, 21], [6, 6], [6, 21], [7, 7], [7, 23],
  [8, 8], [8, 23], [9, 8], [9, 23], [10, 8], [10, 23],
  [11, 7], [11, 22], [12, 7], [12, 22], [1, 6], [1, 20]
];

(function ($) {
  'use strict';

  /**
   * 判断日期处于哪个节气（返回 0–23 下标）
   * @param {Date|string|number} [date] 不传则今天
   */
  function getIndex(date) {
    var d = date ? new Date(date) : new Date();
    var m = d.getMonth() + 1;
    var day = d.getDate();

    /* 小寒、大寒在公历一月，排在数组末尾 */
    if (m === 1) {
      if (day < termDates[22][1]) return 21;
      if (day < termDates[23][1]) return 22;
      return 23;
    }

    /* 立春至冬至：仅匹配索引 0–21 */
    for (var i = 21; i >= 0; i--) {
      var td = termDates[i];
      if (m > td[0] || (m === td[0] && day >= td[1])) {
        return i;
      }
    }

    /* 立春前（如 2 月初几日仍为大寒） */
    return 23;
  }

  /**
   * 判断日期处于哪个节气（返回完整对象）
   * @example $.solarTerm.getCurrent().name  // "芒种"
   */
  function getCurrent(date) {
    var idx = getIndex(date);
    var term = solarTerms[idx];
    return $.extend({}, term, {
      index: idx,
      term: term
    });
  }

  /**
   * 下一个节气及剩余天数
   */
  function getNext(date) {
    var d = date ? new Date(date) : new Date();
    var curIdx = getIndex(d);
    var nextIdx = (curIdx + 1) % 24;
    var td = termDates[nextIdx];
    var year = d.getFullYear();
    var start = new Date(year, td[0] - 1, td[1]);

    if (start <= d) {
      start = new Date(year + 1, td[0] - 1, td[1]);
    }

    var days = Math.ceil((start - d) / (1000 * 60 * 60 * 24));

    return {
      index: nextIdx,
      term: solarTerms[nextIdx],
      name: solarTerms[nextIdx].name,
      days: days,
      startDate: start
    };
  }

  /** 按季节筛选，season 传 'all' 返回全部 */
  function filterBySeason(season) {
    if (season === 'all') {
      return $.merge([], solarTerms);
    }
    return $.grep(solarTerms, function (t) {
      return t.season === season;
    });
  }

  $.solarTerm = {
    list: solarTerms,
    dates: termDates,
    getIndex: getIndex,
    getCurrent: getCurrent,
    getNext: getNext,
    filterBySeason: filterBySeason
  };

  window.getCurrentTermIndex = getIndex;
  window.getCurrentSolarTerm = getCurrent;
  window.getNextSolarTerm = getNext;

  if (typeof termSeasonalExtras !== 'undefined') {
    solarTerms.forEach(function (t) {
      var extra = termSeasonalExtras[t.name];
      if (extra) {
        $.extend(t, extra);
      }
    });
  }

})(jQuery);

