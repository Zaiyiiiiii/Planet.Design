# Progress 进度条

深井版：分段计量条，像一排逐格点亮的指示灯；`good` 用铜绿，`bad` 用信号灯红。

- 用于有明确终点的过程：同步、上传、备份。没有终点的等待不要用进度条。
- `valueText` 可以替换百分比，例如"完成""中断"。
- 进度条带 `role="progressbar"` 和当前值。

**你需要提供**：`value`（0–100），可选 `label`、`valueText`、`showValue`、`tone`。
