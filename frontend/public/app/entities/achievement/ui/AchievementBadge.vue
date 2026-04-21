<template>
    <div
        :class="[
            'achievement',
            {
                'achievement--earned': userMeta.earnedDate,
                'achievement--locked': !userMeta.earnedDate,
            },
        ]"
    >
        <div class="achievement__icon">{{ icon }}</div>
        <div class="achievement__name">{{ title }}</div>
        <div class="achievement__glow" />
    </div>
</template>

<script setup lang="ts">
import type { Achievement } from '../model/achievement';

defineProps<Achievement>();
</script>

<style lang="scss" scoped>
.achievement {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3px;

    border: 1px solid var(--b1);
    border-radius: 9px;

    aspect-ratio: 1;
    background: var(--s2);

    cursor: pointer;
    transition: all 0.18s;

    &:hover {
        transform: translateY(-2px);
        border-color: var(--b2);
    }

    &--earned {
        border-color: rgba(227, 179, 65, 0.3);
        background: rgba(227, 179, 65, 0.06);

        .achievement__name {
            color: var(--yellow);
        }
    }

    &--locked {
        opacity: 0.35;
    }

    &__icon {
        font-size: 20px;
    }

    &__name {
        font-family: var(--sm);
        font-size: 7px;
        text-align: center;
        line-height: 1.2;
        color: var(--muted);
    }

    &__glow {
        position: absolute;

        inset: 0;
        border-radius: 9px;

        background: rgba(227, 179, 65, 0.05);
        pointer-events: none;
    }
}
</style>
