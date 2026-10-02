# Sidebar 侧边栏

日冕版：一块悬浮的玻璃侧栏：当前项浮起成浓玻璃，图标变海湾青，数字放在珍珠白小胶囊里。

- 用于栏目多于 TopBar 能放下的应用；与 TopBar 二选一，或 TopBar 放全局、Sidebar 放本应用内部。
- 分组标题可选；每组 2–7 项。`count` 只放真正需要注意的数字。
- 当前项加 `current: true`。图标用 Icon 的名字。

**你需要提供**：`sections: [{ label?, items: [{ label, href?, icon?, current?, count? }] }]`，可选 `title`、`footer`。
