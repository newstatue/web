import { Button, ButtonGroup } from "@heroui/react"
import { BookmarkSimpleIcon, ThumbsDownIcon, ThumbsUpIcon } from "@phosphor-icons/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getGetCommunitiesBySlugPostsQueryKey, getGetCommunitiesBySlugPostsByPostIdQueryKey, usePutCommunitiesPostsByPostIdBookmark, usePutCommunitiesPostsByPostIdVote } from "@/gen/api"

function formatVoteCount(count: number): string {
    if (Math.abs(count) < 10000) return String(count)
    return `${(count / 10000).toFixed(1).replace(/\.0$/, "")}万`
}

type Interaction = { vote: -1 | 0 | 1; bookmarked: boolean }
const initialState: Interaction = { vote: 0, bookmarked: false }

export function CPostActions({ postId, slug, voteCount }: { postId: string; slug: string; voteCount: number }) {
    const client = useQueryClient()
    // The read API does not expose personal interaction state yet. Keep successful
    // writes in the query cache so list and detail views agree during navigation.
    const queryKey = ["post-interaction", postId] as const
    const { data: state = initialState } = useQuery<Interaction>({
        queryKey,
        queryFn: () => initialState,
        initialData: initialState,
        enabled: false,
        gcTime: Infinity,
    })
    const vote = usePutCommunitiesPostsByPostIdVote({
        mutation: {
            onSuccess: async (_, variables) => {
                client.setQueryData<Interaction>(queryKey, (previous = initialState) => ({
                    ...previous, vote: variables.data.value,
                }))
                await Promise.all([
                    client.invalidateQueries({ queryKey: getGetCommunitiesBySlugPostsQueryKey(slug) }),
                    client.invalidateQueries({ queryKey: getGetCommunitiesBySlugPostsByPostIdQueryKey(slug, postId) }),
                ])
            },
        },
    })
    const bookmark = usePutCommunitiesPostsByPostIdBookmark({
        mutation: {
            onSuccess: async (_, variables) => {
                client.setQueryData<Interaction>(queryKey, (previous = initialState) => ({
                    ...previous, bookmarked: variables.data.bookmarked,
                }))
            },
        },
    })
    const setVote = (value: -1 | 1) => {
        if (vote.isPending) return
        vote.mutate({ postId, data: { value: state.vote === value ? 0 : value } })
    }
    return (
        <div className="flex flex-wrap items-center gap-2">
            <ButtonGroup size="sm" variant="tertiary">
                <Button aria-label="喜欢" aria-pressed={state.vote === 1}
                    variant={state.vote === 1 ? "secondary" : "tertiary"}
                    isDisabled={vote.isPending} onPress={() => setVote(1)}>
                    <ThumbsUpIcon weight={state.vote === 1 ? "fill" : "regular"} />
                    <span aria-label={`净投票数 ${voteCount ?? 0}`} title={String(voteCount ?? 0)}>{formatVoteCount(voteCount ?? 0)}</span>
                </Button>
                <Button isIconOnly aria-label="不喜欢" aria-pressed={state.vote === -1}
                    variant={state.vote === -1 ? "secondary" : "tertiary"}
                    isDisabled={vote.isPending} onPress={() => setVote(-1)}>
                    <ButtonGroup.Separator />
                    <ThumbsDownIcon weight={state.vote === -1 ? "fill" : "regular"} />
                </Button>
            </ButtonGroup>
            <Button isIconOnly size="sm" variant={state.bookmarked ? "secondary" : "tertiary"}
                aria-label={state.bookmarked ? "取消收藏" : "收藏"} aria-pressed={state.bookmarked}
                isDisabled={bookmark.isPending}
                onPress={() => {
                    if (!bookmark.isPending) bookmark.mutate({ postId, data: { bookmarked: !state.bookmarked } })
                }}>
                <BookmarkSimpleIcon weight={state.bookmarked ? "fill" : "regular"} />
            </Button>
            {vote.isError && <span role="alert" className="text-sm text-danger">投票失败，请重试</span>}
            {bookmark.isError && <span role="alert" className="text-sm text-danger">收藏操作失败，请重试</span>}
        </div>
    )
}