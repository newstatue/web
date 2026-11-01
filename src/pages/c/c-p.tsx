import { Card } from "@heroui/react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useGetApiCommunitiesBySlugPostsByPostId } from "#/gen/api"

type CPProps = {
    slug: string
    postId: string
}

export function CP({ slug, postId }: CPProps) {
    const { data, isPending, isError } =
        useGetApiCommunitiesBySlugPostsByPostId(slug, postId)

    if (isPending) {
        return <div>加载中...</div>
    }

    if (isError) {
        return <div>加载帖子失败</div>
    }

    const post = data?.data

    if (!post) {
        return <div>帖子不存在</div>
    }

    return (
        <article className="mx-auto w-full max-w-2xl">
            <Card variant="transparent">
                <Card.Header>
                    <Card.Title className="text-2xl">
                        {post.title}
                    </Card.Title>

                    <Card.Description>
                        {new Date(post.createdAt).toLocaleString("zh-CN")}
                    </Card.Description>
                </Card.Header>

                <Card.Content>
                    <div className="min-w-0">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            skipHtml
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </Card.Content>
            </Card>
        </article>
    )
}
