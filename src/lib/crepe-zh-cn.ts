import { Crepe } from "@milkdown/crepe"

export const crepeZhCN = {
    [Crepe.Feature.BlockEdit]: {
        textGroup: {
            label: "文本",
            text: { label: "正文" },
            h1: { label: "一级标题" },
            h2: { label: "二级标题" },
            h3: { label: "三级标题" },
            quote: { label: "引用" },
            divider: { label: "分割线" },
        },
        listGroup: {
            label: "列表",
            bulletList: { label: "无序列表" },
            orderedList: { label: "有序列表" },
            taskList: { label: "任务列表" },
        },
        advancedGroup: {
            label: "高级",
            image: { label: "图片" },
            codeBlock: { label: "代码块" },
            table: { label: "表格" },
            math: { label: "数学公式" },
        },
    },
    [Crepe.Feature.Toolbar]: {
        boldLabel: "加粗",
        italicLabel: "斜体",
        strikethroughLabel: "删除线",
        codeLabel: "行内代码",
        linkLabel: "链接",
        latexLabel: "公式",
    },
    [Crepe.Feature.Placeholder]: {
        text: "开始输入正文...",
    },
    [Crepe.Feature.ImageBlock]: {
        blockUploadPlaceholderText: "上传图片或粘贴链接",
        inlineUploadPlaceholderText: "上传图片或粘贴链接",
    },
    [Crepe.Feature.CodeMirror]: {
        searchPlaceholder: "搜索编程语言",
        noResultText: "没有找到匹配的语言",
        copyText: "复制",
    },
}