<template>
    <select
        class="setting-select"
        @change="onChange"
    >
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            :selected="option.value === currentValue"
        >
            {{ option.title }}
        </option>
    </select>
</template>

<script setup lang="ts">
defineProps<{
    options: {
        value: string;
        title: string;
    }[];
    currentValue: string;
    onChange: () => void;
}>();
</script>

<style lang="scss" scoped>
.setting-select {
    padding: 7px 12px;

    font-family: var(--spaced);
    font-size: 10px;
    color: var(--text);

    outline: none;
    border: 1px solid var(--b1);
    border-radius: 7px;

    background: var(--s2);

    cursor: pointer;
}
</style>
