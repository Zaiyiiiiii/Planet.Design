# Pagination 分页

日冕版：胶囊形页码，当前页填满海湾青；前后翻页按钮是玻璃胶囊。

- 用于很长、可以按页跳读的列表：日志、文件、聊天记录。连续浏览的流用"加载更多"。
- 永远显示第一页和最后一页，中间用省略号。
- 可受控（`page` + `onChange`）也可自管（`defaultPage`）。

**你需要提供**：`total`，可选 `page`、`defaultPage`、`onChange`。
