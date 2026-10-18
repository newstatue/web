import { createFileRoute } from '@tanstack/react-router'
import { z } from "zod"
import { ResetPasswordPage } from "@/features/auth/ResetPasswordPage.tsx"

const searchSchema = z.object({
  email: z.email(),
  otp: z.string().min(1),
})


export const Route = createFileRoute('/(auth)/reset-password')({
  component: RouteComponent,
  validateSearch: searchSchema,
})

function RouteComponent() {
  return <ResetPasswordPage/>
}
