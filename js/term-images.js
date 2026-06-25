/**
 * 节气配图 · images/terms/{slug}.png / .svg，季节底色兜底
 */
(function (window) {
  'use strict';

  var BASE = '../images/terms/';
  var SEASON_BG = {
    spring: '../images/bg-spring.svg',
    summer: '../images/bg-summer.svg',
    autumn: '../images/bg-autumn.svg',
    winter: '../images/bg-winter.svg'
  };

  /** 美食/风物 SVG 别名（无 slug 主图时使用） */
  var FOOD_ICON = {
    lichun: 'caitai.svg',
    yushui: 'jicai.svg',
    jingzhe: 'chunsun.svg',
    chunfen: 'xiangchun.svg',
    qingming: 'xinghua.svg',
    guyu: 'guyu.svg',
    lixia: 'xinghua.svg',
    xiazhi: 'xinghua.svg',
    bailu: 'yulan.svg'
  };

  /** 栏目网格优先使用的风物图（覆盖 slug.png 缺失） */
  var TERM_ART = {
    yushui: 'orchid-rain.svg',
    guyu: 'guyu.svg'
  };

  function getSlug(name) {
    return typeof termSlugs !== 'undefined' ? termSlugs[name] : null;
  }

  function getSeasonFallbackUrl(season) {
    if (season && SEASON_BG[season]) {
      return SEASON_BG[season];
    }
    return SEASON_BG.spring;
  }

  function getFallbackChain(name, season) {
    var slug = getSlug(name);
    var chain = [];
    if (slug) {
      chain.push(BASE + slug + '.png');
      chain.push(BASE + slug + '.svg');
      if (TERM_ART[slug]) {
        chain.push(BASE + TERM_ART[slug]);
      }
      if (FOOD_ICON[slug]) {
        chain.push(BASE + FOOD_ICON[slug]);
      }
    }
    chain.push(getSeasonFallbackUrl(season));
    return chain;
  }

  function getTermImageUrl(name) {
    var slug = getSlug(name);
    if (!slug) return getSeasonFallbackUrl();
    return BASE + slug + '.png';
  }

  function getTermImageAlt(name) {
    return name + ' · 节气风物示意';
  }

  function bindImageFallback($img, name, season) {
    if (!$img || !$img.length) return;
    var chain = getFallbackChain(name, season);
    var index = 0;

    $img.off('error.termImg').on('error.termImg', function () {
      index += 1;
      if (index < chain.length) {
        $(this).attr('src', chain[index]);
      }
    });
  }

  function getFoodImageUrl(name) {
    if (typeof termFoodData !== 'undefined' && termFoodData[name] && termFoodData[name].image) {
      var img = termFoodData[name].image;
      if (img.indexOf('http://') === 0 || img.indexOf('https://') === 0 || img.indexOf('../') === 0) {
        return img;
      }
      if (img.indexOf('food/') === 0) {
        return '../images/' + img;
      }
      return BASE + img;
    }
    var slug = getSlug(name);
    if (slug && FOOD_ICON[slug]) {
      return BASE + FOOD_ICON[slug];
    }
    return getTermImageUrl(name);
  }

  function getFoodImageAlt(name) {
    if (typeof termFoodData !== 'undefined' && termFoodData[name] && termFoodData[name].imageAlt) {
      return termFoodData[name].imageAlt;
    }
    if (typeof termFoodData !== 'undefined' && termFoodData[name] && termFoodData[name].title) {
      return termFoodData[name].title;
    }
    return name + ' · 节气美食';
  }

  function getFoodFallbackChain(name, season) {
    var chain = [];
    if (typeof termFoodData !== 'undefined' && termFoodData[name] && termFoodData[name].image) {
      chain.push(getFoodImageUrl(name));
    }
    var slug = getSlug(name);
    if (slug && FOOD_ICON[slug]) {
      chain.push(BASE + FOOD_ICON[slug]);
    }
    chain.push(getSeasonFallbackUrl(season));
    return chain;
  }

  function bindFoodFallback($img, name, season) {
    if (!$img || !$img.length) return;
    var chain = getFoodFallbackChain(name, season);
    var index = 0;
    $img.off('error.termFoodImg').on('error.termFoodImg', function () {
      index += 1;
      if (index < chain.length) {
        $(this).attr('src', chain[index]);
      }
    });
  }

  window.termImages = {
    base: BASE,
    foodBase: '../images/food/',
    getUrl: getTermImageUrl,
    getFoodUrl: getFoodImageUrl,
    getSeasonFallback: getSeasonFallbackUrl,
    getAlt: getTermImageAlt,
    getFoodAlt: getFoodImageAlt,
    getFallbackChain: getFallbackChain,
    getFoodFallbackChain: getFoodFallbackChain,
    bindFallback: bindImageFallback,
    bindFoodFallback: bindFoodFallback
  };
})(window);
