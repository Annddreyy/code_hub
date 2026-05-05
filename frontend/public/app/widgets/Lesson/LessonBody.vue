<template>
    <section v-html="html" />
</template>

<script setup lang="ts">
defineProps<{
    html: string;
}>();
</script>

<style lang="scss" scoped>
:deep(.section) {
    margin-bottom: 40px;
    animation: fadeUp 0.4s ease both;
}

:deep(.section__header) {
    display: flex;
    align-items: center;
    gap: 10px;

    margin-bottom: 14px;
    padding-bottom: 10px;

    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.015em;

    border-bottom: 1px solid var(--b1);
}

:deep(.section__number) {
    padding: 2px 7px;

    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--blue);

    border-radius: 4px;
    background: var(--blue-dim);
}

:deep(.section__text) {
    font-size: 14px;
    line-height: 1.8;
    color: var(--text2);
}

:deep(.section__text p) {
    margin-bottom: 14px;
}

:deep(.prose strong) {
    color: var(--text);
    font-weight: 700;
}

:deep(.section__text em) {
    color: var(--muted);
    font-style: italic;
}

:deep(.section__text code) {
    padding: 2px 7px;

    font-family: var(--mono);
    font-size: 12px;
    color: var(--cyan);

    border: 1px solid var(--b2);
    border-radius: 4px;

    background: var(--s2);
}

:deep(.section__text ul),
:deep(.section__text ol) {
    margin-bottom: 14px;
    padding-left: 22px;
}

:deep(.section__text li) {
    margin-bottom: 7px;

    color: var(--text2);
}

:deep(.section__text ul li::marker) {
    color: var(--blue);
}

:deep(.box) {
    display: flex;
    gap: 14px;

    margin: 20px 0;
    padding: 16px 18px;

    font-size: 13px;
    line-height: 1.65;

    border-radius: 10px;
}

:deep(.box--info) {
    background: rgba(79, 156, 255, 0.05);
    border: 1px solid rgba(79, 156, 255, 0.18);
}

:deep(.box--tip) {
    background: rgba(63, 185, 80, 0.05);
    border: 1px solid rgba(63, 185, 80, 0.18);
}

:deep(.box--warn) {
    background: rgba(227, 179, 65, 0.05);
    border: 1px solid rgba(227, 179, 65, 0.18);
}

:deep(.box__ico) {
    flex-shrink: 0;
    margin-top: 1px;

    font-size: 17px;
}

:deep(.box__body) {
    flex: 1;
    color: var(--text2);
}

:deep(.box__body strong) {
    color: var(--blue);
}

:deep(.box--tip .box__body strong) {
    color: var(--green);
}

:deep(.box--warn .box__body strong) {
    color: var(--yellow);
}

:deep(.table-wrap) {
    margin: 16px 0 20px;

    border: 1px solid var(--b1);
    border-radius: 10px;

    overflow-x: auto;
}

:deep(.table) {
    width: 100%;

    font-size: 13px;
    border-collapse: collapse;
}

:deep(.table th) {
    padding: 10px 14px;

    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: left;
    color: var(--muted);

    border-bottom: 1px solid var(--b2);
    background: var(--s2);
}

:deep(.table td) {
    padding: 11px 14px;

    vertical-align: top;
    border-bottom: 1px solid var(--b1);
}

:deep(.table tr:last-child td) {
    border-bottom: none;
}

:deep(.table tr:hover td) {
    background: rgba(255, 255, 255, 0.018);
}

:deep(.td__prop) {
    font-family: var(--mono);
    font-size: 12px;
    white-space: nowrap;
    color: var(--cyan);
}

:deep(.td__val) {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--purple);
}

:deep(.td__descrition) {
    font-size: 12px;
    line-height: 1.5;
    color: var(--muted);
}

:deep(.td__default) {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--yellow);
}

:deep(.editor) {
    margin: 20px 0;

    border: 1px solid var(--b1);
    border-radius: 12px;

    background: var(--s1);

    overflow: hidden;
}

