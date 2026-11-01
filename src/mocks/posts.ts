interface Post {
    authorId: string
    communityId: string
    content: string
    createdAt: string
    id: string
    title: string
    updatedAt: string
}


export const mockPosts: Post[] = [
    {
        id: "1",
        authorId: "user-1",
        communityId: "community-1",
        title: "大家平时都使用什么 Go Web 框架？",
        content: `
## Go Web 框架选择

最近在研究 **Go Web 框架**，主要考虑以下几个：

- **Huma**：自动生成 OpenAPI 3.1 文档
- **Gin**：生态成熟，社区活跃
- **Echo**：轻量、简洁
- **Fiber**：基于 fasthttp

### 示例代码

\`\`\`go
func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello, World!")
    })

    http.ListenAndServe(":8080", nil)
}
\`\`\`

> 大家在生产环境中更推荐哪个？

参考：[Huma GitHub](https://github.com/danielgtaylor/huma)
`,
        createdAt: "2026-11-01T10:00:00Z",
        updatedAt: "2026-11-01T10:00:00Z",
    },
    {
        id: "2",
        authorId: "user-2",
        communityId: "community-1",
        title: "分享一个自己开发的开源社区项目",
        content: `
# Evorsio

最近正在开发一个面向个人开发者的 **开源社区平台**。

### 技术栈

| 模块 | 技术 |
| --- | --- |
| 前端 | React + TypeScript |
| 路由 | TanStack Router |
| UI | HeroUI |
| 后端 | Go + Huma |
| 数据库 | PostgreSQL |
| 缓存 | Valkey |

### 已实现功能

- [x] 用户注册和登录
- [x] Session 会话管理
- [x] 社区创建与加入
- [x] Markdown 帖子发布
- [ ] 评论和回复
- [ ] Git 仓库托管

**欢迎交流和提出建议！**

~~目前已经完全开发完成~~ 仍在持续开发中。
`,
        createdAt: "2026-11-01T09:30:00Z",
        updatedAt: "2026-11-01T09:30:00Z",
    },
    {
        id: "3",
        authorId: "user-3",
        communityId: "community-1",
        title: "TanStack Router 使用体验怎么样？",
        content: `
## 从 React Router 迁移到 TanStack Router

最近准备迁移到 **TanStack Router**。

主要看中以下功能：

1. 完整的 TypeScript 类型推断
2. 文件路由自动生成
3. Search Params 类型校验
4. 路由级数据加载

### 路由示例

\`\`\`tsx
export const Route = createFileRoute("/posts/$postId")({
    component: PostPage,
})

function PostPage() {
    const { postId } = Route.useParams()

    return <div>Post: {postId}</div>
}
\`\`\`

### 一些疑问

- 和 **TanStack Query** 如何配合？
- \`beforeLoad\` 适合做身份验证吗？
- SSR 支持怎么样？

---

有没有实际项目使用经验可以分享？😀
`,
        createdAt: "2026-10-31T15:20:00Z",
        updatedAt: "2026-10-31T15:20:00Z",
    },
]
