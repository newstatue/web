import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm.tsx"
import { useSearch } from "@tanstack/react-router"

export function ResetPasswordPage() {
  const { email, otp } = useSearch({ from: "/(auth)/reset-password" })

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetPasswordForm email={email} otp={otp} />
      </div>
    </div>
  )
}
