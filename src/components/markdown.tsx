import { CodeBlock } from "@heroui-pro/react/code-block"
import {Code, type CodeProps, Table, Typography} from "@heroui/react"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import {
    Children,
    isValidElement,
    type CSSProperties,
    type ReactElement,
    type ReactNode,
} from "react"


type ElementProps = {
    children?: ReactNode
    style?: CSSProperties
}

function getElements(children: ReactNode) {
    return Children.toArray(children).filter(
        (child): child is ReactElement<ElementProps> =>
            isValidElement<ElementProps>(child),
    )
}

function getText(children: ReactNode): string {
    return Children.toArray(children)
        .map((child): string =>
            isValidElement<ElementProps>(child)
                ? getText(child.props.children)
                : String(child),
        )
        .join("")
}

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
    // 行内代码
    code: ({ children }) => (
        <Code>{children}</Code>
    ),

    // 围栏代码块和缩进代码块
    pre: function MarkdownPre({ children }) {
        const codeElement = isValidElement<CodeProps>(children) ? children : null
        const code = String(codeElement?.props.children ?? "").replace(/\n$/, "")
        const language = /language-(\S+)/.exec(codeElement?.props.className ?? "")?.[1]

        if (!codeElement) {
            return <pre>{children}</pre>
        }
        return (
            <CodeBlock>
                <CodeBlock.Header>
                    <span className="text-xs text-muted">{language ?? "代码"}</span>
                    <CodeBlock.CopyButton code={code} aria-label="复制代码" />
                </CodeBlock.Header>
                <CodeBlock.Code code={code} language={language ?? "plaintext"} />
            </CodeBlock>
        )
    },
    table: ({ children }) => {
        const sections = getElements(children)

        const thead = sections.find((element) => element.type === "thead")
        const tbody = sections.find((element) => element.type === "tbody")

        const headerRow = getElements(thead?.props.children)[0]
        const columns = getElements(headerRow?.props.children)
        const rows = getElements(tbody?.props.children)

        return (
            <Table className="w-full">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Markdown 表格">
                        <Table.Header>
                            {columns.map((column, index) => (
                                <Table.Column
                                    key={index}
                                    id={`column-${index}`}
                                    isRowHeader={index === 0}
                                    textValue={getText(column.props.children)}
                                    style={column.props.style}
                                >
                                    {column.props.children}
                                </Table.Column>
                            ))}
                        </Table.Header>

                        <Table.Body>
                            {rows.map((row, rowIndex) => (
                                <Table.Row
                                    key={rowIndex}
                                    id={`row-${rowIndex}`}
                                >
                                    {getElements(row.props.children).map(
                                        (cell, cellIndex) => (
                                            <Table.Cell
                                                key={cellIndex}
                                                style={cell.props.style}
                                            >
                                                {cell.props.children}
                                            </Table.Cell>
                                        ),
                                    )}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        )
    },
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