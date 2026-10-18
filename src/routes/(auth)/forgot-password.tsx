import { createFileRoute } from '@tanstack/react-router'
import { ForgotPasswordPage } from "@/features/auth/ForgotPasswordPage.tsx"

export const Route = createFileRoute('/(auth)/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ForgotPasswordPage/>
}
