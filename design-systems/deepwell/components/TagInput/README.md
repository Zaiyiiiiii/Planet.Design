# TagInput 标签输入

深井版：输入槽里的一排铸铁铭牌，读数字体。

- 用于给内容打多个短标签：照片、笔记、设备分组。
- 回车或逗号添加；输入框为空时退格删掉最后一个；每个标签都有可聚焦的 × 按钮。
- 可受控（`tags` + `onChange`）也可自管（`defaultTags`）。

**你需要提供**：`label`，可选 `defaultTags`、`tags`、`onChange`、`placeholder`、`hint`。
