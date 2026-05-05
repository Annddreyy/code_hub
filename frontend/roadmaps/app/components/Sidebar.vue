<template>
    <aside class="left-panel">
        <div class="left-panel__head">
            <div class="left-panel__title">{{ roadmapTitle }}</div>
            <div class="left-panel__progress">
                <div class="left-panel__prog-row">
                    <span class="left-panel__prog-label">Ваш прогресс</span>
                    <span class="left-panel__prog-val"
                        >{{ currentNode }} / {{ totalNodesCount }} узлов</span
                    >
                </div>
                <div class="prog-bar">
                    <div
                        class="prog-bar__fill"
                        :style="`width: ${progress}%`"
                    />
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
const { currentNode, totalNodesCount } = defineProps<{
    roadmapTitle: string;
    currentNode: number;
    totalNodesCount: number;
}>();

const progress = computed(() => {
    if (!totalNodesCount || totalNodesCount === 0) return 0;
    return (currentNode / totalNodesCount) * 100;
});
</script>

<style lang="scss" scoped>
.left-panel {
    width: 260px;

    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    border-right: 1px solid var(--b1);
    background: var(--s1);

    overflow: hidden;

    &__head {
        padding: 20px 18px 14px;
        border-bottom: 1px solid var(--b1);
    }

    &__title {
        margin-bottom: 3px;

        font-size: 18px;
        font-weight: 800;
        letter-spacing: -0.02em;
    }

    &__progress {
        margin-top: 12px;
    }

    &__prog-row {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 5px;
    }

    &__prog-label {
        font-family: var(--spaced);
        font-size: 9px;
        color: var(--muted);
    }

    &__prog-val {
        font-family: var(--spaced);
        font-size: 9px;
        font-weight: 700;
        color: var(--green);
    }
}

.prog-bar {
    height: 4px;

    border-radius: 2px;
    background: var(--s3);

    overflow: hidden;

    &__fill {
        height: 100%;

        border-radius: 2px;
        background: linear-gradient(90deg, var(--green), var(--cyan));

        transition: width 0.5s ease;
    }
}

@media (max-width: 1220px) {
    .left-panel {
        width: 100%;
    }
}
</style>
