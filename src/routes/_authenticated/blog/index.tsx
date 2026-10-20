import { createFileRoute } from '@tanstack/react-router'
import { BlogPage } from "@/features/blog/BlogPage.tsx"

export const Route = createFileRoute('/_authenticated/blog/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BlogPage/>
}
