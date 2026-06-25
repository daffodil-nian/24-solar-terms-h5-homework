/**
 * 节气专题页 · 诗词与美食内容
 */
var termPagesData = {
	lichun: {
		name: '立春',
		date: '2月3—5日',
		season: 'spring',
		fx: 'plum',
		poetryTheme: 'white-pink',
		heroTitle: '立春 · 寒梅报春',
		heroDesc: '阳气初生，残雪未消。踏雪寻梅，见枝头第一缕红——咬春纳福，万象更新。',
		poetry: {
			label: '诗词书画',
			title: '梅信初传 · 踏雪寻梅',
			quote: '律回岁晚冰霜少，春到人间草木知。',
			cite: '张栻《立春偶成》',
			prose: '立春为二十四节气之首，意味着冬去春来、阳和启蛰。古人于此日「踏雪寻梅」，在残雪与初阳之间寻得第一枝早梅，寓意寒尽春来、希望初绽。梅花于寒尽处先发，是立春最具代表性的风物；「咬春」食俗则以春饼、菜薹迎接新春，一口咬住整个早春的鲜与福。',
			artNote: '宋人画院常绘「早梅」「寒林」，以疏枝横斜写立春物候；文人亦以梅自况，表达凌寒独放的品格。'
		},
		food: {
			label: '民俗美食',
			title: '咬春 · 春饼与菜薹',
			intro: '「咬春」是立春最重要的饮食民俗——以春饼卷合时令菜蔬，一口咬住整个春天。',
			items: [{
					title: '春饼卷菜',
					desc: '薄如蝉翼的烫面饼，卷豆芽、韭菜、萝卜丝与菜薹，寓意「咬春纳福、五谷丰登」。',
					recipe: '烫面擀薄饼，上锅烙至微黄；时令菜蔬切丝快炒，以饼卷食。'
				},
				{
					title: '清炒菜薹',
					desc: '武汉、湖南等地立春必吃菜薹（红菜薹/白菜薹），茎叶紫绿相间，清炒即鲜。',
					recipe: '菜薹择段，蒜片爆香，大火快炒，少盐即出。'
				}
			],
			folk: '民间有「立春一日，百草回芽」之说。北方吃春饼，南方食菜薹、嚼萝卜，皆为「咬春」，祈求一年康健、农事顺遂。',
			poem: {
				verse: '春日春盘细生菜，忽忆两京梅发时。',
				author: '唐 · 杜甫《立春》'
			},
			images: [{
					src: 'caitai.jpeg',
					alt: '菜薹',
					role: '配图作用：菜薹是江汉一带立春「咬春」的核心时令蔬菜，象征早春地气回升、万物可食。'
				},
				{
					src: 'chunbing.jpg',
					alt: '春饼',
					role: '配图作用：春饼是「咬春」民俗的载体，一张薄饼卷尽早春菜蔬，承载纳福迎春的寓意。'
				}
			]
		},
		videos: [{
				title: '立春 · 春晚《立春》',
				desc: '2026 年央视春晚歌曲《立春》，以二十四节气之首为题，十位女演唱者同台献唱，描绘「屋檐雨落、种子发芽」的春日景象，歌颂万象更新。',
				src: 'lichun-1.mp4'
			},
			{
				title: '立春 · 梅信早开',
				desc: '梅花初绽、菜薹吐绿，呈现早春田野物候变化。',
				src: 'lichun-2.mp4'
			}
		],
		audio: {
			title: '立春 · 东风解冻',
			subtitle: '立春',
			desc: '春「万物起始」之意。',
			src: 'lichun.mp3'
		}
	},
	yushui: {
		name: '雨水',
		date: '2月18—20日',
		season: 'spring',
		fx: 'rain',
		poetryTheme: 'mist-teal',
		heroTitle: '雨水 · 润物无声',
		heroDesc: '春雨如酥，烟雨江南。兰生幽谷，荠菜出土——上巳采兰、东坡荠菜羹，好雨知时节，润物细无声。',
		poetry: {
			label: '诗词书画',
			title: '幽兰 · 润物 · 三候',
			quote: '芝兰生于幽谷，不以无人而不芳。',
			cite: '《孔子家语》',
			prose: '雨水时节，春兰吐芳，野生荠菜出土。古人有上巳采兰之俗，以兰香草洁自况；苏轼咏荠菜，「食荠如与故人游」，一碗荠菜羹便是春日人间至味。现存最古老的古琴谱《碣石调·幽兰》，歌颂兰花高洁；雨水代表花木为春兰，与「雨中赏兰、幽谷自芳」的节气人文一脉相承。',
			artNote: '水墨常写「烟雨江南」：远山淡墨、近水空濛。工笔雨中春兰，花瓣带露、叶脉含润，与《春夜喜雨》之「润物细无声」相映成趣。',
			poemDu: {
				text: '好雨知时节，当春乃发生。随风潜入夜，润物细无声。',
				cite: '杜甫《春夜喜雨》'
			},
			sanhou: '雨水三候：一候獭祭鱼，二候鸿雁来，三候草木萌动。',
			illustration: {
				src: '../flowers/chunlan.png',
				alt: '工笔雨中幽兰',
				caption: '配图：工笔雨中春兰——花瓣带露，呼应雨水节气「润物」与春兰花信。'
			}
		},
		food: {
			label: '民俗美食',
			title: '荠菜 · 春日野趣',
			intro: '雨水前后，荠菜最嫩。北方有「挖荠菜、包馄饨」的春日民俗；江南则有东坡荠菜羹，一口野味便是人间烟火。',
			items: [{
					title: '荠菜馄饨',
					desc: '荠菜与猪肉为馅，皮薄馅嫩，是南北雨水前后最常见的家常味。',
					recipe: '荠菜焯水挤干切碎，与肉馅、姜末调馅；包馄饨，清水煮浮起，撒葱花。'
				},
				{
					title: '东坡荠菜羹',
					desc: '苏轼「食荠如与故人游」——荠菜羹清鲜，最能体现雨水时节的润与鲜。',
					recipe: '荠菜洗净，配豆腐丝、笋丝，清汤勾芡，滴香油。'
				}
			],
			folk: '田间挖荠菜、归家包馄饨，是上巳前后南北春日经典场景。把雨水节气的湿润与鲜灵一并包进馅里，还原古人采食习俗。',
			poem: {
				verse: '惭问食荠菜，洗釜待垂垂。',
				author: '宋 · 苏轼（咏荠菜）'
			},
			images: [{
					src: 'orchid-rain.svg',
					alt: '雨中幽兰',
					role: '配图作用：春兰为雨水代表花，呼应「幽谷自芳、雨中赏兰」的节气人文意象。'
				},
				{
					src: 'jicai.svg',
					alt: '野生荠菜',
					role: '配图作用：荠菜是南北春日经典野菜，搭配挖荠菜、包馄饨/东坡羹，还原民间采食习俗。'
				}
			]
		},
		videos: [{
				title: '雨水 · 烟雨江南',
				desc: '细雨斜落、远山薄雾，呈现雨水节气的湿润空濛意境。',
				src: 'yushui-1.mp4'
			},
			{
				title: '雨水 · 挖荠包馄饨',
				desc: '农户挖荠菜、包馄饨，还原春日饮食民俗与人间烟火。',
				src: 'yushui-2.mp4'
			}
		],
		audio: {
			title: '雨水 · 幽兰古意',
			subtitle: '《碣石调·幽兰》意境',
			desc: '借古琴曲之清远，呼应雨水「润物无声」与兰花生幽谷之品格。',
			src: 'yushui.mp3'
		}
	},
	jingzhe: {
		name: '惊蛰',
		date: '3月5—7日',
		season: 'spring',
		fx: 'thunder',
		poetryTheme: 'peach-yellow',
		heroTitle: '惊蛰 · 春雷乍动',
		heroDesc: '春雷乍动，气温回暖，阳气渐升。蛰虫苏醒，杏花初绽，春笋破土，人间清欢。',
		poetry: {
			label: '诗词书画',
			title: '杏花 · 春雷',
			quote: '花红，杏花粉，李花白，菜花黄，海棠酡颜。',
			cite: '节气民谚',
			prose: '山中春笋破土，人间有味是清欢。小园几许，收尽春光，正一片莺儿啼，燕儿舞，蝶儿忙。惊蛰时节，春雷惊醒蛰伏的虫豸，杏花、李花次第开放，天地由静转动，正是「雷发冬藏」之时。',
			artNote: '宋人小品常写「惊蛰花信」：杏花疏枝、蜂蝶往来；与「春雷」相映，画面明媚而充满生机。'
		},
		food: {
			label: '民俗美食',
			title: '春笋 · 尝春',
			intro: '「惊蛰吃梨」驱邪，江南则爱食春笋——雷后破土，至嫩至鲜，是惊蛰餐桌上的春之信使。',
			items: [{
					title: '油焖春笋',
					desc: '惊蛰前后春笋肥嫩，油焖后笋香浓郁，是江南人家迎接春雷的第一口鲜。',
					recipe: '春笋切滚刀，焯水；酱油、糖、少水焖至入味，收汁亮油。'
				},
				{
					title: '春笋腌笃鲜',
					desc: '春笋与咸肉、百叶结同炖，汤白味鲜，最能体现「人间有味是清欢」。',
					recipe: '咸肉切块，与春笋、百叶结砂锅慢炖，出汤即可。'
				}
			],
			folk: '民间认为惊蛰吃梨可润燥防咳、远离害虫；而食春笋则寓意「紧跟春气、尝鲜纳福」，与农事启蛰相呼应。',
			poem: {
				verse: '夜雨剪春韭，新炊间黄粱。',
				author: '唐 · 杜甫《赠卫八处士》'
			},
			images: [{
					src: '../food/jingzhe.jpg',
					alt: '春笋',
					role: '配图作用：春笋惊蛰后破土，是节气物候与餐桌之间的直接联结。'
				},
				{
					src: '../flowers/xinhua.jpg',
					alt: '杏花',
					role: '配图作用：杏花粉是惊蛰花信风物，点明「春雷初至、繁花渐开」的节令氛围。'
				}
			]
		},
		videos: [{
				title: '惊蛰 · 春雷万物醒',
				desc: '春雷乍动、蛰虫苏醒，记录惊蛰前后的自然瞬间。',
				src: 'jingzhe-1.mp4'
			},
			{
				title: '惊蛰 · 春笋破土',
				desc: '杏花初绽、春笋出土，呈现「人间有味是清欢」的春气。',
				src: 'jingzhe-2.mp4'
			}
		],
		audio: {
			title: '惊蛰 · 春雷初至',
			subtitle: '自然采样与轻音乐',
			desc: '远雷隐隐、风过花枝，呈现蛰虫苏醒、天地由静转动的节令氛围。',
			src: 'jingzhe.mp3'
		}
	},
	chunfen: {
		name: '春分',
		date: '3月20—22日',
		season: 'spring',
		fx: 'spring-breeze',
		poetryTheme: 'purple-white',
		heroTitle: '春分 · 昼夜平分',
		heroDesc: '莺飞草长，辛夷初绽，香椿吐芽。春风和煦，燕子归来，出门俱是看花人。',
		poetry: {
			label: '诗词书画',
			title: '辛夷 · 元鸟至',
			quote: '春分时节，莺飞草长，辛夷如火，海棠依旧，暖日暄暄，出门俱是看花人。',
			cite: '节令记游',
			prose: '春分有三候：一候元鸟至，二候雷乃发声，三候始电。昼夜等长，光影均匀柔和，正是仲春生机舒展之时。辛夷（玉兰）初绽，香椿嫩芽可食，飞燕穿柳，风物与诗画相映。',
			artNote: '水墨春日原野，工笔辛夷带露、香椿新芽，线条舒展，取「和煦悠然、平分春色」之意。',
			sanhou: '春分三候：一候玄鸟至，二候雷乃发声，三候始电。'
		},
		food: {
			label: '民俗美食',
			title: '香椿 · 食春',
			intro: '「春分吃春菜」——香椿、玉兰花是春分核心风物与时蔬，采摘、烹饪画面充满生活烟火气。',
			items: [{
					title: '香椿炒蛋',
					desc: '香椿芽与鸡蛋同炒，是春分前后最经典的「食春」家常菜。',
					recipe: '香椿焯水切碎，与蛋液搅匀，热油快炒至凝固。'
				},
				{
					title: '炸玉兰花',
					desc: '玉兰花瓣裹面轻炸，香酥微甜，是春分前后的风雅小食。',
					recipe: '花瓣洗净沥干，薄面糊裹匀，温油炸至金黄。'
				},
				{
					title: '凉拌香椿',
					desc: '香椿焯水后凉拌，保留春气与清香，配粥配酒皆宜。',
					recipe: '香椿烫熟切细，以盐、香油、少许醋拌匀。'
				}
			],
			folk: '民间有「春分吃春菜、送春牛图」等习俗。采香椿、炸玉兰，把仲春的花与芽一并端上餐桌，寓意平分春色、家宅安宁。',
			poem: {
				verse: '雨霁风清日，春分花发时。',
				author: '唐 · 白居易《春分》'
			},
			images: [{
					src: '../flowers/yulan.jpg',
					alt: '玉兰花',
					role: '配图作用：辛夷（玉兰）是春分核心风物，呼应「昼夜平分、花开正好」的节令。'
				},
				{
					src: '../food/chunfen.jpg',
					alt: '香椿',
					role: '配图作用：香椿为春分时令野蔬，采摘与烹饪还原春日采食民俗。'
				}
			]
		},
		videos: [{
				title: '春分 · 元鸟至',
				desc: '燕子归来、辛夷花开，呈现春分「昼夜平分」的明媚。',
				src: 'chunfen-1.mp4'
			},
			{
				title: '春分 · 食春香椿',
				desc: '采摘香椿、炸玉兰花，记录春分食春与民间采食习俗。',
				src: 'chunfen-2.mp4'
			}
		],
		audio: {
			title: '春分 · 莺啼燕舞',
			subtitle: '笛与筝合奏',
			desc: '明快旋律配合元鸟南归、昼夜平分之景，呈现仲春平衡之美。',
			src: 'chunfen.mp3'
		}
	}
};

