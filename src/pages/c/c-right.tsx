import { Card, Spinner } from "@heroui/react"
import { useGetApiCommunitiesBySlug } from "#/gen/api"
import {
    InfoIcon,
    UsersIcon,
} from "@phosphor-icons/react"

type CRightProps = {
    slug: string
}

export function CRight({ slug }: CRightProps) {
    const { data, isPending, isError } =
        useGetApiCommunitiesBySlug(slug)

    if (isPending) {
        return <Spinner />
    }

    if (isError || !data?.data) {
        return (
            <p className="text-sm text-muted">
                社区信息加载失败
            </p>
        )
    }

    const community = data.data

    return (
        <div className="flex flex-col gap-4">
            <Card variant="secondary">
                <Card.Header>
                    <Card.Title className="flex items-center gap-2">
                        <InfoIcon size={20} />
                        关于
                    </Card.Title>
                </Card.Header>

                <Card.Content className="flex flex-col gap-3">
                    <h3 className="font-semibold">
                        {community.name}
                    </h3>

                    <p className="text-sm text-muted">
                        {community.description || "暂无社区介绍"}
                    </p>

                    <div className="text-xs text-muted">
                        创建于{" "}
                        {new Date(community.createdAt).toLocaleDateString("zh-CN")}
                    </div>
                </Card.Content>
            </Card>

            <Card variant="secondary">
                <Card.Header>
                    <Card.Title className="flex items-center gap-2">
                        <UsersIcon size={20} />
                        我
                    </Card.Title>
                </Card.Header>

                <Card.Content>
                    <p className="text-sm text-muted">
                        {community.isMember
                            ? `已加入社区${community.memberRole ? ` · ${community.memberRole}` : ""}`
                            : "尚未加入社区"}
                    </p>
                </Card.Content>
            </Card>
        </div>
    )
}