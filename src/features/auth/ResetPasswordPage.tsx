import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm.tsx"
import { useSearch } from "@tanstack/react-router"

export function ResetPasswordPage() {
  const { email, otp } = useSearch({ from: "/(auth)/reset-password" })

  return <ResetPasswordForm email={email} otp={otp} />
}
