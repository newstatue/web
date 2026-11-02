import { createFileRoute } from "@tanstack/react-router"
import {CCreatePost} from "@/pages/c/c-p-create.tsx";

export const Route = createFileRoute("/_authenticated/c/$slug/p/create")({
    component: RouteComponent,
})

function RouteComponent() {
    const { slug } = Route.useParams()

    return <CCreatePost slug={slug} />
}