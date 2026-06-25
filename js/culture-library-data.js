/**
 * 节气文化联动库 · 资源数据
 * 封面图放入 images/culture/，外链填写 link 字段
 */
var cultureLibraryData = {
	intro: {
		title: '节气文化联动库',
		tagline: '四时流转藏万象，节气文脉入万象',
		lead: '本功能库汇集各类节气主题文艺资源，涵盖纪实纪录片、院线电影、古装电视剧、国风综艺、原创动画、经典国风舞剧、权威节气典籍七大类内容。',
		body: '以二十四节气为脉络，串联农耕风物、时令民俗、古典美学与岁序诗词；既有记录真实乡土四季的纪实影像，也有复刻古人时令生活的影视故事，兼具治愈国风动画与传世舞台舞蹈，搭配气象专家撰写的节气专业典籍，从视听到文字，多维解锁二十四节气背后深厚的中华传统文化。'
	},
	featuredGuest: {
		label: '特邀嘉宾',
		title: '2022 北京冬奥会开幕式',
		subtitle: 'Twenty-Four Solar Terms · Opening Countdown',
		desc: '2022 年北京冬奥会开幕式以「二十四节气」倒计时惊艳世界——从「立春」到「大寒」，每一帧都配以经典诗句与物候意象，将中华历法之美推向全球舞台。本节收录开幕式相关影像，作为本联动库的特邀呈现。',
		video: 'Olympics.mp4',
		poster: '../images/culture/beijing2022-opening.jpg',
		quote: '律回岁晚冰霜少，春到人间草木知。',
		quoteCite: '立春 · 张栻《立春偶成》'
	},
	categories: [{
			id: 'documentary',
			name: '纪实影像',
			caption: '《四季中国》《节气：四季的交响》，实地拍摄记录各地节气农耕民俗',
			icon: '纪'
		},
		{
			id: 'film',
			name: '院线影片',
			caption: '《白蛇：浮生》《海的尽头是草原》，以节气流转推动剧情、烘托故事意境',
			icon: '影'
		},
		{
			id: 'drama',
			name: '古装剧集',
			caption: '《长安二十四计》《知否知否应是绿肥红瘦》，完整还原古代民间宫廷时令习俗',
			icon: '剧'
		},
		{
			id: 'variety',
			name: '国风综艺',
			caption: '《舌尖上的中国》，围绕节气时令美食，讲述四时饮食风物',
			icon: '综'
		},
		{
			id: 'animation',
			name: '国风动画',
			caption: '《二十四节气密码》，以奇幻国风叙事科普节气物候与神话',
			icon: '绘'
		},
		{
			id: 'dance',
			name: '舞台舞剧',
			caption: '《只此青绿》，以山水舞绘，演绎暮春青绿独有的节气山河意境',
			icon: '舞'
		},
		{
			id: 'book',
			name: '典籍读物',
			caption: '宋英杰《二十四节气百科全书》，节气领域权威科普文史著作',
			icon: '书'
		}
	],
	items: [{
			id: 'seasons-of-china',
			category: 'documentary',
			title: '四季中国',
			subtitle: 'Seasons of China',
			desc: '央视出品，以二十四节气为线索，记录中国各地真实的四季更迭、农耕劳作与乡土风物。',
			poster: '../images/culture/sijizhongguo.png',
			link: 'https://www.bilibili.com/video/BV1GM4y1L7AF?t=0'
		},
		{
			id: 'seasons-symphony',
			category: 'documentary',
			title: '节气：四季的交响',
			subtitle: 'Documentary',
			desc: '以交响叙事串联二十四个节令，呈现节气与自然、人文、音乐交织的宏观图景。',
			poster: '../images/culture/siji.png',
			link: 'https://tv.cctv.com/2022/12/26/VIDAk4cVSTlMevVaMt4Qq8Tl221226.shtml'
		},
		{
			id: 'white-snake',
			category: 'film',
			title: '白蛇：浮生',
			subtitle: 'White Snake: Afloat',
			desc: '国风动画电影，以江南烟雨、清明谷雨等节令为背景，写尽东方爱情与浮生如梦。',
			poster: '../images/culture/baishe.png',
			link: 'https://www.bilibili.com/bangumi/media/md21189668'
		},
		{
			id: 'end-of-sea',
			category: 'film',
			title: '海的尽头是草原',
			subtitle: 'Feature Film',
			desc: '草原牧区四季流转，以立秋、白露、霜降等节候变化烘托家国情怀与民族记忆。',
			poster: '../images/culture/haidejingtou.png',
			link: 'https://baike.baidu.com/item/%E6%B5%B7%E7%9A%84%E5%B0%BD%E5%A4%B4%E6%98%AF%E8%8D%89%E5%8E%9F/56733656'
		},
		{
			id: 'changan-24',
			category: 'drama',
			title: '长安二十四计',
			subtitle: 'TV Series',
			desc: '以长安城为轴，借节令更迭写权谋与人情，还原古代宫廷民间的时令礼俗。',
			poster: '../images/culture/changan.png',
			link: 'https://baike.baidu.com/item/%E9%95%BF%E5%AE%89%E4%BA%8C%E5%8D%81%E5%9B%9B%E8%AE%A1/64048108'
		},
		{
			id: 'zhifou',
			category: 'drama',
			title: '知否知否应是绿肥红瘦',
			subtitle: 'TV Series',
			desc: '宋代市井生活长卷，清明踏青、端午驱邪、中秋赏月等节俗贯穿全剧。',
			poster: '../images/culture/zhifou.png',
			link: 'https://baike.baidu.com/item/%E7%9F%A5%E5%90%A6%E7%9F%A5%E5%90%A6%E6%87%89%E6%98%AF%E7%B6%A0%E8%82%A5%E7%B4%85%E7%98%A6/20485668'
		},
		{
			id: 'bite-of-china',
			category: 'variety',
			title: '舌尖上的中国',
			subtitle: 'Variety · Food',
			desc: '以节令时鲜为线索，讲述中国人「不时不食」的饮食哲学与四时风物。',
			poster: '../images/culture/shejian.png',
			link: 'https://tv.cctv.com/2017/01/19/VIDAtIyRXSWBaJGZ1itGdZFE170119.shtml'
		},
		{
			id: 'term-password',
			category: 'animation',
			title: '二十四节气密码',
			subtitle: 'Animation',
			desc: '奇幻国风动画，以少年冒险故事科普节气物候、神话传说与传统文化密码。',
			poster: '../images/culture/mima.png',
			link: 'https://tv.cctv.com/2026/03/13/VIDAtlV0EBKpfxEPMfXAmZhZ260313.shtml'
		},
		{
			id: 'only-green',
			category: 'dance',
			title: '只此青绿',
			subtitle: 'Stage Dance',
			desc: '以《千里江山图》为灵感，以舞蹈写暮春青绿，演绎节气山河的东方美学巅峰。',
			poster: '../images/culture/zhici.png',
			link: 'https://baike.baidu.com/item/%E5%8F%AA%E6%AD%A4%E9%9D%92%E7%BB%BF/58345088'
		},
		{
			id: 'song-book',
			category: 'book',
			title: '二十四节气百科全书',
			subtitle: '宋英杰 · 著',
			desc: '气象学专家宋英杰系统解读二十四节气，融科学、历史、民俗、诗词于一体。',
			poster: '../images/culture/baike.png',
			link: 'https://baike.baidu.com/item/%E4%BA%8C%E5%8D%81%E5%9B%9B%E8%8A%82%E6%B0%94%E7%99%BE%E7%A7%91%E5%85%A8%E4%B9%A6/66188578'
		}
	]
};