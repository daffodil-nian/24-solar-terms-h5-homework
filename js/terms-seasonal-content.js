/**
 * 各节气 · 诗词、三候、典籍引语（首页时令区动态渲染）
 */
var termSeasonalExtras = {
  '立春': {
    poetry: { verse: '律回岁晚冰霜少，春到人间草木知。', author: '宋 · 张栻《立春偶成》', meaning: '节气轮回，冰霜渐少；春天来到人间，草木最先感知。万物始生，阳气初升。' },
    phenology: [
      { order: '一候', icon: '风', title: '东风解冻', text: '东风送暖，大地开始解冻，冰雪消融。' },
      { order: '二候', icon: '虫', title: '蜇虫始振', text: '蛰伏于土中的虫类，渐渐苏醒蠕动。' },
      { order: '三候', icon: '鱼', title: '鱼陟负冰', text: '鱼儿感阳而上，冰面未融，似负冰而行。' }
    ],
    saying: { text: '立春一日，百草回芽。', source: '民间谚语' }
  },
  '雨水': {
    poetry: { verse: '天街小雨润如酥，草色遥看近却无。', author: '唐 · 韩愈《早春呈水部张十八员外》', meaning: '细雨滋润如酥油，远望草色青青，近看却若有若无，春意悄然。' },
    phenology: [
      { order: '一候', icon: '獭', title: '獭祭鱼', text: '水獭捕鱼，先祭后食，示感春气。' },
      { order: '二候', icon: '雁', title: '鸿雁来', text: '北方鸿雁开始从南方飞回，传递春讯。' },
      { order: '三候', icon: '芽', title: '草木萌动', text: '草木随地中阳气升发而萌动抽芽。' }
    ],
    saying: { text: '雨水有雨，五谷有余。', source: '民间谚语' }
  },
  '惊蛰': {
    poetry: { verse: '微雨众卉新，一雷惊蛰始。', author: '唐 · 韦应物《观田家》', meaning: '细雨过后百花焕然一新，一声春雷，蛰伏的万物被惊醒，农事将起。' },
    phenology: [
      { order: '一候', icon: '桃', title: '桃始华', text: '桃花初绽，粉红点染山野。' },
      { order: '二候', icon: '鸟', title: '仓庚鸣', text: '黄鹂鸟开始鸣叫，声清耳悦。' },
      { order: '三候', icon: '鹰', title: '鹰化为鸠', text: '猛禽感春气而性变温顺，鸠鸟始鸣。' }
    ],
    saying: { text: '惊蛰节到闻雷声，震醒蛰伏越冬虫。', source: '民间谚语' }
  },
  '春分': {
    poetry: { verse: '仲春初四日，春色正中分。', author: '宋 · 徐铉《春分日》', meaning: '仲春时节，昼夜平分，春色正浓，天地阴阳各半，万物均衡生长。' },
    phenology: [
      { order: '一候', icon: '燕', title: '玄鸟至', text: '燕子从南方归来，衔泥筑巢。' },
      { order: '二候', icon: '雷', title: '雷乃发声', text: '阳气升发，阴寒未尽，阴阳相薄，雷声始闻。' },
      { order: '三候', icon: '电', title: '始电', text: '闪电与雷声相伴，春雨渐丰。' }
    ],
    saying: { text: '春分雨脚落声微，柳岸斜风带客归。', source: '宋 · 徐铉' }
  },
  '清明': {
    poetry: { verse: '清明时节雨纷纷，路上行人欲断魂。', author: '唐 · 杜牧《清明》', meaning: '清明多雨，烟雨迷蒙；行人踏青或祭扫，心绪与春色交织。' },
    phenology: [
      { order: '一候', icon: '桐', title: '桐始华', text: '梧桐花开，紫白相间，春意烂漫。' },
      { order: '二候', icon: '鼠', title: '田鼠化为鴽', text: '田鼠随阳气潜藏，鴽鸟出而鸣。' },
      { order: '三候', icon: '虹', title: '虹始见', text: '雨后天晴，彩虹初现于天际。' }
    ],
    saying: { text: '清明前后，种瓜点豆。', source: '民间谚语' }
  },
  '谷雨': {
    poetry: { verse: '谷雨如丝复似尘，煮瓶浮蜡正尝新。', author: '宋 · 范成大《尝新茶》', meaning: '谷雨细雨如丝，新茶初采，正是品茶尝新的好时节。' },
    phenology: [
      { order: '一候', icon: '萍', title: '萍始生', text: '浮萍在水面开始生长，绿意点点。' },
      { order: '二候', icon: '鸠', title: '鸣鸠拂其羽', text: '布谷鸟振羽而鸣，催促农事。' },
      { order: '三候', icon: '桑', title: '戴胜降于桑', text: '戴胜鸟落于桑树，蚕事将兴。' }
    ],
    saying: { text: '谷雨前后，种瓜点豆。', source: '民间谚语' }
  },
  '立夏': {
    poetry: { verse: '绿树阴浓夏日长，楼台倒影入池塘。', author: '唐 · 高骈《山亭夏日》', meaning: '树阴浓密，夏日漫长，楼台倒影映入池塘，炎夏初临。' },
    phenology: [
      { order: '一候', icon: '蝼', title: '蝼蝈鸣', text: '蝼蝈开始在田间鸣叫，宣告夏日到来。' },
      { order: '二候', icon: '蚓', title: '蚯蚓出', text: '蚯蚓掘土而出，地面湿气渐盛。' },
      { order: '三候', icon: '瓜', title: '王瓜生', text: '王瓜藤蔓快速攀长，瓜果将熟。' }
    ],
    saying: { text: '立夏之日，蝼蝈鸣。', source: '《月令七十二候集解》' }
  },
  '小满': {
    poetry: { verse: '夜莺啼绿柳，皓月醒长空。', author: '宋 · 欧阳修《小满》', meaning: '夜莺啼于绿柳，皓月照亮长空，麦粒渐满，夏意渐浓。' },
    phenology: [
      { order: '一候', icon: '菜', title: '苦菜秀', text: '苦菜枝叶繁茂，可采而食。' },
      { order: '二候', icon: '草', title: '靡草死', text: '喜阴的细草在阳气盛极时枯萎。' },
      { order: '三候', icon: '麦', title: '麦秋至', text: '麦子将熟，虽在夏季，农人称「麦秋」。' }
    ],
    saying: { text: '小满不满，芒种不管。', source: '民间谚语' }
  },
  '芒种': {
    poetry: { verse: '时雨及芒种，四野皆插秧。', author: '宋 · 陆游《时雨》', meaning: '雨水充沛，正值芒种，四野农人抢插秧苗，农忙时节由此而盛。' },
    phenology: [
      { order: '一候', icon: '螳', title: '螳螂生', text: '螳螂于草木间破壳而生，感阳而动。' },
      { order: '二候', icon: '鵙', title: '鵙始鸣', text: '伯劳鸟始鸣，声厉而清，夏禽活跃。' },
      { order: '三候', icon: '舌', title: '反舌无声', text: '反舌鸟止声，阴气微生而感之。' }
    ],
    saying: { text: '芒种忙忙割，农家乐启镰。', source: '民间谚语' }
  },
  '夏至': {
    poetry: { verse: '绿筠尚含粉，圆荷始散芳。', author: '唐 · 韦应物《夏至避暑北池》', meaning: '竹色尚青翠含粉，荷花初开吐芬芳。昼长至极，万物繁盛——此乃一年中阳气最盛的时节。' },
    phenology: [
      { order: '一候', icon: '鹿', title: '鹿角解', text: '鹿属阳兽，角朝前生。夏至一阴生，感阴气而鹿角脱落。' },
      { order: '二候', icon: '蝉', title: '蜩始鸣', text: '蝉，夏之使者。雄蝉于夏至后鼓翼而鸣，宣告盛夏来临。' },
      { order: '三候', icon: '草', title: '半夏生', text: '半夏，药草也。居夏之半而生，此时沼泽水边常见其翠影。' }
    ],
    saying: { text: '日北至，日长之至，日影短至，故曰夏至。', source: '《恪遵宪度抄本》' }
  },
  '小暑': {
    poetry: { verse: '倏忽温风至，因循小暑来。', author: '唐 · 元稹《小暑六月节》', meaning: '温风忽至，小暑随之而来，暑气渐盛而未至极。' },
    phenology: [
      { order: '一候', icon: '风', title: '温风至', text: '风中带着温热，不再清凉。' },
      { order: '二候', icon: '蟋', title: '蟋蟀居宇', text: '蟋蟀感暑而迁于庭下墙角。' },
      { order: '三候', icon: '鹰', title: '鹰始鸷', text: '老鹰因暑而猛，搏击长空。' }
    ],
    saying: { text: '小暑大暑，上蒸下煮。', source: '民间谚语' }
  },
  '大暑': {
    poetry: { verse: '赤日几时过，清风无处寻。', author: '宋 · 曾几《大热》', meaning: '烈日何时才能过去？连一丝清风都难寻觅，大暑酷热，一年中最暑之时。' },
    phenology: [
      { order: '一候', icon: '萤', title: '腐草为萤', text: '腐草化萤，夜色中萤光点点。' },
      { order: '二候', icon: '土', title: '土润溽暑', text: '土地潮湿，暑气蒸腾，闷热难耐。' },
      { order: '三候', icon: '雨', title: '大雨时行', text: '雷雨频繁，大雨滂沱而至。' }
    ],
    saying: { text: '大暑不暑，五谷不鼓。', source: '民间谚语' }
  },
  '立秋': {
    poetry: { verse: '睡起秋声无觅处，满阶梧桐月明中。', author: '宋 · 刘翰《立秋》', meaning: '醒来只觉秋声无处寻觅，唯有月光下满阶梧桐，秋意悄然而至。' },
    phenology: [
      { order: '一候', icon: '风', title: '凉风至', text: '西风渐起，带来丝丝凉意。' },
      { order: '二候', icon: '露', title: '白露降', text: '清晨露水渐白，秋气凝结。' },
      { order: '三候', icon: '蝉', title: '寒蝉鸣', text: '寒蝉感阴而鸣，声切而悲。' }
    ],
    saying: { text: '立秋之日凉风至。', source: '《月令七十二候集解》' }
  },
  '处暑': {
    poetry: { verse: '处暑无三日，新凉直万金。', author: '宋 · 苏泂《长江二首》', meaning: '处暑过后，新凉难得，千金难换。暑气将止，秋爽初临。' },
    phenology: [
      { order: '一候', icon: '鹰', title: '鹰乃祭鸟', text: '老鹰捕食后陈列如祭，示秋气肃杀。' },
      { order: '二候', icon: '肃', title: '天地始肃', text: '天地之气开始收敛，万物萧肃。' },
      { order: '三候', icon: '禾', title: '禾乃登', text: '五谷成熟，进入收获时节。' }
    ],
    saying: { text: '处暑满地黄，家家备新粮。', source: '民间谚语' }
  },
  '白露': {
    poetry: { verse: '蒹葭苍苍，白露为霜。', author: '《诗经 · 秦风 · 蒹葭》', meaning: '芦苇苍苍，白露凝结如霜。秋意渐深，思念与清寒同在。' },
    phenology: [
      { order: '一候', icon: '雁', title: '鸿雁来', text: '大雁自北方飞来，候雁南飞。' },
      { order: '二候', icon: '燕', title: '玄鸟归', text: '燕子南归，辞别北方。' },
      { order: '三候', icon: '鸟', title: '群鸟养羞', text: '百鸟贮食以备冬，羞即储备。' }
    ],
    saying: { text: '白露秋分夜，一夜冷一夜。', source: '民间谚语' }
  },
  '秋分': {
    poetry: { verse: '金气秋分，风清露冷秋期半。', author: '宋 · 谢逸《点绛唇》', meaning: '秋分金气肃清，风凉露冷，秋色已过半，昼夜再度平分。' },
    phenology: [
      { order: '一候', icon: '雷', title: '雷始收声', text: '阳气渐衰，雷声渐息。' },
      { order: '二候', icon: '虫', title: '蛰虫坯户', text: '虫类培土封门，准备冬眠。' },
      { order: '三候', icon: '水', title: '水始涸', text: '水气凝滞，江河渐涸。' }
    ],
    saying: { text: '秋分秋分，昼夜平分。', source: '民间谚语' }
  },
  '寒露': {
    poetry: { verse: '袅袅凉风动，凄凄寒露零。', author: '唐 · 李端《杂曲歌辞 · 秋夜吟》', meaning: '凉风袅袅，寒露零落，秋深露重，寒意渐生。' },
    phenology: [
      { order: '一候', icon: '雁', title: '鸿雁来宾', text: '鸿雁南飞，陆续抵达南方。' },
      { order: '二候', icon: '雀', title: '雀入大水为蛤', text: '雀鸟感阴入水，蛤类渐丰。' },
      { order: '三候', icon: '菊', title: '菊有黄华', text: '菊花盛开，黄华满枝。' }
    ],
    saying: { text: '寒露过三朝，过水要寻桥。', source: '民间谚语' }
  },
  '霜降': {
    poetry: { verse: '霜降碧天静，秋事促西风。', author: '宋 · 叶梦得《南歌子》', meaning: '霜降时节碧空澄静，秋风催促秋收冬藏之事。' },
    phenology: [
      { order: '一候', icon: '豺', title: '豺乃祭兽', text: '豺狼捕兽陈列而食，如祭先兽。' },
      { order: '二候', icon: '叶', title: '草木黄落', text: '草木枯黄凋零，秋色尽染。' },
      { order: '三候', icon: '蛰', title: '蛰虫咸俯', text: '蛰虫俯首入土，静待寒冬。' }
    ],
    saying: { text: '霜降杀百草，出霜迟，出太阳迟。', source: '民间谚语' }
  },
  '立冬': {
    poetry: { verse: '秋风吹尽旧庭柯，黄叶丹枫客里过。', author: '明 · 仇兰《立冬》', meaning: '秋风扫尽庭中旧叶，客居他乡，黄叶丹枫中迎来冬之始。' },
    phenology: [
      { order: '一候', icon: '水', title: '水始冰', text: '水面开始结冰，寒意渐凝。' },
      { order: '二候', icon: '地', title: '地始冻', text: '土地开始冻结，寒气彻地。' },
      { order: '三候', icon: '雉', title: '雉入大水为蜃', text: '雉鸟感阴，蜃蛤渐盛。' }
    ],
    saying: { text: '立冬之日，水始冰。', source: '《月令七十二候集解》' }
  },
  '小雪': {
    poetry: { verse: '花雪随风不厌看，更多还肯失林峦。', author: '宋 · 杨万里《小雪日戏题绝句》', meaning: '雪花随风飘舞，不厌细看；更多雪花飘入林间，山峦顿失。' },
    phenology: [
      { order: '一候', icon: '虹', title: '虹藏不见', text: '彩虹不再出现，阴气盛极。' },
      { order: '二候', icon: '气', title: '天气上升地气下降', text: '阳气上升、阴气下沉，天地不通。' },
      { order: '三候', icon: '冬', title: '闭塞而成冬', text: '天地闭塞，寒冬正式成形。' }
    ],
    saying: { text: '小雪雪满天，来年必丰年。', source: '民间谚语' }
  },
  '大雪': {
    poetry: { verse: '燕山雪花大如席，片片吹落轩辕台。', author: '唐 · 李白《北风行》', meaning: '燕山雪花大如席，片片吹落轩辕台。大雪纷飞，天地一白。' },
    phenology: [
      { order: '一候', icon: '鹖', title: '鹖鴠不鸣', text: '寒号鸟因感阴而不再鸣叫。' },
      { order: '二候', icon: '虎', title: '虎始交', text: '老虎感阳气而交配，阴气中微阳生。' },
      { order: '三候', icon: '荔', title: '荔挺出', text: '荔挺草感阳萌动，破土而出。' }
    ],
    saying: { text: '大雪纷纷落，明年吃馍馍。', source: '民间谚语' }
  },
  '冬至': {
    poetry: { verse: '冬至一阳生，天时转日长。', author: '民间谚谚化用', meaning: '冬至阴气极，一阳初生，日长自此而始，否极泰来。' },
    phenology: [
      { order: '一候', icon: '蚓', title: '蚯蚓结', text: '蚯蚓蜷曲如结，阳气未动。' },
      { order: '二候', icon: '麋', title: '麋角解', text: '麋角感阴而解，与夏至鹿相反。' },
      { order: '三候', icon: '泉', title: '水泉动', text: '山中泉水因微阳而始温流动。' }
    ],
    saying: { text: '冬至大如年，人间小团圆。', source: '民间谚语' }
  },
  '小寒': {
    poetry: { verse: '小寒连大吕，欢鹊垒新巢。', author: '元 · 张耒《小寒》', meaning: '小寒时节，喜鹊感阳而垒巢，严寒中已有生机萌动。' },
    phenology: [
      { order: '一候', icon: '雁', title: '雁北乡', text: '大雁开始向北迁徙，感阳而动。' },
      { order: '二候', icon: '鹊', title: '鹊始巢', text: '喜鹊开始筑巢，准备繁衍。' },
      { order: '三候', icon: '雉', title: '雉始雊', text: '雉鸡鸣叫，感阳而鸣。' }
    ],
    saying: { text: '小寒大寒，冷成冰团。', source: '民间谚语' }
  },
  '大寒': {
    poetry: { verse: '大寒雪未消，厥月雨如膏。', author: '宋 · 邵雍《大寒》', meaning: '大寒时节积雪未消，却时有甘霖如膏，严寒中孕育春信。' },
    phenology: [
      { order: '一候', icon: '鸡', title: '鸡始乳', text: '母鸡感阳而孵卵，禽类始乳。' },
      { order: '二候', icon: '鸟', title: '征鸟厉疾', text: '鹰隼捕食迅猛，备越寒冬。' },
      { order: '三候', icon: '泽', title: '水泽腹坚', text: '水域中央仍坚冻，寒气彻骨。' }
    ],
    saying: { text: '大寒过后，立春不远。', source: '民间谚语' }
  }
};
