import { createFileRoute } from '@tanstack/react-router'
import {ErrorLayout} from "#/pages/error/error-layout.tsx";

export const Route = createFileRoute('/error')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ErrorLayout/>
}
