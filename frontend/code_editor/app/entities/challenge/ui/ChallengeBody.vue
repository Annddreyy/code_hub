<template>
    <div
        class="prob-body"
        v-html="html"
    />
</template>

<script setup lang="ts">
defineProps<{
    html: string;
}>();
</script>

<style lang="scss" scoped>
.prob-body {
    flex: 1;
    overflow-y: auto;
    padding: 18px 20px;
}

:deep(.prob-body::-webkit-scrollbar) {
    width: 3px;
}

:deep(.prob-body::-webkit-scrollbar-thumb) {
    background: var(--s3);
}

:deep(.prob-section) {
    margin-bottom: 20px;
}

:deep(.prob-h) {
    font-family: var(--spaced);
    font-size: 8px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--dim);
    margin-bottom: 8px;
}

:deep(.prob-text) {
    font-size: 13px;
    line-height: 1.65;
    color: var(--text);
}

:deep(.prob-text code) {
    font-family: var(--mono);
    font-size: 11px;
    background: var(--s2);
    padding: 1px 5px;
    border-radius: 3px;
    color: var(--cyan);
}

:deep(.example) {
    background: var(--s2);
    border: 1px solid var(--b1);
    border-radius: 9px;
    padding: 13px 15px;
    margin-bottom: 8px;
}

:deep(.ex-label) {
    font-family: var(--spaced);
    font-size: 8px;
    color: var(--dim);
    margin-bottom: 6px;
}

:deep(.ex-row) {
    font-family: var(--mono);
    font-size: 11px;
    margin-bottom: 3px;
}

:deep(.ex-key) {
    color: var(--muted);
}

:deep(.ex-val) {
    color: var(--text);
}

:deep(.ex-expl) {
    font-size: 11px;
    color: var(--muted);
    margin-top: 6px;
    line-height: 1.5;
}

:deep(.constraint) {
    font-family: var(--mono);
    font-size: 11px;
    margin-bottom: 4px;
    padding-left: 12px;
    position: relative;
    color: var(--muted);
}

:deep(.constraint::before) {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--dim);
}

:deep(.constraint code) {
    font-size: 11px;
    color: var(--cyan);
    background: var(--s2);
    padding: 1px 4px;
    border-radius: 2px;
}

:deep(.stat-row) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
}

:deep(.sr-label) {
    font-family: var(--spaced);
    font-size: 9px;
    color: var(--muted);
}

:deep(.sr-val) {
    font-family: var(--spaced);
    font-size: 9px;
    font-weight: 700;
}
</style>
