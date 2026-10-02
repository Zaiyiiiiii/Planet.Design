# TextField 证词栏

打字机字体的单行输入框：底部 2px 描边，右上角切角，像填写档案表格。

**用法**
- 始终提供 `label`。标签用中英双语时中文在前。
- `hint` 用斜体说明填写规则；`error` 会替换 hint，前缀 "✕"，并用 `neon` 色。错误文案说清楚错在哪、怎么改——不道歉、不含糊。
- 输入值用 `mono` 族（Courier Prime + 中文宋体回退），天然像打字机录入。

**你需要提供**：`label`，可选 `hint`、`error`，其余属性（`value`、`onChange`、`placeholder`、`type`…）传给 `<input>`。

**焦点**：底线变黄铜色，外加 2px `focus-ring` 轮廓。
