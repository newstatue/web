import { createFileRoute } from '@tanstack/react-router'
import {Register} from "#/pages/auth/register.tsx";

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Register/>
}
