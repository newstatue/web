import { createFileRoute, redirect } from '@tanstack/react-router'
import App from "@/App.tsx"
import { authClient } from "@/lib/auth-client.ts"

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
  beforeLoad: async () => {
    const {data: session} = await authClient.getSession()
    if (!session) {
      throw redirect({to:"/login"})
    }
  }
})

function RouteComponent() {
  return <App/>
}
