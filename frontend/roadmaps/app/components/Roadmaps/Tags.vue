<template>
    <div class="tags">
        <button
            class="tags__chip"
            @click="$emit('selectTag', null)"
        >
            Все
        </button>
        <button
            v-for="tag in tags"
            :key="tag.id"
            :class="['tags__chip', { 'tags__chip--active': selectedTag === tag.title }]"
            @click="selectTag(tag.title)"
        >
            {{ tag.title }}
        </button>
    </div>
</template>

<script setup lang="ts">
import type { Tag } from '@/api/roadmap';

defineProps<{
    tags: Tag[];
}>();

const emit = defineEmits<{
    selectTag: [tag: string | null];
}>();

const selectedTag = ref<string | null>(null);

const selectTag = (tag: string) => {
    selectedTag.value = tag;
    emit('selectTag', tag);
};
</script>

<style lang="scss" scoped>
.tags {
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
