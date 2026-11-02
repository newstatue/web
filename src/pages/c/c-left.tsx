import { Link } from "@tanstack/react-router"
import { HouseIcon, FireIcon, ClockIcon } from "@phosphor-icons/react"

type CLeftProps = {
    slug: string
}

export function CLeft({ slug }: CLeftProps) {
    return (
        <nav className="flex flex-col gap-2">
            <h2 className="px-3 text-sm font-semibold text-muted">
                社区导航
            </h2>

            <Link
                to="/c/$slug"
                params={{ slug }}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-hover"
                activeProps={{
                    className: "bg-surface-secondary font-semibold",
                }}
            >
                <HouseIcon size={20} />
                全部帖子
            </Link>

            <div className="flex cursor-not-allowed items-center gap-3 px-3 py-2 text-sm text-muted opacity-60">
                <FireIcon size={20} />
                热门帖子
            </div>

            <div className="flex cursor-not-allowed items-center gap-3 px-3 py-2 text-sm text-muted opacity-60">
                <ClockIcon size={20} />
                最新发布
            </div>
        </nav>
    )
}