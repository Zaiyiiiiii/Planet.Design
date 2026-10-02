# Progress 进度条

日冕版：细胶囊进度条，默认海湾青；`good` 用繁茂绿，`bad` 用耀斑红。

- 用于有明确终点的过程：同步、上传、备份。没有终点的等待不要用进度条。
- `valueText` 可以替换百分比，例如"完成""中断"。
- 进度条带 `role="progressbar"` 和当前值。

**你需要提供**：`value`（0–100），可选 `label`、`valueText`、`showValue`、`tone`。
