interface Post {
    voteCount: number
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
        voteCount: 2468,
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
        voteCount: 12800,
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
        voteCount: 56000,
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
    {
        id: "4",
        voteCount: 10000,
        authorId: "user-1",
        communityId: "community-1",
        title: "Markdown 综合渲染测试",
        content: `
# Markdown 综合渲染测试

这篇帖子用于检查 Markdown 的排版、样式和不同内容组合时的显示效果。

这是第二个段落，用于检查段落之间的间距。中文、English、数字 123456 和表情 😀 🚀 ✅ 应该正常显示。

## 1. 标题层级

### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

## 2. 行内样式

普通文本、**加粗文本**、*斜体文本*、***加粗且斜体***、~~删除线文本~~。

组合样式：**加粗中包含 *斜体* 和 \`inline code\`**。

行内代码：\`const count = 42\`、\`<div>Hello</div>\`、\`@heroui/react\`。

特殊字符：< > & " '，以及转义符号：\\*普通星号\\*、\\_普通下划线\\_。

这一行末尾有两个空格，用于测试硬换行。  
这句话应该换行，但仍属于同一个段落。

## 3. 无序列表

- 第一项
- 第二项，包含 **加粗** 和 \`代码\`
- 第三项，包含嵌套列表：
  - 二级第一项
  - 二级第二项
    - 三级第一项
    - 三级第二项

## 4. 有序列表

1. 安装依赖
2. 配置项目
   1. 配置路由
   2. 配置主题
3. 启动应用

## 5. 任务列表

- [x] 普通 Markdown 渲染
- [x] GFM 表格支持
- [ ] 代码高亮
- [ ] 图片预览
- [ ] 嵌套任务
  - [x] 子任务一
  - [ ] 子任务二

## 6. 引用

> 这是一段引用。
>
> 引用中的第二个段落，包含 **加粗**、[链接](https://github.com/danielgtaylor/huma) 和 \`代码\`。
>
> > 这是一段嵌套引用。
>
> - 引用中的列表项一
> - 引用中的列表项二

## 7. 代码块

### TypeScript

\`\`\`ts
interface User {
    id: string
    name: string
    active: boolean
}

const user: User = {
    id: "user-1",
    name: "测试用户",
    active: true,
}

function greet(user: User): string {
    return "Hello, " + user.name
}

console.log(greet(user))
\`\`\`

### Go

\`\`\`go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello, World!")
    })

    http.ListenAndServe(":8080", nil)
}
\`\`\`

### JSON

\`\`\`json
{
    "name": "Markdown 测试",
    "enabled": true,
    "tags": ["React", "HeroUI", "中文"],
    "description": null
}
\`\`\`

### 未指定语言

\`\`\`
这是一段没有语言标识的代码块。
特殊字符应该原样显示：<div> & **不是加粗**
\`\`\`

## 8. 表格

### 常规表格与列对齐

| 左对齐 | 居中对齐 | 右对齐 |
| :--- | :---: | ---: |
| React | 前端框架 | 100 |
| TypeScript | 类型系统 | 2000 |
| HeroUI | UI 组件库 | 35 |

### 单元格中的行内样式

| 功能 | 示例 | 状态 |
| --- | --- | --- |
| 加粗 | **重要内容** | ✅ |
| 斜体 | *补充说明* | ✅ |
| 删除线 | ~~已废弃~~ | ✅ |
| 行内代码 | \`const value = 1\` | ✅ |
| 链接 | [Huma](https://github.com/danielgtaylor/huma) | ✅ |
| 转义竖线 | A \\| B | ✅ |
| 空单元格 | | |

### 长内容与横向滚动

| 名称 | 描述 | 文件路径 | 状态 |
| --- | --- | --- | --- |
| 较长的中文内容 | 这是一段比较长的单元格内容，用于检查窄屏下的换行、列宽和表格横向滚动效果。 | \`src/components/markdown/renderers/table.tsx\` | 测试中 |
| 连续英文字符 | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 | \`very-long-file-name-without-spaces.test.tsx\` | 完成 |

### 只有表头

| 名称 | 类型 | 备注 |
| --- | --- | --- |

## 9. 链接

普通链接：[Huma GitHub](https://github.com/danielgtaylor/huma)

带标题的链接：[查看项目](https://github.com/danielgtaylor/huma "Huma 项目主页")

自动链接：https://github.com/danielgtaylor/huma

引用式链接：[项目仓库][huma]

[huma]: https://github.com/danielgtaylor/huma "Huma GitHub"

## 10. 图片

下方图片需要网络连接：

![Markdown 图片渲染测试](https://placehold.co/800x240/png?text=Markdown+Image "测试图片")

## 11. 分隔线

分隔线上方的段落。

---

分隔线下方的段落。

## 12. 混合内容

1. **第一步：定义数据**

   这是列表项内部的独立段落。

   \`\`\`ts
   const items = ["React", "TypeScript", "HeroUI"]
   \`\`\`

2. **第二步：检查结果**

   > 列表内的引用应该保持正确的缩进。

   - [x] 标题显示正常
   - [x] 段落间距正常
   - [ ] 移动端表格检查

测试结束。🎉
`,
        createdAt: "2026-11-02T08:00:00Z",
        updatedAt: "2026-11-02T08:00:00Z",
    },
]
