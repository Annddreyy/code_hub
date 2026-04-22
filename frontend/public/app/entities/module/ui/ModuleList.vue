<template>
    <div :class="['module', { 'module--open': isOpen }]">
        <div
            class="module__header"
            @click="toggleIsOpen"
        >
            <span class="module__num">{{ id }}</span>
            <span class="module__title">{{ title }}</span>
            <span class="module__lessons-count">{{ lessons.length }}</span>
            <span class="module__arrow">▶</span>
        </div>
        <div
            v-for="lesson in lessons"
            :key="lesson.id"
            class="module__lessons"
        >
            <NuxtLink
                :to="lesson.id"
                :class="['module__lesson', `module__lesson--${lesson.status}`]"
            >
                <div class="module__lesson-dot" />
                {{ lesson.title }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Module } from '../model/module';

type Props = Module & {
    id: string;
};

const { lessons } = defineProps<Props>();

const isOpen = ref(true);

const toggleIsOpen = () => {
    isOpen.value = !isOpen.value;
};
</script>

<style lang="scss" scoped>
.module {
    border-bottom: 1px solid var(--b1);

    &__header {
        display: flex;
        align-items: center;
        gap: 8px;

        padding: 9px 14px;

        font-size: 11px;
        font-weight: 700;
        color: var(--muted);

        cursor: pointer;
        user-select: none;

        transition: color 0.15s;

        &:hover {
            color: var(--text2);
        }
    }

    &__num {
        width: 18px;
        flex-shrink: 0;

        font-family: 'Space Mono', monospace;
        font-size: 9px;
        color: var(--dim);
    }

    &__title {
        flex: 1;
    }

    &__lessons-count {
        padding: 1px 5px;

        font-family: 'Space Mono', monospace;
        font-size: 8px;
        color: var(--muted);

        border-radius: 3px;
        background: var(--s3);
    }

    &__arrow {
        font-size: 8px;
        color: var(--dim);

        transition: transform 0.2s;
    }

    &__lessons {
        display: none;
        padding: 2px 0 6px;
    }

    &__lesson {
        position: relative;

        display: flex;
        align-items: center;
        gap: 8px;

        margin-left: 12px;
        padding: 7px 14px 7px 32px;

        font-size: 12px;
        font-weight: 500;
        text-decoration: none;
        color: var(--muted);

        border-left: 2px solid transparent;
        cursor: pointer;

        transition: all 0.12s;

        &:hover {
            color: var(--text2);
            background: rgba(255, 255, 255, 0.02);
        }

        &--done {
            color: var(--green);

            &::after {
                content: '✓';
                font-family: 'Space Mono', monospace;
                font-size: 8px;
                margin-left: auto;
                color: var(--green);
            }

            .module__lesson-dot {
                background: var(--green);
            }
        }

        &--active {
            color: var(--blue);
            border-left-color: var(--blue);
            background: rgba(79, 156, 255, 0.06);

            .module__lesson-dot {
                background: var(--blue);
                animation: pulse 2s infinite;
            }
        }
    }

    &__dot {
        width: 5px;
        height: 5px;

        flex-shrink: 0;

        border-radius: 50%;
    }

    &--open {
        .module__header {
            color: var(--text2);
        }

        .module__arrow {
            transform: rotate(90deg);
        }

        .module__lessons {
            display: block;
        }
    }
}
</style>
