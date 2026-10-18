import { type SVGProps } from "react"
import { cn } from "@/lib/utils"

export function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="evorsio-logo"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      width="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-6", className)}
      {...props}
    >
      <title>Evorsio</title>
      <path d="M10 22v-8" />
      <path d="M2.336 8.89 10 14l11.715-7.029" />
      <path d="M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z" />
    </svg>
  )
}
