import { createFileRoute, redirect } from "@tanstack/react-router"
import { authClient } from "@/lib/auth-client.ts"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
  beforeLoad: async () => {
    const { data } = await authClient.getSession()
    if (!data?.user) {
      throw redirect({
        to: "/sign-in",
      })
    }
  },
})