:deep(.editor:hover) {
    border-color: var(--b2);
    transition: border-color 0.2s;
}

:deep(.editor__bar) {
    height: 38px;
    padding: 0 14px;

    display: flex;
    align-items: center;
    gap: 8px;

    border-bottom: 1px solid var(--b1);
    background: var(--s2);
}

:deep(.editor__dots) {
    display: flex;
    gap: 5px;
}

:deep(.editor__dot) {
    width: 10px;
    height: 10px;

    border-radius: 50%;
}

:deep(.editor__dot--red) {
    background: rgba(255, 92, 114, 0.65);
}

:deep(.editor__dot--yellow) {
    background: rgba(227, 179, 65, 0.65);
}

:deep(.editor__dot--green) {
    background: rgba(63, 185, 80, 0.65);
}

:deep(.editor__name) {
    flex: 1;

    font-family: 'Space Mono', monospace;
    font-size: 10px;
    text-align: center;
    color: var(--muted);
}

:deep(.editor__lang-tag) {
    padding: 2px 8px;

    font-family: 'Space Mono', monospace;
    font-size: 8px;
    font-weight: 700;
    color: var(--blue);

    border-radius: 3px;
    background: var(--blue-dim);
}

:deep(.editor__copy) {
    padding: 3px 9px;

    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: var(--muted);

    border: 1px solid var(--b2);
    border-radius: 4px;

    background: transparent;
    cursor: pointer;

    transition: all 0.15s;
}

:deep(.editor__copy:hover) {
    color: var(--text);
    border-color: var(--b3);
}

:deep(.editor__copy.copied) {
    color: var(--green);
    border-color: rgba(63, 185, 80, 0.3);
}

:deep(.editor__split) {
    display: flex;
    min-height: 140px;
}

:deep(.editor__code-side) {
    min-width: 0;

    display: flex;
    flex: 1;

    border-right: 1px solid var(--b1);
    overflow: hidden;
}

:deep(.ln) {
    width: 42px;
    padding: 14px 8px 14px 0;

    flex-shrink: 0;

    font-family: var(--mono);
    font-size: 12px;
    line-height: 1.7;
    text-align: right;
    color: var(--dimmer);

    border-right: 1px solid rgba(255, 255, 255, 0.04);

    background: rgba(0, 0, 0, 0.15);
    user-select: none;
    overflow: hidden;
}

:deep(.code) {
    padding: 14px 18px;
    flex: 1;

    font-family: var(--mono);
    font-size: 12.5px;
    line-height: 1.7;

    overflow-x: auto;
    cursor: text;
}

:deep(.code::-webkit-scrollbar) {
    height: 4px;
}

:deep(.code::-webkit-scrollbar-thumb) {
    background: var(--s3);
}

:deep(.kw) {
    color: #ff7b72;
}

:deep(.fn) {
    color: #d2a8ff;
}

:deep(.st) {
    color: #a5d6ff;
}

:deep(.nm) {
    color: #79c0ff;
}

:deep(.cm) {
    color: #6e7681;
    font-style: italic;
}

:deep(.cl) {
    color: #ffa657;
}

:deep(.op) {
    color: #ff7b72;
}

:deep(.vr) {
    color: #e6edf3;
}

:deep(.sl) {
    color: #ffa657;
}

:deep(.pr) {
    color: #79c0ff;
}

:deep(.vl) {
    color: #a5d6ff;
}

:deep(.un) {
    color: #ff7b72;
}

:deep(.ps) {
    color: #d2a8ff;
}

:deep(.line) {
    display: flex;
    min-height: 21.4px;

    border-radius: 2px;
}

:deep(.line:hover) {
    background: rgba(255, 255, 255, 0.025);
}

:deep(.line.hl) {
    background: rgba(79, 156, 255, 0.08);
    border-left: 2px solid var(--blue);
}

