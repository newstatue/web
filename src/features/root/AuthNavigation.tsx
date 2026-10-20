import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"

export function AuthNavigation() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return <div className="h-9 w-20" />
  }

  if (session) {
    const user = session.user

    return (
      <Avatar>
        <AvatarImage
          src={user.image ?? undefined}
          alt={user.name}
          className="grayscale"
        />
        <AvatarFallback>
          {user.name?.slice(0, 2).toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        nativeButton={false}
        render={<Link to="/login" />}
      >
        登录
      </Button>

      <Button nativeButton={false} render={<Link to="/sign-up" />}>
        注册
      </Button>
    </div>
  )
}
