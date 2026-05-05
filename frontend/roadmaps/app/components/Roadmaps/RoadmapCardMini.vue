<template>
    <div class="roadmap-card-mini">
        <span class="roadmap-card-mini__icon">{{ icon }}</span>
        <div class="roadmap-card-mini__title">{{ title }}</div>
        <div class="roadmap-card-mini__nodes">{{ totalNodes }} узлов · +{{ xp }} XP</div>
        <div class="roadmap-card-mini__bar">
            <div
                class="roadmap-card-mini__fill"
                :style="`width: ${progress}%`"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const { currentNode, totalNodes } = defineProps<{
    icon: string;
    title: string;
    xp: number;
    currentNode: number;
    totalNodes: number;
}>();

const progress = computed(() => Math.floor((currentNode / totalNodes) * 100));
</script>

<style lang="scss" scoped>
.roadmap-card-mini {
    width: 200px;
    padding: 14px;
    flex-shrink: 0;

    border: 1px solid var(--b1);
    border-radius: 10px;

    background: var(--s1);
    cursor: pointer;

    transition: all 0.18s;
    animation: cardIn 0.4s ease both;

    &:hover {
        transform: translateY(-2px);
        border-color: var(--b2);
    }

    &__icon {
        display: block;
        margin-bottom: 8px;

        font-size: 20px;
    }

    &__title {
        margin-bottom: 3px;

        font-size: 12px;
        font-weight: 700;
    }

    &__nodes {
        font-family: var(--spaced);
        font-size: 9px;
        color: var(--muted);
    }

    &__bar {
        height: 3px;
        margin-top: 8px;

        border-radius: 2px;

        background: var(--s3);
        overflow: hidden;
    }

    &__fill {
        height: 100%;
        border-radius: 2px;
        background: var(--pink);
    }
}
</style>
