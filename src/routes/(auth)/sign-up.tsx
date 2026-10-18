import { createFileRoute } from '@tanstack/react-router'
import SignupPage from "@/features/auth/SignupPage.tsx"

export const Route = createFileRoute('/(auth)/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignupPage/>
}
