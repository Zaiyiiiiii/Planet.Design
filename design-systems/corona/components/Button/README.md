# Button 按钮

胶囊形按钮。主按钮是一小块日冕金，带着光晕；其余按钮是半透明玻璃。

- `primary` 每个视图最多一个。金色只作填充，文字用 `on-corona`。
- `secondary`（默认）是玻璃胶囊，边框 `line-strong`。
- `ghost` 用海湾青文字，给低优先级操作。
- `danger` 只用于不可撤销的操作，文案写清后果："移除节点"，不写"确定"。
- `size`: `sm` | `md` | `lg`。

**你需要提供**：`children`，可选 `icon`，其余属性传给 `<button>`。
