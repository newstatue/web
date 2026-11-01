import { createFileRoute } from "@tanstack/react-router"
import { C } from "#/pages/c/c.tsx"

export const Route = createFileRoute("/_authenticated/c/$slug")({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()

  return <C slug={slug} />
}