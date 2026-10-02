# Menu 菜单

深井版：一块细铭牌条的下拉单，悬停项被一圈锅炉铜框住，快捷键用读数字体。

- 用于一组与某个对象相关的操作（"书房的旧平板"能做什么），或一组切换方式（排序、视图）。导航不用菜单，用 TopBar 或 Sidebar。
- 每项动词开头；常用的放前面；危险操作放最后，用分隔线隔开，并标 `danger`。
- 不可用的项保留但标 `disabled`，让人知道它存在。
- 键盘：在按钮上按 ↓ 或回车打开，↑ ↓ Home End 移动，回车或空格选择，Esc 关闭并回到按钮；点菜单外面也会关闭。

**你需要提供**：`label`、`items: [{ label, icon?, shortcut?, danger?, disabled?, onSelect? } | { separator: true }]`，可选 `variant`、`size`、`icon`、`align`（`end` 时右对齐）、`open` / `defaultOpen` / `onOpenChange`。
