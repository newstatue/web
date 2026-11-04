import {Button, buttonVariants, Spinner} from "@heroui/react"
import {
    getGetCommunitiesBySlugQueryKey,
    useGetCommunitiesBySlug,
    usePutCommunitiesBySlugMembersMe,
} from "@/gen/api"
import { CheckIcon, PlusIcon } from "@phosphor-icons/react"
import { useQueryClient } from "@tanstack/react-query"
import {Link} from "@tanstack/react-router";

type CHeaderProps = {
    slug: string
}

export function CHeader({ slug }: CHeaderProps) {
    const queryClient = useQueryClient()

    const { data, isPending, isError } = useGetCommunitiesBySlug(slug)

    const invalidateCommunity = async () => {
        await queryClient.invalidateQueries({
            queryKey: getGetCommunitiesBySlugQueryKey(slug),
        })
    }

    const {
        mutate: putMembership,
        isPending: isMutating,
    } = usePutCommunitiesBySlugMembersMe({
        mutation: {
            onSuccess: invalidateCommunity,
        },
    })

    if (isPending) {
        return <Spinner />
    }

    if (isError || !data?.data) {
        return <div>社区加载失败</div>
    }

    const community = data.data

    const handleMembership = () => {
        if (isMutating) return

        putMembership({
            slug,
            data: { joined: !community.isMember },
        })
    }

    return (
        <header className="flex w-full flex-col gap-4 border-b pb-4">
            <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                    <h1 className="text-2xl font-semibold">
                        {community.name}
                    </h1>

                    {community.description && (
                        <p className="text-sm text-muted">
                            {community.description}
                        </p>
                    )}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <Button
                        isIconOnly
                        variant={community.isMember ? "secondary" : "primary"}
                        aria-label={community.isMember ? "退出社区" : "加入社区"}
                        isDisabled={isMutating}
                        onPress={handleMembership}
                    >
                        {isMutating ? (
                            <Spinner size="sm" />
                        ) : community.isMember ? (
                            <CheckIcon />
                        ) : (
                            <PlusIcon />
                        )}
                    </Button>

                    <Link
                        to="/c/$slug/p/create"
                        params={{ slug }}
                        className={buttonVariants({ variant: 'secondary'})}
                    >
                            发布帖子
                    </Link>
                </div>
            </div>
        </header>
    )
}