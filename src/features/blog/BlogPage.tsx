import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const markdown = `
# Markdown 排版测试

这是一篇用于测试 **shadcn Typeset** 的 Markdown 示例文章。

支持 **粗体文本**、*斜体文本*、~~删除线~~ 和 [超链接](https://ui.shadcn.com)。

## 二级标题

Markdown 是一种轻量级标记语言，常用于博客、技术文档和 README。

### 三级标题

下面展示不同类型的内容。

## 无序列表

- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## 有序列表

1. 创建项目
2. 安装依赖
3. 编写组件
4. 部署应用

## 引用

> 简洁是可靠性的前提。
>
> 好的排版可以显著提升阅读体验。

## 行内代码

使用 \`pnpm dev\` 启动开发服务器。

## 代码块

\`\`\`typescript
interface User {
  id: string
  name: string
}

const user: User = {
  id: "1",
  name: "Evorsio",
}

console.log(user.name)
\`\`\`

## 表格

| 技术 | 用途 | 类型 |
| --- | --- | --- |
| React | 用户界面 | Frontend |
| Hono | API 服务 | Backend |
| Drizzle | 数据库 ORM | Database |

## 任务列表

- [x] 创建项目
- [x] 配置 Typeset
- [ ] 完成博客系统

---

这是一段结尾文字，用于测试段落间距和整体阅读体验。
`

export function BlogPage() {
  return (
    <div className="w-full px-4 py-12 sm:px-6">
      <article className="typeset typeset-docs mx-auto max-w-[37em]">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </article>
    </div>
  )
}