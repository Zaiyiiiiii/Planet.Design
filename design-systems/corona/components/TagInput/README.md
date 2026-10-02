# TagInput 标签输入

日冕版：玻璃输入框里的一排海湾青胶囊。

- 用于给内容打多个短标签：照片、笔记、设备分组。
- 回车或逗号添加；输入框为空时退格删掉最后一个；每个标签都有可聚焦的 × 按钮。
- 可受控（`tags` + `onChange`）也可自管（`defaultTags`）。

**你需要提供**：`label`，可选 `defaultTags`、`tags`、`onChange`、`placeholder`、`hint`。
