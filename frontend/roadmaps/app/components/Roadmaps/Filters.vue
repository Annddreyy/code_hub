<template>
    <div class="filters">
        <button
            class="filters__chip"
            @click="$emit('selectFilter', undefined)"
        >
            Все
        </button>
        <button
            v-for="filter in filters"
            :key="filter"
            :class="['filters__chip', { 'filters__chip--active': selectedFilter === filter }]"
            @click="$emit('selectFilter', filter)"
        >
            {{ filter }}
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    filters: string[];
}>();

defineEmits<{
    selectFilter: [filter: string | undefined];
}>();

const selectedFilter = ref<string | undefined>(undefined);
</script>

<style lang="scss" scoped>
.filters {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;

    margin-bottom: 20px;

    &__chip {
        padding: 6px 14px;

        font-family: var(--spaced);
        font-size: 9px;
        font-weight: 700;
        color: var(--muted);

        border: 1px solid var(--b2);
        border-radius: 20px;

        background: transparent;
        cursor: pointer;

        transition: all 0.2s;

        &:hover {
            color: var(--text);
            border-color: var(--b3);
        }

        &--active {
            color: var(--blue);
            border-color: rgba(79, 156, 255, 0.4);
            background: rgba(79, 156, 255, 0.07);
        }
    }
}
</style>
