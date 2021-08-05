---
order: 3
nav:
  title: 指南
  order: 1
---

# 内置组件

## Alert

<Alert type="info">
  info（注意，内部暂时只能编写 HTML）
</Alert>
<Alert type="success">
  success
</Alert>
<Alert type="warning">
  warning
</Alert>
<Alert type="error">
  error
</Alert>

## Badge

<Badge>
  <div>Badge</div>
</Badge>

## embed

在一个 Markdown 文档中嵌入另一个 Markdown 文档的内容

<!-- 引入全量的 Markdown 文件内容 -->
<!-- <embed src="./some.md"></embed> -->

<!-- 根据行号引入指定行的 Markdown 文件内容 -->
<!-- <embed src="/path/to/some.md#L1"></embed> -->

<!-- 根据行号引入部分 Markdown 文件内容 -->
<!-- <embed src="/path/to/some.md#L1-L10"></embed> -->

<!-- 根据正则引入部分 Markdown 文件内容 -->
<!-- <embed src="/path/to/some.md#RE-/^[^\r\n]+/"></embed> -->
