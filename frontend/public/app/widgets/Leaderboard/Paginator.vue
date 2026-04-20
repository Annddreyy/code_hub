<template>
    <nav class="paginator">
        <button
            class="paginator__btn paginator__btn--arrow"
            :disabled="currentPage <= 1"
            @click="goTo(currentPage - 1)"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
            >
                <path
                    d="M10 3L5 8L10 13"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </button>

        <template
            v-for="item in visiblePages"
            :key="item"
        >
            <span
                v-if="item === '...'"
                class="paginator__dots"
            >
                <span class="paginator__dots-inner">···</span>
            </span>
            <button
                v-else
                class="paginator__btn paginator__btn--page"
                :class="{ 'paginator__btn--active': item === currentPage }"
                @click="goTo(item)"
            >
                {{ item }}
            </button>
        </template>

        <button
            class="paginator__btn paginator__btn--arrow"
            :disabled="currentPage >= totalPages"
            @click="goTo(currentPage + 1)"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
            >
                <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </button>
    </nav>
</template>

<script setup lang="ts">
const { currentPage, totalPages, siblingCount } = defineProps<{
    currentPage: number;
    totalPages: number;
    siblingCount: number;
}>();

const emit = defineEmits(['update:currentPage']);

function goTo(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    emit('update:currentPage', page);
}

const visiblePages = computed(() => {
    if (totalPages <= 1) return [1];

    const firstPage = 1;
    const lastPage = totalPages;

    const rangeStart = Math.max(firstPage + 1, currentPage - siblingCount);
    const rangeEnd = Math.min(lastPage - 1, currentPage + siblingCount);

    const showLeftDots = rangeStart > firstPage + 1;
    const showRightDots = rangeEnd < lastPage - 1;

    const result: (number | '...')[] = [];

    result.push(firstPage);

    if (showLeftDots) {
        result.push('...');
    } else {
        for (let p = firstPage + 1; p < rangeStart; p++) {
            result.push(p);
        }
    }

    for (let p = rangeStart; p <= rangeEnd; p++) {
        result.push(p);
    }

    if (showRightDots) {
        result.push('...');
    } else {
        for (let p = rangeEnd + 1; p < lastPage; p++) {
            result.push(p);
        }
    }

    if (lastPage > firstPage) {
        result.push(lastPage);
    }

    return result;
});
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');

.paginator {
    display: inline-flex;
    align-items: center;
    gap: 6px;

    padding: 8px;

    font-family: 'DM Mono', monospace;

    border: 1px solid #2e2e38;
    border-radius: 16px;

    background: #1a1a1f;
    box-shadow:
        0 4px 24px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.04);

    &__btn {
        position: relative;

        display: inline-flex;
        align-items: center;
        justify-content: center;

        width: 40px;
        height: 40px;

        border: 1px solid transparent;
        border-radius: 10px;

        font-family: 'DM Mono', monospace;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.02em;
        color: #a0a0b0;

        background: transparent;
        cursor: pointer;

        transition:
            color 0.18s ease,
            background 0.18s ease,
            border-color 0.18s ease,
            box-shadow 0.18s ease,
            transform 0.12s ease;

        outline: none;
        user-select: none;

        &:hover:not(:disabled):not(&--active) {
            transform: translateY(-1px);

            color: #f0f0f5;
            border-color: #2e2e38;
            background: rgba(255, 255, 255, 0.06);
        }

        &:active:not(:disabled) {
            transform: translateY(0) scale(0.95);
        }

        &:focus-visible {
            outline: 2px solid #6c63ff;
            outline-offset: 2px;
        }

        &--active {
            color: #fff;
            border-color: #6c63ff;
            background: #6c63ff;

            box-shadow:
                0 0 0 3px rgba(108, 99, 255, 0.25),
                0 2px 10px rgba(108, 99, 255, 0.4);
            cursor: default;
        }

        &--arrow {
            color: #a0a0b0;

            &:disabled {
                color: #3a3a45;
                cursor: not-allowed;

                opacity: 0.5;
            }
        }
    }

    &__dots {
        display: inline-flex;
        align-items: center;
        justify-content: center;

        width: 40px;
        height: 40px;

        font-family: 'DM Mono', monospace;
        font-size: 14px;
        letter-spacing: 0.1em;
        color: #3a3a45;

        user-select: none;
        pointer-events: none;
    }

    &__dots-inner {
        display: block;
        transform: translateY(-3px);
    }
}
</style>
