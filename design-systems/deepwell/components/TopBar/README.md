# TopBar 顶栏

深井版：一块铸铁顶栏：锅炉铜喷漆字的标志，当前页下方一道锅炉铜。

- `appName` 写具体应用名；当前页链接加 `current: true`。
- 链接 3–6 个；窄屏时导航可横向滚动。
- `end` 放一个小按钮或用户信息。

**你需要提供**：`links: [{ label, href?, current? }]`，可选 `appName`、`homeHref`、`end`。
