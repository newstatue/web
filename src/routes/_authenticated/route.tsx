import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { authClient } from "@/lib/auth-client.ts"

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  beforeLoad: async () => {
    const { data: session, error } = await authClient.getSession()
    console.log("Session:", session)
    console.log("Error:", error)
    if (!session) {
      throw redirect({ to: "/login" })
    }
  },
})

function RouteComponent() {
  return <Outlet />
}
