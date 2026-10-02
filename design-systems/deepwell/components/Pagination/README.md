# Pagination 分页

深井版：带落差的铸铁页码，按下会下沉，当前页漆成锅炉铜。

- 用于很长、可以按页跳读的列表：日志、文件、聊天记录。连续浏览的流用"加载更多"。
- 永远显示第一页和最后一页，中间用省略号。
- 可受控（`page` + `onChange`）也可自管（`defaultPage`）。

**你需要提供**：`total`，可选 `page`、`defaultPage`、`onChange`。
