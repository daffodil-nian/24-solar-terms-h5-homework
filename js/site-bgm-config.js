/**
 * 全站背景音乐 · 全局配置（只改这个文件即可）
 */
window.SiteBgmConfig = {
  /* 只播放第 1 首 bg_music.mp3（卡农），不轮播第 2、3 首 */
  count: 1,
  volume: 0.5,
  baseName: 'bg_music',
  ext: '.mp3',
  /* 进入首页时自动播放（若浏览器拦截，点页面任意处即可） */
  autoplayHome: true,
  ui: {
    icon: '♫',
    right: '1rem',
    top: 'calc(56px + 0.75rem)',
    size: '44px',
    zIndex: 10050
  }
};
