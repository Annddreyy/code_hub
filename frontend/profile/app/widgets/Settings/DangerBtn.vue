<template>
    <button class="danger-btn">{{ text }}</button>
</template>

<script setup lang="ts">
defineProps<{
    text: string;
}>();
</script>

<style lang="scss" scoped>
.danger-btn {
    flex-shrink: 0;
    padding: 6px 14px;

    font-family: var(--spaced);
    font-size: 9px;
    font-weight: 700;
    color: var(--red);

    border: 1px solid rgba(255, 92, 114, 0.3);
    border-radius: 7px;

    background: rgba(255, 92, 114, 0.06);
    cursor: pointer;

    transition: all 0.15s;

    &:hover {
        background: rgba(255, 92, 114, 0.12);
    }
}
</style>
