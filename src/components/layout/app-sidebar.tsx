import { authClient } from "@/lib/auth-client.ts"
import { useLayout } from "@/context/layout-provider"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import { AppTitle } from "./app-title"
import { sidebarData } from "./data/sidebar-data"
import { NavGroup } from "./nav-group"
import { NavUser } from "./nav-user"

// import { TeamSwitcher } from "./team-switcher"

export function AppSidebar() {
  const { collapsible, variant } = useLayout()

  const { data, isPending } = authClient.useSession()
  const user = data?.user
  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        {/*<TeamSwitcher teams={sidebarData.teams} />*/}
        {/* Replace <TeamSwitch /> with the following <AppTitle />
         /* if you want to use the normal app title instead of TeamSwitch dropdown */}
        <AppTitle />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        {isPending || !user ? (
          <Skeleton className="h-12 w-full rounded-md" />
        ) : (
          <NavUser
            user={{
              name: user.name,
              email: user.email,
              avatar: user.image ?? "",
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
