import { createFileRoute } from '@tanstack/react-router'
import {CLayout} from "#/pages/c/c-layout.tsx";

export const Route = createFileRoute('/_authenticated/c')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CLayout/>
}
