<template>
    <div class="code-area">
        <div class="code-area__line-nums">
            <span
                v-for="(_, index) in linesCount"
                :key="index"
                class="code-area__line"
            >
                {{ index + 1 }}
            </span>
        </div>

        <div class="code-area__code-scroll">
            <pre
                ref="editableCode"
                class="code-area__editable-code"
                contenteditable="true"
                @input="highlightCode"
                @keydown.enter.prevent="insertNewline"
                v-html="highlightedCode"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js';

import githubDark from 'highlight.js/styles/github-dark.css?inline';
import docco from 'highlight.js/styles/docco.css?inline';
import atomOneDark from 'highlight.js/styles/atom-one-dark.css?inline';
import vs2015 from 'highlight.js/styles/vs2015.css?inline';
import monokai from 'highlight.js/styles/monokai.css?inline';

const { language, template, codeTheme } = defineProps<{
    language: string;
    template: string;
    codeTheme: string;
}>();

const isMounted = ref(false);
const highlightedCode = ref('');

const editableCode = useTemplateRef('editableCode');

const linesCount = computed(() => highlightedCode.value.split('\n').length);
const rawCode = ref('');

const themeMap: Record<string, string> = {
    'github-dark': githubDark,
    docco: docco,
    'atom-one-dark': atomOneDark,
    vs2015: vs2015,
    monokai: monokai,
};

let styleEl: HTMLStyleElement | null = null;

const loadTheme = (theme: string) => {
    const css = themeMap[theme] ?? themeMap['github-dark'];

    if (!styleEl) {
        styleEl = document.createElement('style');
        document.head.appendChild(styleEl);
    }

    if (css) {
        styleEl.textContent = css;
    }
};

watch(
    () => template,
    async () => {
        highlightedCode.value = template;
        // FIXME: Временное решение, подумать как решить нормально
        await nextTick();
        await nextTick();
        highlightCode();
    },
    { immediate: true },
);

watch(
    [() => codeTheme, isMounted],
    (newVal) => {
        if (isMounted.value) {
            loadTheme(newVal[0]);
        }
    },
    { immediate: true },
);

onMounted(() => {
    isMounted.value = true;
});

const getCaretOffset = (element: HTMLElement): number => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return 0;

    const range = selection.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(element);
    preRange.setEnd(range.endContainer, range.endOffset);
    return preRange.toString().length;
};

const setCaretOffset = (element: HTMLElement, offset: number) => {
    const selection = window.getSelection();
    if (!selection) return;

    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let remaining = offset;
    let node: Text | null = null;

    while (walker.nextNode()) {
        const textNode = walker.currentNode as Text;
        if (remaining <= textNode.length) {
            node = textNode;
            break;
        }
        remaining -= textNode.length;
    }

    if (!node) return;

    const range = document.createRange();
    range.setStart(node, remaining);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
};

const applyHighlight = async (offset: number) => {
    if (!editableCode.value) return;

    const rawText = editableCode.value.textContent || '';

    const textForHljs = rawText.endsWith('\n') ? rawText + ' ' : rawText;

    highlightedCode.value = hljs.highlight(textForHljs, {
        language,
        ignoreIllegals: true,
    }).value;

    await nextTick();
    if (editableCode.value) {
        setCaretOffset(editableCode.value, offset);
        rawCode.value = editableCode.value.textContent ?? '';
    }
};

function highlightCode() {
    if (!editableCode.value) return;
    const offset = getCaretOffset(editableCode.value);
    applyHighlight(offset);
}

const insertNewline = () => {
    if (!editableCode.value) return;

    const offset = getCaretOffset(editableCode.value);
    const rawText = editableCode.value.textContent || '';

    const newText = rawText.slice(0, offset) + '\n' + rawText.slice(offset);

    editableCode.value.textContent = newText;

    applyHighlight(offset + 1);
};

defineExpose({
    rawCode,
});
</script>

<style lang="scss" scoped>
.code-area {
    display: flex;

    font-family: 'Courier New', 'Fira Code', 'Consolas', monospace;
    font-size: 14px;
    line-height: 1.5;

    border-radius: 8px;
    background: #1e1e1e;

    overflow: auto;

    &::-webkit-scrollbar {
        width: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: #424242;
    }

    &__line-nums {
        position: relative;

        min-width: 45px;
        max-height: 400px;
        padding: 12px 8px;

        display: flex;
        flex-direction: column;

        text-align: right;

        border-right: 1px solid #3e3e42;
        background: #1e1e1e;

        user-select: none;

        z-index: 1;
    }

    &__line {
        display: block;
        padding: 0 4px;

        font-family: monospace;
        font-size: 14px;
        line-height: 1.5;
        color: #858585;
    }

    &__editable-code {
        min-height: 100%;
        margin: 0;
        padding: 12px;

        font-family: inherit;
        font-size: inherit;
        white-space: pre-wrap;
        line-height: inherit;

        outline: none;
        background: #1e1e1e;

        code {
            display: block;
            font-family: inherit;
        }

        &:focus-visible {
            outline: 1px solid #ffd700;
            outline-offset: -1px;
        }
    }

    &__code-scroll {
        flex-grow: 1;
    }
}

@media (max-width: 768px) {
    .code-area {
        min-height: 100px;
    }
}
</style>
