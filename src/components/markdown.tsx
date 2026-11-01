import {Code, Typography} from "@heroui/react"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

const components: Components = {
    h1: ({ children }) => (
        <Typography type="h1">{children}</Typography>
    ),
    h2: ({ children }) => (
        <Typography type="h2">{children}</Typography>
    ),
    h3: ({ children }) => (
        <Typography type="h3">{children}</Typography>
    ),
    p: ({ children }) => (
        <Typography type="body">{children}</Typography>
    ),
    code: ({ children }) => (
        <Code>{children}</Code>
    ),
    table: ({ children }) => (
        <table>{children}</table>
    ),
}

type MarkdownProps = {
    children: string
    className?: string
}

export function Markdown({ children, className }: MarkdownProps) {
    return (
        <div className={`min-w-0 space-y-4 ${className ?? ""}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                skipHtml
                components={components}
            >
                {children}
            </ReactMarkdown>
        </div>
    )
}