import { z } from "zod"
import { createFileRoute } from "@tanstack/react-router"
import { Otp } from "@/features/auth/otp"

const searchSchema = z.object({
  email: z.email(),
  type: z.enum(["signup", "forgot-password"]),
})

export const Route = createFileRoute("/(auth)/otp")({
  component: Otp,
  validateSearch: searchSchema,
})
