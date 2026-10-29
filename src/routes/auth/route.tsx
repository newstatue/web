import {createFileRoute} from '@tanstack/react-router'
import {AuthLayout} from "#/pages/auth/auth-layout.tsx";

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthLayout/>;
}
