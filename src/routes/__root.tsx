import { Outlet, createRootRoute } from "@tanstack/react-router"
import { Header } from "@/features/root/Header.tsx"
import { Toaster } from "@/components/ui/toast.tsx"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </main>
      <Toaster/>
    </div>
  )
}
