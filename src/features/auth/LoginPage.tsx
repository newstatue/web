import { LoginForm } from "@/features/auth/components/LoginForm.tsx"


export function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
