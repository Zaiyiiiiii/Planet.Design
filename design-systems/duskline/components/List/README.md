# List 列表

昏线版：像报纸的分类栏，顶部粗细双线，每行之间一道发丝线；标题用标签字体，副标题是斜体宋体，时间用打字机体。

- 用于一列同类条目：消息、设备、文件、成员。需要比较多列数据时用 DataTable。
- 每行一个主标题，副标题一行，过长自动省略；时间或数字放 `meta`，状态组件放 `trailing`。
- 前置可以是角色头像（`avatar`，消息类）、图标（`icon`，物件类）或任意节点（`leading`）。
- 行可点击时（`href` 或 `onClick`）自动加右箭头，整行都是点击区域。

**你需要提供**：`items: [{ id?, title, subtitle?, avatar?, icon?, leading?, meta?, trailing?, href?, onClick?, current? }]`，可选 `ariaLabel`。
