日冕 Corona 是 PLANET 三套设计系统中的亮色一套，属于白昼面的日冕诸城：向阳会用反光穹顶罩起的城市，能源无尽、科技发达、一尘不染。它和晨昏线的 [昏线 Duskline](https://claude.ai/artifact/2KtsAxLwcgqmeRrJKVR742)、夜面的 [深井 Deepwell](https://claude.ai/artifact/6gXx5T7Huuq4RDWKrkzQyo) 共用同一套角色、派系和组件接口，世界设定见 [PLANET 宇宙设定集](https://claude.ai/code/artifact/8d4d8b3a-1dda-4007-994a-1ff802b2ebde)。

## 什么时候用日冕

日冕是 PLANET 的"日常"面孔：设置、存储、媒体、仪表盘这类需要清爽和耐看的界面。它像一出太空歌剧——宽阔、明亮、从容。晨昏线的昏线系统留给故事感强的场合（案卷、活动、首发），深井留给监控、警报和运维这类硬核场景。同一个应用里只用一套系统，不混搭。

## 语气

- 日面的人说话礼貌、从容、略带优越感。句子完整，不用俚语，不用感叹号。
- 中英双语：中文在前、英文在后。英文在这里显得更"体面"，公告与条款可以只用英文。
- 系统消息照旧由角色署名（`Notice`）：错误归账房 `tally`，通知归小飞 `kite`，完成归奥菲莉亚 `ophelia`。欢迎语与能源播报由向阳会的奥古斯特·白 `august` 署名——日面是他的地盘。
- 好："您的穹顶今日满能运行。" 不好："耶！一切正常！"

## 光与玻璃

- 页面底色 `pearl`，上方有一团极淡的日冕金晕、右下有一团海湾青晕——那是穹顶外的恒星和水面。不要再加别的渐变。
- 卡片与控件是半透明玻璃：`glass` 加 `backdrop-filter: blur(var(--blur-glass)) saturate(1.4)`，一道 `glass-edge` 内高光，`shadow-float` 投影。
- 玻璃最多叠两层；第三层起用 `glass-strong`。玻璃下面必须有可透的东西，否则它只是灰白。
- 浏览器不支持背景模糊时，玻璃自动退化为 `glass-strong`。
- 深色只出现在 `Horizon` 舷窗里：`space` 底、`on-space` 字，那是穹顶之外。

## 颜色

- `corona` 日冕金只作填充：主按钮、活跃的光环、升起的恒星。它上面的文字用 `on-corona`。金色作文字时用 `corona-ink`。
- `lagoon` 海湾青是链接、信息和焦点环，也是次强调。
- 状态：`bloom` 成功，`flare` 危险。永远配文字或符号。
- 带 `-soft` 的令牌只做同色文字的底（芯片）。
- 派系色 `faction-*` 只用于署名消息和徽记。
- 正文 `ink`，次要 `ink-muted`，都在 `pearl` 与玻璃上 ≥6:1；控件边框 `line-strong` ≥3:1；分隔线 `hairline` 只作装饰。
- 焦点：2px 实线 `focus-ring`，偏移 3px。

## 字体

- `display`：Unbounded，宽体、圆润、细字重——太空歌剧片头的气质。用 300 字重写大标题（`display-xl`、`display-l`），500 写卡片标题（`title`、`title-s`）。中文回退到思源黑体。
- `text`：Figtree，圆润的几何无衬线。正文 `body`，导语 `body-l`，按钮与标签 `label`，元数据 `caption`。
- 不要全大写，不要加字距拉开的小标签。

## 形状与动效

- 一切操作都是胶囊（`radius-pill`）；卡片 `radius-lg`，输入框与消息 `radius-md`。日面没有直角和切角。
- 圆是日面的母题：光环、月亮、恒星。
- 动效柔和：悬停时上浮 1px、玻璃变浓，180ms。尊重"减少动态效果"。

## 标志

- `planet-mark-corona.svg`：钥匙孔行星，深空墨色 `#14213d`，用于 `pearl` 与玻璃上。在 `Horizon` 里用 `Mark` 组件并设 `color: var(--on-space)`。

## 组件

`Button` 胶囊按钮 · `TextField` 玻璃输入框 · `Tabs` 分段控件 · `Pane` 玻璃卡片 · `Chip` 状态芯片 · `Halo` 光环仪表 · `Horizon` 舷窗首屏 · `Notice` 署名消息。挂在 `window.PlanetCorona` 上，需要 React 18。`Button`、`TextField`、`Tabs`、`Notice` 的接口与另外两套系统完全相同，换系统只需换样式表与命名空间。

## 角色与图标

- 昏线城的群像有自己的头像（`Avatar`）：平涂 2D 的小型半身像，派系色作底，圆形，外圈一道玻璃高光。署名消息会自动带上说话者的头像，这就是"谁在说话"在界面上的样子。
- 图标（`Icon`）是三套系统共用的 14 个图形，日冕版的线条是1.75 描边、圆头端点、圆角转角——和胶囊一样柔和。图标跟随文字颜色，只有图标的按钮必须带 `title`。

## 通用组件

三套系统都有同一组基础组件，接口完全相同，只是长相不同：`Button`、`TextField`、`Tabs`、`Switch` 开关、`Checkbox` 复选框、`Progress` 进度条、`DataTable` 表格、`Dialog` 对话框、`EmptyState` 空状态、`Select` 下拉选择、`Sidebar` 侧边栏、`Pagination` 分页、`Tooltip` 提示气泡、`TagInput` 标签输入、`Menu` 菜单、`List` 列表、`TopBar` 顶栏、`Faction` 派系标签、`Notice` 署名消息、`Avatar` 角色头像、`Icon` 图标。在此之上，每个国度各有自己的特色组件。换系统只需换样式表和命名空间。

## 动态标志与助手

这个国度的动态标志是 **PLANET · 日冕标志**（`Logo`）：一颗戴海湾青光环的小太阳，四周的卫星是白色玻璃珠，沿虚线轨道匀速滑行。中央是 PLANET，每颗卫星是一个正在运行的应用。这个国度的助手是 **薇尔 Veil**（`Assistant`）：向阳会穹顶花园里养的观赏水母，被改造成了助理。
