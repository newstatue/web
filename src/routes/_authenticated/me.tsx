import { createFileRoute } from "@tanstack/react-router"
import { useAuth } from "#/hooks/use-auth"

export const Route = createFileRoute("/_authenticated/me")({
    component: RouteComponent,
})

function RouteComponent() {
    const { user } = useAuth()

    return <div>欢迎，{user?.name}</div>
}