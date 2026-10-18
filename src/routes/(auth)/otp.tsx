import { createFileRoute } from '@tanstack/react-router'
import { OtpPage } from "@/features/auth/OtpPage.tsx"
import { z } from "zod"

const searchSchema = z.object({
  email: z.email(),
  type: z.enum(["signup", "forgot-password"]),
})

export const Route = createFileRoute('/(auth)/otp')({
  component: RouteComponent,
  validateSearch: searchSchema,
})

function RouteComponent() {
  return <OtpPage/>
}
