/**
 * 节气知识挑战 · 题库
 * category: geography | customs | poetry | health | calendar
 */
var challengeQuestions = [
  /* ---- 地理气候 ---- */
  { id: 'g01', category: 'geography', question: '二十四节气主要反映的是我国哪个地区的太阳周年运动规律？', options: ['黄河流域', '珠江流域', '青藏高原', '东北平原'], answer: 0, explanation: '二十四节气起源于黄河流域，反映该地区太阳周年运动与物候变化，后被全国沿用。' },
  { id: 'g02', category: 'geography', question: '春分这一天，我国大部分地区昼夜长短的情况是？', options: ['昼长夜短', '昼短夜长', '昼夜等长', '白昼最长'], answer: 2, explanation: '春分时太阳直射赤道，全球昼夜等长，之后昼渐长夜渐短。' },
  { id: 'g03', category: 'geography', question: '夏至日，北半球白昼长度达到？', options: ['全年最短', '全年最长', '与冬至相同', '与春分相同'], answer: 1, explanation: '夏至是北半球白昼最长的一天，过后昼渐短夜渐长。' },
  { id: 'g04', category: 'geography', question: '华南地区与东北地区相比，节气物候通常？', options: ['完全一致', '偏晚约一个月', '偏早约一至两周', '没有季节变化'], answer: 2, explanation: '纬度与海陆差异导致同节气下南北物候不同，华南普遍偏暖、偏早。' },
  { id: 'g05', category: 'geography', question: '「雨生百谷」描述的是哪个节气的降水特点？', options: ['雨水', '谷雨', '小满', '芒种'], answer: 1, explanation: '谷雨是春季最后一个节气，降水明显增多，利于谷物生长。' },
  { id: 'g06', category: 'geography', question: '冬至日太阳直射哪条纬线？', options: ['赤道', '北回归线', '南回归线', '北极圈'], answer: 2, explanation: '冬至时太阳直射南回归线，北半球获得太阳辐射最少。' },
  { id: 'g07', category: 'geography', question: '西北地区节气变化的主要特点是？', options: ['几乎无冬', '昼夜温差大、季节转换剧烈', '全年高温多雨', '只有干湿两季'], answer: 1, explanation: '西北内陆大陆性强，节气过渡时温差大、冷暖变化明显。' },
  { id: 'g08', category: 'geography', question: '「梅雨」一般与哪个节气前后关系最为密切？', options: ['立春', '夏至', '芒种', '白露'], answer: 2, explanation: '长江中下游梅雨期多出现在芒种前后，又称「芒种水」。' },
  { id: 'g09', category: 'geography', question: '二十四节气中，太阳直射点向北移动的起始节气一般认为是？', options: ['立春', '春分', '清明', '冬至'], answer: 0, explanation: '冬至后直射点北返，立春标志着阳气初生、春季序列开始。' },
  { id: 'g10', category: 'geography', question: '华东地区「雨热同期」最显著的季节是？', options: ['春季', '夏季', '秋季', '冬季'], answer: 1, explanation: '夏季东南季风带来充沛降水与高温，小暑、大暑前后最为典型。' },

  /* ---- 民俗美食 ---- */
  { id: 'c01', category: 'customs', question: '北方立春最重要的饮食习俗是？', options: ['吃饺子', '咬春吃春饼', '吃汤圆', '喝腊八粥'], answer: 1, explanation: '「咬春」是立春食俗，以春饼卷时蔬，寓意迎接新春。' },
  { id: 'c02', category: 'customs', question: '「冬至饺子夏至面」中的「面」通常在哪个节气食用？', options: ['立夏', '夏至', '小暑', '立秋'], answer: 1, explanation: '夏至新麦登场，北方有吃面的习俗，庆祝丰收。' },
  { id: 'c03', category: 'customs', question: '雨水前后，南北民间常采食的一种野菜是？', options: ['荠菜', '香椿', '蕨菜', '枸杞叶'], answer: 0, explanation: '雨水时节荠菜最嫩，北方常包馄饨，江南做羹汤。' },
  { id: 'c04', category: 'customs', question: '「惊蛰」后春笋破土，江南常见做法是？', options: ['油焖春笋', '冰糖雪梨', '腊八粥', '清明粿'], answer: 0, explanation: '春雷后春笋至嫩，油焖春笋、腌笃鲜是经典食俗。' },
  { id: 'c05', category: 'customs', question: '福州民间有「白露必吃龙眼」的说法，主要寓意是？', options: ['明目补气血', '驱虫避邪', '庆祝丰收', '祭祀祖先'], answer: 0, explanation: '白露食龙眼，民间认为可补益身体，也有「眼睛明亮」的寓意。' },
  { id: 'c06', category: 'customs', question: '「秋风起，蟹脚痒」形容的是哪个节气的时令美食？', options: ['立秋', '白露', '秋分', '寒露'], answer: 2, explanation: '秋分前后螃蟹黄满膏肥，是江南经典秋味。' },
  { id: 'c07', category: 'customs', question: '「立冬补冬，补嘴空」主要体现什么食俗观念？', options: ['夏季清补', '入冬进补储备能量', '春季尝鲜', '祭祀斋戒'], answer: 1, explanation: '立冬为冬之始，民间以热食、炖品进补，储备过冬。' },
  { id: 'c08', category: 'customs', question: '腊八前后民间常熬哪种粥以祈福？', options: ['腊八粥', '八宝饭', '红薯粥', '荷叶粥'], answer: 0, explanation: '小寒前后逢腊八，以多种谷物合煮腊八粥，寓意五谷丰登。' },
  { id: 'c09', category: 'customs', question: '清明除了踏青，南方常见的节令食品是？', options: ['青团', '月饼', '粽子', '重阳糕'], answer: 0, explanation: '江南清明吃青团，以麦青或艾草汁和面，色如碧玉。' },
  { id: 'c10', category: 'customs', question: '闽南、广东大暑时节常饮什么以解暑？', options: ['仙草冻、凉茶', '姜汤', '屠苏酒', '雄黄酒'], answer: 0, explanation: '大暑酷热，岭南民间以仙草冻、凉茶清热解暑。' },

  /* ---- 诗词书画 ---- */
  { id: 'p01', category: 'poetry', question: '「律回岁晚冰霜少，春到人间草木知」描写的是哪个节气？', options: ['立春', '雨水', '惊蛰', '春分'], answer: 0, explanation: '出自张栻《立春偶成》，写立春后阳气回升、万物将苏。' },
  { id: 'p02', category: 'poetry', question: '「好雨知时节，当春乃发生」常被用来形容哪个节气？', options: ['谷雨', '雨水', '清明', '立夏'], answer: 1, explanation: '杜甫《春夜喜雨》写春雨润物，与雨水节气意境相通。' },
  { id: 'p03', category: 'poetry', question: '「微雨众卉新，一雷惊蛰始」的作者是？', options: ['李白', '韦应物', '苏轼', '杜甫'], answer: 1, explanation: '韦应物《观田家》写惊蛰春雷、万物更新之景。' },
  { id: 'p04', category: 'poetry', question: '「清明时节雨纷纷，路上行人欲断魂」的作者是？', options: ['王维', '杜牧', '白居易', '李商隐'], answer: 1, explanation: '杜牧《清明》是描写清明节气最著名的诗篇之一。' },
  { id: 'p05', category: 'poetry', question: '「绿树阴浓夏日长，楼台倒影入池塘」对应哪个节气？', options: ['小满', '芒种', '夏至', '立夏'], answer: 3, explanation: '高骈《山亭夏日》写炎夏初临、树阴渐浓，与立夏、夏至间意境相合。' },
  { id: 'p06', category: 'poetry', question: '「空山新雨后，天气晚来秋」常关联哪个节气？', options: ['大暑', '立秋', '处暑', '白露'], answer: 1, explanation: '王维《山居秋暝》写新雨初霁、秋意渐生，与立秋前后相通。' },
  { id: 'p07', category: 'poetry', question: '「露从今夜白，月是故乡明」与哪个节气相关？', options: ['秋分', '寒露', '白露', '霜降'], answer: 2, explanation: '杜甫《月夜忆舍弟》中「露从今夜白」即指白露节气。' },
  { id: 'p08', category: 'poetry', question: '「时雨及芒种，四野皆插秧」描写的是？', options: ['谷雨农事', '芒种农忙', '小满麦熟', '立夏尝新'], answer: 1, explanation: '陆游《时雨》写芒种时节雨水充沛、插秧繁忙。' },
  { id: 'p09', category: 'poetry', question: '宋人画院常绘「早梅」「寒林」，多对应哪个节气的文人意象？', options: ['小寒', '立春', '大雪', '冬至'], answer: 1, explanation: '踏雪寻梅、早梅报春是立春最具代表性的书画题材。' },
  { id: 'p10', category: 'poetry', question: '「邯郸驿里逢冬至，抱膝灯前影伴身」中的节令是？', options: ['除夕', '冬至', '大寒', '小寒'], answer: 1, explanation: '白居易《邯郸冬至夜思家》写冬至思亲，「冬至大如年」。' },

  /* ---- 时令养生 ---- */
  { id: 'h01', category: 'health', question: '春季养生总原则是？', options: ['养藏', '生发', '收敛', '闭藏'], answer: 1, explanation: '春属木，主生发，宜顺应阳气升发，舒展情志。' },
  { id: 'h02', category: 'health', question: '「春捂秋冻」中「秋冻」的目的是？', options: ['故意受寒', '适度耐寒以增强适应力', '冬季不穿衣', '只吃凉菜'], answer: 1, explanation: '适度秋冻可让身体逐步适应寒冷，但需因人而异、循序渐进。' },
  { id: 'h03', category: 'health', question: '大暑时节养生应重点注意？', options: ['大补温热', '防暑祛湿', '过度发汗', '长期熬夜'], answer: 1, explanation: '大暑湿热交蒸，宜清热解暑、健脾祛湿。' },
  { id: 'h04', category: 'health', question: '秋季对应五脏中的哪一脏，宜润燥养肺？', options: ['肝', '心', '肺', '肾'], answer: 2, explanation: '秋气当令，易燥伤肺，白露、寒露前后尤宜润肺。' },
  { id: 'h05', category: 'health', question: '冬至前后民间「数九」进补，主要顺应什么养生观念？', options: ['春夏养阳', '秋冬养阴', '冬藏春生', '夏清冬温'], answer: 2, explanation: '冬主闭藏，适当温补以蓄精养阳，为春生做准备。' },
  { id: 'h06', category: 'health', question: '「小暑黄鳝赛人参」说明此时宜？', options: ['完全素食', '适当食鲜温补', '大量吃冰', '过度运动'], answer: 1, explanation: '小暑前后黄鳝肥美，民间认为有补中益气的食养价值。' },
  { id: 'h07', category: 'health', question: '春分、秋分养生强调「平衡」，主要指？', options: ['昼夜与阴阳均衡', '只睡不运动', '只吃一种食物', '禁止外出'], answer: 0, explanation: '二分时节昼夜等长，养生宜保持作息、饮食、情志的平衡。' },
  { id: 'h08', category: 'health', question: '立夏后天气渐热，饮食宜？', options: ['辛辣厚味', '清淡易消化', '过度油腻', '完全断食'], answer: 1, explanation: '夏初阳气外发，宜清淡饮食，避免加重脾胃负担。' },
  { id: 'h09', category: 'health', question: '霜降前后，养生应防什么？', options: ['暑热', '秋燥伤肺', '梅雨潮湿', '春困'], answer: 1, explanation: '深秋燥气当令，宜润肺防燥，可食柿子、梨、百合等。' },
  { id: 'h10', category: 'health', question: '「春夏养阳，秋冬养阴」出自哪部典籍传统？', options: ['《黄帝内经》', '《本草纲目》', '《伤寒论》', '《千金方》'], answer: 0, explanation: '《黄帝内经》提出顺四时而养，是中医时令养生的核心原则。' },

  /* ---- 节气日历 ---- */
  { id: 'k01', category: 'calendar', question: '二十四节气中排在第一位的是？', options: ['立春', '冬至', '春分', '雨水'], answer: 0, explanation: '立春为二十四节气之首，标志春季序列开始。' },
  { id: 'k02', category: 'calendar', question: '一年中有几个「分」节气？', options: ['1 个', '2 个', '3 个', '4 个'], answer: 1, explanation: '春分、秋分两个节气，昼夜等长。' },
  { id: 'k03', category: 'calendar', question: '「小寒」「大寒」在公历中通常出现在？', options: ['六月', '一月', '八月', '十月'], answer: 1, explanation: '小寒、大寒在一月，是一年中较冷的时段。' },
  { id: 'k04', category: 'calendar', question: '春季包含几个节气？', options: ['4 个', '6 个', '8 个', '3 个'], answer: 1, explanation: '春季节气：立春、雨水、惊蛰、春分、清明、谷雨，共六个。' },
  { id: 'k05', category: 'calendar', question: '「夏至」之后，北半球白昼将？', options: ['继续变长', '逐渐变短', '保持不变', '先短后长'], answer: 1, explanation: '夏至白昼最长，过后昼渐短、夜渐长。' },
  { id: 'k06', category: 'calendar', question: '二十四节气最后一个节气是？', options: ['冬至', '大寒', '小寒', '立春'], answer: 1, explanation: '大寒为节气之终，之后循环至立春。' },
  { id: 'k07', category: 'calendar', question: '「清明」既是节气也是传统节日，通常在哪个月？', options: ['二月', '三月', '四月', '五月'], answer: 2, explanation: '清明在公历 4 月 4—6 日前后。' },
  { id: 'k08', category: 'calendar', question: '「处暑」的含义是？', options: ['暑气开始', '暑气至此而止', '进入三伏', '一年最热'], answer: 1, explanation: '处暑即「出暑」，炎热将逐渐离开。' },
  { id: 'k09', category: 'calendar', question: '二十四节气中，「夏」季的第一个节气是？', options: ['小满', '芒种', '立夏', '夏至'], answer: 2, explanation: '立夏为夏季之始，表示告别春天。' },
  { id: 'k10', category: 'calendar', question: '民间「数九」通常从哪个节气开始？', options: ['大雪', '冬至', '小寒', '大寒'], answer: 1, explanation: '传统数九从冬至起算，每九天一单位，共九九八十一天。' }
];

var challengeCategories = [
  { id: 'all', name: '综合挑战', desc: '五门混合，全面检验', icon: '综' },
  { id: 'geography', name: '地理气候', desc: '南北物候、时令规律', icon: '地' },
  { id: 'customs', name: '民俗美食', desc: '节令食俗、舌尖记忆', icon: '俗' },
  { id: 'poetry', name: '诗词书画', desc: '典籍名句、文人意象', icon: '诗' },
  { id: 'health', name: '时令养生', desc: '顺时调养、因时制宜', icon: '养' },
  { id: 'calendar', name: '节气日历', desc: '序次日期、岁时流转', icon: '历' }
];
