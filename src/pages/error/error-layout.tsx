import { Outlet } from "@tanstack/react-router"

export function ErrorLayout() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Outlet />
        </div>
    )
}