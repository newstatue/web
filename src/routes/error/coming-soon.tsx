import { createFileRoute } from '@tanstack/react-router'
import {ComingSoon} from "#/pages/error/coming-soon.tsx";

export const Route = createFileRoute('/error/coming-soon')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ComingSoon/>
}