:deep(.editor__prev-side) {
    width: 320px;

    display: flex;
    flex-direction: column;
    flex-shrink: 0;
}

:deep(.epv-hdr) {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 8px 12px;

    border-bottom: 1px solid var(--b1);
    background: var(--s2);
}

:deep(.epv-lbl) {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
}

:deep(.epv-run) {
    display: flex;
    align-items: center;
    gap: 5px;

    padding: 4px 12px;

    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    color: #000;

    border: none;
    border-radius: 5px;

    cursor: pointer;
    background: var(--green);

    transition: all 0.15s;
}

:deep(.epv-run:hover) {
    background: #4dcf61;
    transform: translateY(-1px);
}

:deep(.epv-canvas) {
    padding: 14px;
    flex: 1;

    font-family: Arial, sans-serif;
    font-size: 13px;

    background: #fff;
    overflow: auto;
}

:deep(.dv-row) {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    margin-bottom: 8px;
}

:deep(.dv-box) {
    padding: 10px 16px;

    font-size: 12px;
    font-weight: 700;
    color: #fff;

    border-radius: 5px;
}

:deep(.dv-b) {
    background: #4f9cff;
}

:deep(.dv-g) {
    background: #3fb950;
}

:deep(.dv-p) {
    background: #bc8cff;
}

:deep(.dv-o) {
    background: #ff8c42;
}

:deep(.editor__foot) {
    padding: 10px 14px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-top: 1px solid var(--b1);
    background: var(--s2);
}

:deep(.try-btn) {
    padding: 6px 14px;

    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    color: var(--blue);

    border: 1px solid rgba(79, 156, 255, 0.25);
    border-radius: 5px;

    background: rgba(79, 156, 255, 0.1);
    cursor: pointer;

    transition: all 0.15s;
}

:deep(.try-btn:hover) {
    transform: translateX(2px);
    background: rgba(79, 156, 255, 0.2);
}

:deep(.edb-hint) {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: var(--dimmer);
}

:deep(.quiz) {
    margin: 24px 0;
    padding: 22px;

    border: 1px solid rgba(188, 140, 255, 0.18);
    border-radius: 12px;

    background: rgba(188, 140, 255, 0.04);
}

:deep(.quiz__lbl) {
    display: flex;
    align-items: center;
    gap: 6px;

    margin-bottom: 10px;

    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--purple);
}

:deep(.quiz__question) {
    margin-bottom: 16px;

    font-size: 15px;
    font-weight: 700;
    line-height: 1.5;
}

:deep(.quiz__opts) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

:deep(.quiz__opt) {
    padding: 11px 14px;

    display: flex;
    align-items: center;
    gap: 10px;

    font-size: 13px;

    border: 1px solid var(--b1);
    border-radius: 8px;

    background: var(--s2);

    cursor: pointer;
    user-select: none;

    transition: all 0.15s;
}

:deep(.quiz__opt:hover) {
    border-color: var(--b2);
    background: var(--s3);
}

:deep(.quiz__opt--ok) {
    color: var(--green);
    border-color: rgba(63, 185, 80, 0.4);
    background: rgba(63, 185, 80, 0.07);
}

:deep(.quiz__opt--no) {
    color: var(--red);
    border-color: rgba(255, 92, 114, 0.4);
    background: rgba(255, 92, 114, 0.06);
}

:deep(.quiz__letter) {
    width: 22px;
    height: 22px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;

    border-radius: 5px;
    background: var(--s3);
}

@media (max-width: 1220px) {
    :deep(.ln) {
        display: none;
    }
}

@media (max-width: 768px) {
    :deep(.editor__split) {
        flex-direction: column;
    }

    :deep(.editor__prev-side) {
        width: 100%;
    }

    :deep(.editor__name) {
        display: none;
    }

    :deep(.editor__lang-tag) {
        display: none;
    }

    :deep(.quiz__opts) {
        grid-template-columns: 1fr;
    }
}
</style>
