import { createFileRoute } from '@tanstack/react-router'
import { LoginPage } from "@/features/auth/LoginPage.tsx"

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginPage/>
}
