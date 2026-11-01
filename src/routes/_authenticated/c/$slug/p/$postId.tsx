import { createFileRoute } from "@tanstack/react-router"
import {CP} from "#/pages/c/c-p.tsx";

export const Route = createFileRoute("/_authenticated/c/$slug/p/$postId")({
    component: RouteComponent,
})

function RouteComponent() {
    const { slug, postId } = Route.useParams()

    return <CP slug={slug} postId={postId} />
}