# Progress 进度条

昏线版：分段的黄铜进度条，像一排灯管逐格点亮；`good` 用幽灵绿，`bad` 用霓虹红。

- 用于有明确终点的过程：同步、上传、备份。没有终点的等待不要用进度条。
- `valueText` 可以替换百分比，例如"完成""中断"。
- 进度条带 `role="progressbar"` 和当前值。

**你需要提供**：`value`（0–100），可选 `label`、`valueText`、`showValue`、`tone`。
