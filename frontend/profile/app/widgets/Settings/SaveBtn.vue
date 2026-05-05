<template>
    <button class="save-btn">{{ text }}</button>
</template>

<script setup lang="ts">
defineProps<{
    text: string;
}>();
</script>

<style lang="scss" scoped>
.save-btn {
    position: relative;

    margin: 16px 20px 8px;
    padding: 11px 28px;

    font-family: var(--sans);
    font-size: 13px;
    font-weight: 700;
    color: #fff;

    border: none;
    border-radius: 9px;

    background: linear-gradient(135deg, var(--blue), #3d7de8);
    overflow: hidden;
    cursor: pointer;

    transition: all 0.2s;

    &::after {
        position: absolute;
        content: '';
        inset: 0;

        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        background-size: 200%;

        animation: shimmer 2s infinite;
    }

    &:hover {
        transform: translateY(-1px);

        box-shadow: 0 6px 20px rgba(79, 156, 255, 0.35);
    }
}
</style>
