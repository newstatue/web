import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { getApiAuthMe, getGetApiAuthMeQueryKey } from "@/gen/api"
import type { ApiError } from "@/lib/error"

export const Route = createFileRoute("/_authenticated")({
    beforeLoad: async ({ context }) => {
        if (import.meta.env.DEV) {
            return
        }
        try {
            await context.queryClient.query({
                queryKey: getGetApiAuthMeQueryKey(),
                queryFn: () => getApiAuthMe(),
                staleTime: 60_000,
                retry: false,
            })
        } catch (error) {
            if ((error as ApiError).status === 401) {
                throw redirect({ to: "/auth/login" })
            }

            throw error
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    return <Outlet />
}