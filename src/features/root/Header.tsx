import { Link } from "@tanstack/react-router"
import { Logo } from "@/features/root/Logo.tsx"
import { AuthNavigation } from "@/features/root/AuthNavigation.tsx"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <Logo />
          <span>Evorsio</span>
        </Link>

        <AuthNavigation />
      </div>
    </header>
  )
}
