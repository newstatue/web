import { Link } from "@tanstack/react-router"
import { HouseIcon } from "@phosphor-icons/react"
import { Button, Spinner } from "@heroui/react"
import { useQuery } from "@tanstack/react-query"
import { getApiCommunities, getGetApiCommunitiesQueryKey } from "@/gen/api"
import type { Community } from "@/gen/api/models"

type CLeftProps = {
    slug: string
}

export function CLeft({ slug }: CLeftProps) {
    const { data: communities = [], isPending, isError, refetch } = useQuery({
        queryKey: [...getGetApiCommunitiesQueryKey(), "all"],
        queryFn: async ({ signal }) => {
            const communities: Community[] = []

            for (let page = 1; ; page++) {
                const { data } = await getApiCommunities({ page, limit: 100 }, { signal })
                const items = data.items ?? []
                communities.push(...items)

                if (items.length === 0 || communities.length >= data.total) {
                    return communities
                }
            }
        },
    })

    return (
        <nav aria-label="社区导航" className="flex flex-col gap-2">
            <h2 className="px-3 text-sm font-semibold text-muted">
                社区导航
            </h2>

            {isPending ? (
                <div role="status" className="flex items-center gap-2 px-3 py-2 text-sm text-muted">
                    <Spinner size="sm" />
                    加载社区中…
                </div>
            ) : isError ? (
                <div className="flex flex-col items-start gap-2 px-3 py-2">
                    <p role="alert" className="text-sm text-muted">社区加载失败</p>
                    <Button size="sm" variant="secondary" onPress={() => { void refetch() }}>
                        重试
                    </Button>
                </div>
            ) : communities.length === 0 ? (
                <p className="px-3 py-2 text-sm text-muted">暂无社区</p>
            ) : communities.map((community) => (
                <Link
                    key={community.id}
                    to="/c/$slug"
                    params={{ slug: community.slug }}
                    aria-current={community.slug === slug ? "page" : undefined}
                    className={`flex min-w-0 items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-hover ${community.slug === slug ? "bg-surface-secondary font-semibold" : ""}`}
                >
                    <HouseIcon size={20} className="shrink-0" />
                    <span className="truncate" title={community.name}>{community.name}</span>
                </Link>
            ))}
        </nav>
    )
}
