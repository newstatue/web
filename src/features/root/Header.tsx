import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Logo } from "@/features/root/Logo.tsx"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <Logo />
          <span>Evorsio</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="outline" render={<Link to="/login">登录</Link>} />
          <Button render={<Link to="/sign-up">注册</Link>} />
        </div>
      </div>
    </header>
  )
}
