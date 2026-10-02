# Pagination 分页

昏线版：切角的小方块页码，数字用打字机体，当前页填满黄铜。

- 用于很长、可以按页跳读的列表：日志、文件、聊天记录。连续浏览的流用"加载更多"。
- 永远显示第一页和最后一页，中间用省略号。
- 可受控（`page` + `onChange`）也可自管（`defaultPage`）。

**你需要提供**：`total`，可选 `page`、`defaultPage`、`onChange`。
