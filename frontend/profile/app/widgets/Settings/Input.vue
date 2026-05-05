<template>
    <input
        class="setting-input"
        :name
        :value
    />
</template>

<script setup lang="ts">
defineProps<{
    value: string;
    name: string;
}>();
</script>

<style lang="scss" scoped>
.setting-input {
    width: 160px;
    padding: 7px 12px;

    font-family: var(--mono);
    font-size: 12px;
    color: var(--text);

    outline: none;
    border: 1px solid var(--b1);
    border-radius: 7px;

    background: var(--s2);

    transition: border-color 0.2s;

    &:focus {
        border-color: var(--blue);
    }
}
</style>
