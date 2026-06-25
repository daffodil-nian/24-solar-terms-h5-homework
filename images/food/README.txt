# 节气美食专题 · 配图目录

本目录专门存放「民俗美食 → 节气美食专题」大册里的 **美食照片**（不是节气风物图）。

## 推荐命名（二选一）

### 方式 A · 按节气 slug（推荐）

将图片放入本目录，文件名与 `js/term-slugs.js` 中的拼音一致：

```
images/food/
├── lichun.jpg      ← 立春 · 春饼
├── yushui.jpg      ← 雨水 · 荠菜
├── jingzhe.jpg     ← 惊蛰 · 春笋
├── …
└── dahan.jpg       ← 大寒
```

在 `js/term-food-data.js` 中对应节气写：

```javascript
'立春': {
  …
  image: 'food/lichun.jpg',
  imageAlt: '春饼卷菜薹',
}
```

### 方式 B · 任意文件名

```javascript
image: 'food/my-chunbing-photo.webp',
imageAlt: '立春咬春春饼',
```

也可继续用 `images/terms/` 下的 SVG：

```javascript
image: 'jicai.svg',        // 实际路径 images/terms/jicai.svg
imageAlt: '荠菜馄饨',
```

## 格式建议

- JPG / WebP / PNG，横图 4:3 或 16:10 为宜
- 单张约 500KB 以内
- 替换文件后刷新 `html/customs.html` 即可

## slug 对照

立春 lichun · 雨水 yushui · 惊蛰 jingzhe · 春分 chunfen · 清明 qingming · 谷雨 guyu
立夏 lixia · 小满 xiaoman · 芒种 mangzhong · 夏至 xiazhi · 小暑 xiaoshu · 大暑 dashu
立秋 liqiu · 处暑 chushu · 白露 bailu · 秋分 qiufen · 寒露 hanlu · 霜降 shuangjiang
立冬 lidong · 小雪 xiaoxue · 大雪 daxue · 冬至 dongzhi · 小寒 xiaohan · 大寒 dahan
