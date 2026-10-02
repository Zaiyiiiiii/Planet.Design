# PLANET · Design

PLANET 是一个基于 WASI 的跨平台个人服务平台：安装一个 `satellite` 软件包，旧手机、旧电脑、开发板、平板甚至手表都能成为你自己的服务器。这个仓库收录 PLANET 的世界观与三套设计系统。

设计系统是这个宇宙的衍生物——先有世界，再有界面。

## 世界

PLANET 是一颗被潮汐锁定的殖民星：一面永昼，一面永夜，人住在两者之间的晨昏线上。四十年前的"大熄灯"让全城档案在七分十二秒里消失，从此八股势力都在争夺那晚的真相，而普通人学会了"养卫星"——把自己的记录存在手边的旧机器里。

- [`world/PLANET-宇宙设定集.md`](world/PLANET-宇宙设定集.md)：行星与地理、三个国度、历史与大熄灯、八股势力、群像、叙事规则、故事季、从世界到设计、动态标志与三位助手、词汇表。
- [`world/角色设定.md`](world/角色设定.md)：十二个角色的表面与内里、想要与需要、矛盾、往事、说话方式、关系、弧线与视觉要点。

## 三套设计系统

三个国度，三套设计系统。它们共用同一套角色、派系和组件接口，变的是光照、材质和形状。

| 国度 | 设计系统 | 视觉语言 | 主题 | 助手 |
| --- | --- | --- | --- | --- |
| 白昼面 · 日冕诸城 | [`design-systems/corona`](design-systems/corona) | 现代、圆润、半透明，太空歌剧式的优雅 | `day` | 薇尔 Veil · 玻璃水母 |
| 晨昏线 · 昏线城 | [`design-systems/duskline`](design-systems/duskline) | 西部边疆、80 年代大都会、地下霓虹 | `night` · `daylight` | 卡西 Cassie · 亡命磁带 |
| 夜面 · 深井国 | [`design-systems/deepwell`](design-systems/deepwell) | 天文台与图书馆、精密仪器、蓝晒图纸、极夜与星空 | `deep` | 灯芯 Wick · 戴眼镜的油灯 |

每套系统的目录结构相同：

```
README.md            品牌手册：语气、颜色、字体、形状、组件一览
tokens.json          设计令牌（颜色、字体、间距、圆角/切角、阴影等）
tokens.css           由 tokens.json 生成的 CSS 变量，含 @font-face
fonts/               字体文件（woff2）
assets/              标志与图标（SVG）
components/
  bundle.js          全部组件（React 18 UMD，挂在 window.Planet / PlanetCorona / PlanetDeepwell 上）
  bundle.css         组件样式（只引用 tokens.css 里的变量）
  index.d.ts         TypeScript 类型
  lib/               React 18 与 ReactDOM 的 UMD 构建
  <Component>/       每个组件的说明（README.md）与预览（preview.html）
```

### 使用

```html
<html data-theme="night">
  <link rel="stylesheet" href="design-systems/duskline/tokens.css">
  <link rel="stylesheet" href="design-systems/duskline/components/bundle.css">
  <script src="design-systems/duskline/components/lib/react.production.min.js"></script>
  <script src="design-systems/duskline/components/lib/react-dom.production.min.js"></script>
  <script src="design-systems/duskline/components/bundle.js"></script>
  <div id="app"></div>
  <script>
    var P = window.Planet, h = React.createElement;
    ReactDOM.createRoot(document.getElementById('app')).render(
      h(P.Assistant, { state: 'thinking', message: 'A 面第三首：你的平板同步完了。' })
    );
  </script>
</html>
```

换系统只需换样式表、令牌和命名空间：`Planet`（昏线）、`PlanetCorona`（日冕）、`PlanetDeepwell`（深井）。

### 组件

**通用组件**（三套接口一致）：Button、TextField、Tabs、Switch（点按式开关）、Checkbox、Progress、DataTable、Dialog、EmptyState、Select、Sidebar、Pagination、Tooltip、TagInput、Menu、List、TopBar、Faction、Notice（署名消息）、Avatar（群像头像）、Icon、Logo（动态标志）、Assistant（助手）。

**各国度特色组件**

- 日冕：Pane 玻璃卡片、Chip、Halo 光环仪表、Horizon 舷窗首屏。
- 昏线：CaseFile 档案卡、Stamp 印章、Headline 号外、Ticker 行情条、OrbitGauge、Poster 通缉令、Marquee 跑马灯、NeonSign 霓虹招牌、RouteBadge 环线站牌、Stall 黑市价签。
- 深井：Bulkhead 铭牌面板、Hazard 告示、Lamp 指示灯、ThermalGauge 热度柱、PressureGauge 压力表、SkyPort 星空舷窗、Orrery 卫星仪、ExLibris 藏书票、Marginalia 页边批注、Reading 书页正文。

## 预览

[`previews/`](previews) 里是各阶段的渲染图：三位助手、昏线、深井、深井的面板边框等。每个组件目录下的 `preview.html` 需要先载入对应的 `tokens.css`、`bundle.css`、React 与 `bundle.js` 才能打开。

## 第三方资源

- 字体均为 SIL Open Font License 1.1：Big Shoulders、ZCOOL QingKe HuangYou、Newsreader、Courier Prime、Alfa Slab One、Monoton（昏线）；Unbounded、Figtree（日冕）；Cinzel、EB Garamond、Chivo、Chivo Mono（深井）。中文正文回退到思源宋体 / 思源黑体（Noto Serif SC / Noto Sans SC，经 Google Fonts 在线加载）。
- React 18 / ReactDOM 18：MIT License。
