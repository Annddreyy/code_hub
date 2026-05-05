<template>
    <SectionWrapper section-title="Карта активности — Последние 6 месяцев">
        <div class="heatmap">
            <div class="heatmap__grid">
                <div
                    v-for="(cell, index) in cells"
                    :key="index"
                    :class="['heatmap__cell', `heatmap__cell--l${cell.level}`]"
                    :title="`${cell.contributions} вкладов`"
                />
            </div>
            <div
                class="heatmap__legend"
                style="margin-top: 8px"
            >
                Меньше
                <div class="heatmap__legend-cells">
                    <div
                        v-for="level in 5"
                        :key="level"
                        :class="['heatmap__legend-cell', `heatmap__legend-cell--l${level}`]"
                    />
                </div>
                Больше
            </div>
        </div>
    </SectionWrapper>
</template>

<script setup lang="ts">
import type { HeatmapCell } from '@/entities/user';
import SectionWrapper from './SectionWrapper.vue';

defineProps<{
    cells: HeatmapCell[];
}>();
</script>

<style lang="scss" scoped>
.heatmap {
    &__grid {
        width: max-content;

        display: grid;
        grid-template-columns: repeat(26, 1fr);
        gap: 3px;
    }

    &__cell {
        width: 25px;
        height: 25px;

        aspect-ratio: 1;
        border-radius: 2px;

        background: var(--s3);
        transition: transform 0.1s;
        cursor: pointer;

        &:hover {
            transform: scale(1.2);
        }

        &--l1 {
            background: var(--s3);
        }

        &--l2 {
            background: rgba(63, 185, 80, 0.2);
        }

        &--l3 {
            background: rgba(63, 185, 80, 0.4);
        }

        &--l4 {
            background: rgba(63, 185, 80, 0.6);
        }

        &--l5 {
            background: rgba(63, 185, 80, 0.85);
        }
    }

    &__legend {
        display: flex;
        align-items: center;
        gap: 4px;

        margin-top: 8px;

        font-family: var(--sm);
        font-size: 8px;
        color: var(--muted);
    }

    &__legend-cells {
        display: flex;
        gap: 2px;
    }

    .heatmap__legend-cell {
        width: 10px;
        height: 10px;

        border-radius: 1px;

        &--l1 {
            background: var(--s3);
        }

        &--l2 {
            background: rgba(63, 185, 80, 0.2);
        }

        &--l3 {
            background: rgba(63, 185, 80, 0.4);
        }

        &--l4 {
            background: rgba(63, 185, 80, 0.6);
        }

        &--l5 {
            background: rgba(63, 185, 80, 0.85);
        }
    }
}

@media (max-width: 1220px) {
    .heatmap {
        &__cell {
            width: clamp(10px, 1.5vw, 25px);
            height: clamp(10px, 1.5vw, 25px);
        }
    }
}

@media (max-width: 768px) {
    .heatmap {
        &__grid {
            grid-template-columns: repeat(20, 1fr);
        }
    }
}
</style>
