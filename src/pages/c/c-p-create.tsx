import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Card, Input, Label, TextField } from "@heroui/react"
import { MarkdownEditor } from "#/components/markdown-editor"
import {
    usePostApiCommunitiesBySlugPosts,
    getGetApiCommunitiesBySlugPostsQueryKey,
} from "#/gen/api"

type Props = {
    slug: string
}

export function CCreatePost({ slug }: Props) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const { mutate, isPending, isError } =
        usePostApiCommunitiesBySlugPosts({
            mutation: {
                onSuccess: async () => {
                    await queryClient.invalidateQueries({
                        queryKey: getGetApiCommunitiesBySlugPostsQueryKey(slug),
                    })

                    await navigate({
                        to: "/c/$slug", params: { slug },
                    })
                },
            },
        })

    function handleSubmit() {
        const trimmedTitle = title.trim()
        const trimmedContent = content.trim()

        if (!trimmedTitle || !trimmedContent || isPending) {
            return
        }

        mutate({
            slug,
            data: {
                title: trimmedTitle,
                content: trimmedContent,
            },
        })
    }

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <h1 className="text-2xl font-semibold">
                发布帖子
            </h1>

            <Card variant="transparent">
                <Card.Content>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}
                        className="flex flex-col gap-5"
                    >
                        <TextField
                            name="title"
                            value={title}
                            onChange={setTitle}
                            isRequired
                        >
                            <Label>标题</Label>
                            <Input placeholder="输入帖子标题" />
                        </TextField>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">
                                正文（Markdown）
                            </label>

                            <MarkdownEditor onChange={setContent} />
                        </div>

                        {isError && (
                            <p
                                role="alert"
                                className="text-sm text-danger"
                            >
                                发布失败，请检查内容后重试
                            </p>
                        )}

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="secondary"
                                isDisabled={isPending}
                                onPress={() => {
                                    void navigate({
                                        to: "/c/$slug", params: { slug },
                                    })
                                }}
                            >
                                取消
                            </Button>

                            <Button
                                type="submit"
                                variant="primary"
                                isDisabled={
                                    isPending || !title.trim() || !content.trim()
                                }
                            >
                                {isPending ? "发布中..." : "发布帖子"}
                            </Button>
                        </div>
                    </form>
                </Card.Content>
            </Card>
        </div>
    )
}
