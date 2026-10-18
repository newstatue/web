import { OtpForm } from "@/features/auth/components/OtpForm.tsx"
import { useSearch } from "@tanstack/react-router"

export function OtpPage() {
  const { email, type } = useSearch({ from: "/(auth)/otp" })
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <OtpForm email={email} type={type} />
      </div>
    </div>
  )
}
