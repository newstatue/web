import { useGetApiCommunitesBySlugPosts } from "#/gen/api"

type CProps = {
    slug: string
}

export function C({ slug }: CProps) {
    const { data, isPending, isError } = useGetApiCommunitesBySlugPosts(
        slug,
        {
            page: 1,
            limit: 100,
        },
    )

    const posts = data?.data?.items ?? []

    if (isPending) {
        return <div>加载中...</div>
    }

    if (isError) {
        return <div>加载帖子失败</div>
    }

    if (!data?.data?.items?.length) {
        return <div>暂无帖子</div>
    }

    return (
        // <Table.LoadMore isLoading={isFetchingNextPage}
        //     onLoadMore={() => {
        //         if (hasNextPage) {
        //             void fetchNextPage()
        //         }
        //     }}
        // >
        //     <Table.LoadMoreContent>
        //         <Spinner />
        //     </Table.LoadMoreContent>
        // </Table.LoadMore>
    )
}