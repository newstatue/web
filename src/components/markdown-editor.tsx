import { useCallback, useEffect, useRef } from "react"
import { Crepe } from "@milkdown/crepe"
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react"
import { Surface } from "@heroui/react"

import "@milkdown/crepe/theme/common/style.css"
import "@milkdown/crepe/theme/frame.css"
import {crepeZhCN} from "#/lib/crepe-zh-cn.ts";

type Props = {
    onChange: (markdown: string) => void
}

function Editor({ onChange }: Props) {
    const onChangeRef = useRef(onChange)

    useEffect(() => {
        onChangeRef.current = onChange
    }, [onChange])

    const createEditor = useCallback(
        (root: HTMLElement) => {
            const crepe = new Crepe({
                root,
                defaultValue: "",
                featureConfigs: crepeZhCN,
            })

            crepe.on((listener) => {
                listener.markdownUpdated((_, markdown) => {
                    onChangeRef.current(markdown)
                })
            })

            return crepe
        },
        [],
    )

    useEditor(createEditor)

    return <Milkdown />
}

export function MarkdownEditor({ onChange }: Props) {
    return (
        <MilkdownProvider>
            <Surface
                variant="secondary"
                className="flex w-full min-w-0 flex-col"
            >
                <Editor onChange={onChange} />
            </Surface>
        </MilkdownProvider>
    )
}