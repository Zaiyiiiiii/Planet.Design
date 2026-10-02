# TopBar 顶栏

所有 PLANET 网页应用共用的顶栏：钥匙孔行星标志 + 应用名，主导航，右侧操作区。

**用法**
- `appName` 写具体应用名（"PLANET"、"PLANET 档案馆"），标志与名字都用 `brass`。
- 当前页链接加 `current: true`：文字变 `ink`，下方 3px 黄铜条。
- 链接 3–6 个；窄屏时导航可横向滚动。
- `end` 放一个 `sm` 按钮或用户信息。

**你需要提供**：`links: [{ label, href?, current? }]`，可选 `appName`、`homeHref`、`end`。
