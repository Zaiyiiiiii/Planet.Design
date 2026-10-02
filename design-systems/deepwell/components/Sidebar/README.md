# Sidebar 侧边栏

深井版：一条铸铁侧栏：喷漆体应用名，每一项前面一盏指示灯，当前项灯亮成铜绿。

- 用于栏目多于 TopBar 能放下的应用；与 TopBar 二选一，或 TopBar 放全局、Sidebar 放本应用内部。
- 分组标题可选；每组 2–7 项。`count` 只放真正需要注意的数字。
- 当前项加 `current: true`。图标用 Icon 的名字。

**你需要提供**：`sections: [{ label?, items: [{ label, href?, icon?, current?, count? }] }]`，可选 `title`、`footer`。