/* 其余节气通用占位内容 */
(function() {
	var genericPoetry = {
		quote: '天地有大美而不言，四时有明法而不议。',
		cite: '《庄子》',
		prose: '此节气承前启后，物候更迭，诗书画中常以其为题，写天地运行、人间时令。',
		artNote: '历代画家按节序写花鸟山水，以笔墨记录时光流转。'
	};
	var genericFood = {
		intro: '因时制宜，不时不食。本节气各地有相应的时令饮食与民俗。',
		items: [{
			title: '时令食俗',
			desc: '应季而食，顺时而养，是中国人与土地相处的智慧。',
			recipe: '依当地风物，择鲜而烹。'
		}],
		folk: '节令饮食与农事、礼俗紧密相连，代代相传。'
	};

	solarTerms.forEach(function(t) {
		var slug = termSlugs[t.name];
		if (termPagesData[slug]) return;
		var fd = (typeof termFoodData !== 'undefined') ? termFoodData[t.name] : null;
		var foodItems = genericFood.items;
		if (fd && fd.dishes && fd.dishes.length) {
			foodItems = fd.dishes.map(function(dish) {
				return {
					title: dish,
					desc: '应季而食，顺时而养，是中国人与土地相处的智慧。',
					recipe: '依当地风物，择鲜而烹。'
				};
			});
		}
		termPagesData[slug] = {
			name: t.name,
			date: t.date,
			season: t.season,
			fx: (typeof termThemes !== 'undefined' && termThemes[slug]) ? termThemes[slug].fx : (t
				.season === 'spring' ? 'plum' : t.season === 'summer' ? 'foliage' : t.season ===
				'autumn' ? 'autumn-leaf' : 'snow-light'),
			poetryTheme: 'mist-teal',
			heroTitle: t.name + ' · ' + t.desc,
			heroDesc: t.detail,
			poetry: {
				label: '诗词书画',
				title: t.name + ' · 节令诗意',
				quote: genericPoetry.quote,
				cite: genericPoetry.cite,
				prose: t.detail + ' ' + genericPoetry.prose,
				artNote: genericPoetry.artNote
			},
			food: {
				label: '民俗美食',
				title: fd ? fd.title : (t.name + ' · 时令食俗'),
				intro: fd ? fd.summary : genericFood.intro,
				items: foodItems,
				folk: fd ? fd.folk : genericFood.folk,
				poem: fd ? fd.poem : null,
				images: []
			},
			videos: [{
					title: t.name + ' · 节气影像（一）',
					desc: '感受' + t.name + '时节的自然变化与人文风物。',
					src: slug + '-1.mp4'
				},
				{
					title: t.name + ' · 节气影像（二）',
					desc: '记录' + t.name + '相关的民俗、物候与生活场景。',
					src: slug + '-2.mp4'
				}
			],
			audio: {
				title: t.name + ' · 节令音频',
				subtitle: '节气主题音乐 / 自然声景',
				desc: '聆听' + t.name + '时节的声音记忆，感受节令流转。',
				src: slug + '.mp3'
			}
		};
	});
})();