import { CHeader } from "./c-header"
import {CLeft} from "@/pages/c/c-left.tsx";
import {CPostList} from "@/pages/c/c-post-list.tsx";
import {CRight} from "@/pages/c/c-right.tsx";

type CProps = {
    slug: string
}

export function C({ slug }: CProps) {
    return (
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_240px] xl:grid-cols-[220px_minmax(0,1fr)_220px]">
            <aside className="hidden xl:block">
                <CLeft slug={slug} />
            </aside>

            <main className="flex min-w-0 flex-col gap-3">
                <CHeader slug={slug} />
                <CPostList slug={slug} />
            </main>

            <aside className="hidden sm:block">
                <CRight slug={slug} />
            </aside>
        </div>
    )
}