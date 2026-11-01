import removeMarkdown from "remove-markdown"
import {Button, ButtonGroup, Card} from "@heroui/react"
import { Link } from "#/components/link.tsx"
import { useGetApiCommunitiesBySlugPosts } from "#/gen/api"
import {ShareFatIcon, ThumbsDownIcon, ThumbsUpIcon} from "@phosphor-icons/react";

type CProps = {
    slug: string
}

export function C({ slug }: CProps) {
    const { data, isPending, isError } = useGetApiCommunitiesBySlugPosts(
        slug,
        {
            page: 1,
            limit: 20,
        },
    )

    if (isPending) {
        return <div>加载中...</div>
    }

    if (isError) {
        return <div>加载帖子失败</div>
    }

    const posts = data?.data?.items ?? []

    if (posts.length === 0) {
        return <div>暂无帖子</div>
    }

    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
            {posts.map((post) => (
                <Link
                    key={post.id}
                    to="/c/$slug/p/$postId"
                    params={{ slug, postId: post.id }}
                    className="no-underline w-full"
                >
                    <Card
                        className="w-full cursor-pointer transition-colors hover:bg-surface-hover"
                        variant="transparent"
                    >
                        <Card.Header>
                            <Card.Title className="text-xl">{post.title}</Card.Title>

                            <Card.Description className="text-sm">
                                {new Date(post.createdAt).toLocaleString("zh-CN")}
                            </Card.Description>
                        </Card.Header>

                        <Card.Content>
                            <p className="line-clamp-2 text-sm text-muted">
                                {removeMarkdown(post.content)}
                            </p>
                        </Card.Content>
                        <Card.Footer className="gap-2">
                            <ButtonGroup size="sm" variant="tertiary">
                                <Button aria-label="喜欢"
                                    onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                }}>
                                    <ThumbsUpIcon />
                                    <span className="text-xs font-semibold">2.4K</span>
                                </Button>
                                <Button isIconOnly aria-label="不喜欢"
                                        onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                }}>
                                    <ButtonGroup.Separator />
                                    <ThumbsDownIcon />
                                </Button>
                            </ButtonGroup>
                            <Button variant="tertiary" size="sm" isIconOnly aria-label="分享" onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                            }}><ShareFatIcon/></Button>
                        </Card.Footer>
                    </Card>
                </Link>
            ))}
        </div>
    )
}