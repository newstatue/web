import removeMarkdown from "remove-markdown"
import { Button, ButtonGroup, Card, Spinner } from "@heroui/react"
import { Link } from "#/components/link"
import { useGetApiCommunitiesBySlugPosts } from "#/gen/api"
import {
    ShareFatIcon,
    ThumbsDownIcon,
    ThumbsUpIcon,
} from "@phosphor-icons/react"

type CPostListProps = {
    slug: string
}

export function CPostList({ slug }: CPostListProps) {
    const { data, isPending, isError } = useGetApiCommunitiesBySlugPosts(
        slug,
        {
            page: 1,
            limit: 20,
        },
    )

    if (isPending) {
        return <Spinner />
    }

    if (isError) {
        return <div className="text-sm text-danger">加载帖子失败</div>
    }

    const posts = data?.data?.items ?? []

    if (posts.length === 0) {
        return (
            <div className="py-12 text-center text-sm text-muted">
                暂无帖子
            </div>
        )
    }

    return (
        <div className="flex w-full flex-col gap-3">
            {posts.map((post) => (
                <Card
                    key={post.id}
                    variant="transparent"
                    className="relative w-full transition-colors hover:bg-surface-hover"
                >
                    <Card.Header>
                        <Card.Title className="text-xl">
                            <Link
                                to="/c/$slug/p/$postId"
                                params={{ slug, postId: post.id }}
                                className="after:absolute after:inset-0 after:content-['']"
                            >
                                {post.title}
                            </Link>
                        </Card.Title>

                        <Card.Description className="text-sm">
                            {new Date(post.createdAt).toLocaleString("zh-CN")}
                        </Card.Description>
                    </Card.Header>

                    <Card.Content>
                        <p className="line-clamp-2 text-sm text-muted">
                            {removeMarkdown(post.content)}
                        </p>
                    </Card.Content>

                    <Card.Footer className="relative z-10 gap-2">
                        <ButtonGroup size="sm" variant="tertiary">
                            <Button aria-label="喜欢">
                                <ThumbsUpIcon />
                                <span className="text-xs font-semibold">
                                    2.4K
                                </span>
                            </Button>

                            <ButtonGroup.Separator />

                            <Button isIconOnly aria-label="不喜欢">
                                <ThumbsDownIcon />
                            </Button>
                        </ButtonGroup>

                        <Button
                            variant="tertiary"
                            size="sm"
                            isIconOnly
                            aria-label="分享"
                        >
                            <ShareFatIcon />
                        </Button>
                    </Card.Footer>
                </Card>
            ))}
        </div>
    )
}