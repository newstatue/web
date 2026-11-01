import { Outlet } from "@tanstack/react-router"

export function CLayout() {
    return (
        <div className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6">
            <Outlet />
        </div>
    )
}