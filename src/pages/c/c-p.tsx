import {Card} from "@heroui/react"
import { useGetApiCommunitiesBySlugPostsByPostId } from "#/gen/api"
import {Markdown} from "#/components/markdown.tsx";

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
                <Card.Header className="gap-2">
                    <Card.Title className="text-3xl">
                        {post.title}
                    </Card.Title>

                    <Card.Description>
                        {new Date(post.createdAt).toLocaleString("zh-CN")}
                    </Card.Description>
                </Card.Header>

                <Card.Content>
                    <Markdown>{post.content}</Markdown>
                </Card.Content>
            </Card>
        </article>
    )
}
