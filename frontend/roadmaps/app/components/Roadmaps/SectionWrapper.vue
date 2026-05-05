<template>
    <section>
        <h2 class="section-title">// {{ title }}</h2>
        <slot />
    </section>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<style lang="scss" scoped>
.section-title {
    display: flex;
    align-items: center;
    gap: 10px;

    margin-bottom: 12px;
    padding-top: 4px;

    font-family: var(--spaced);
    font-size: 8px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--dim);

    &::after {
        content: '';
        flex: 1;
        height: 1px;

        background: var(--b1);
    }
}
</style>
