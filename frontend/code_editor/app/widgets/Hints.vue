<template>
    <section class="hint-panel">
        <div
            v-if="!revealedCount && !isExpanded"
            class="hint-panel__locked"
            @click="expand"
        >
            <span class="hint-panel__lock-icon">💡</span>
            <p class="hint-panel__lock-text">Застряли? Подсказки помогут продвинуться вперёд.</p>
            <button
                class="hint-panel__unlock-btn"
                type="button"
            >
                Посмотреть подсказки
            </button>
        </div>

        <template v-else>
            <header class="hint-panel__header">
                <div class="hint-panel__title-wrap">
                    <span class="hint-panel__bulb">💡</span>
                    <h3 class="hint-panel__title">Подсказки</h3>
                    <span class="hint-panel__counter">
                        {{ revealedCount }} / {{ hints.length }}
                    </span>
                </div>
                <button
                    class="hint-panel__close"
                    type="button"
                    @click="collapse"
                >
                    ✕
                </button>
            </header>

            <ol class="hint-panel__list">
                <li
                    v-for="(hint, index) in hints"
                    :key="hint.id"
                    :class="[
                        'hint-panel__item',
                        { 'hint-panel__item--revealed': revealedSet.has(hint.id) },
                    ]"
                >
                    <div class="hint-panel__item-header">
                        <span class="hint-panel__item-num">{{ index + 1 }}</span>
                        <span class="hint-panel__item-title">
                            {{ revealedSet.has(hint.id) ? hint.title : `Подсказка ${index + 1}` }}
                        </span>

                        <button
                            v-if="!revealedSet.has(hint.id)"
                            class="hint-panel__reveal-btn"
                            type="button"
                            @click="reveal(hint.id)"
                        >
                            Открыть
                        </button>
                    </div>

                    <Transition name="hint-fade">
                        <div
                            v-if="revealedSet.has(hint.id)"
                            class="hint-panel__body"
                        >
                            <p
                                v-if="hint.type === HintType.TEXT"
                                class="hint-panel__text"
                            >
                                {{ hint.content }}
                            </p>

                            <div
                                v-else-if="hint.type === HintType.CODE"
                                class="hint-panel__code-wrap"
                            >
                                <span class="hint-panel__code-lang">{{ hint.language }}</span>
                                <pre class="hint-panel__code"><code>{{ hint.content }}</code></pre>
                            </div>

                            <div
                                v-else-if="hint.type === HintType.COMPLEXITY"
                                class="hint-panel__complexity"
                            >
                                <div class="hint-panel__complexity-row">
                                    <span class="hint-panel__complexity-label">Время</span>
                                    <code class="hint-panel__complexity-val">
                                        {{ hint.timeComplexity }}
                                    </code>
                                </div>
                                <div class="hint-panel__complexity-row">
                                    <span class="hint-panel__complexity-label">Память</span>
                                    <code class="hint-panel__complexity-val">
                                        {{ hint.spaceComplexity }}
                                    </code>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </li>
            </ol>
        </template>
    </section>
</template>

<script setup lang="ts">
import type { Hint } from '@/entities/challenge';
import { HintType } from '@/entities/challenge';

const { initiallyOpen, hints } = defineProps<{
    hints: Hint[];
    challengeId: string;
    initiallyOpen?: boolean;
}>();

const isExpanded = ref(initiallyOpen);
const revealedSet = ref(new Set<string>());

const revealedCount = computed(() => revealedSet.value.size);

const expand = () => {
    isExpanded.value = true;
};

const collapse = () => {
    isExpanded.value = false;
};

const reveal = (hintId: string) => {
    if (revealedSet.value.has(hintId)) return;
    revealedSet.value = new Set([...revealedSet.value, hintId]);
};
</script>

<style lang="scss" scoped>
.hint-panel {
    font-family: var(--sans);
    color: var(--text);

    border: 1px solid var(--b1);
    border-radius: 10px;

    background: var(--s1);

    &__locked {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;

        padding: 28px 24px;

        cursor: pointer;
        transition: background 0.2s;

        &:hover {
            background: rgba(255, 255, 255, 0.02);
        }
    }

    &__lock-icon {
        font-size: 28px;

        filter: grayscale(0.4) opacity(0.7);
        transition: filter 0.2s;

        .hint-panel__locked:hover & {
            filter: none;
        }
    }

    &__lock-text {
        margin: 0;

        font-size: 13px;
        text-align: center;
        line-height: 1.5;
        color: var(--muted);
    }

    &__unlock-btn {
        padding: 8px 20px;

        font-family: var(--mono);
        font-size: 11px;
        font-weight: 700;
        color: var(--yellow);

        border: 1px solid rgba(227, 179, 65, 0.3);
        border-radius: 20px;

        background: rgba(227, 179, 65, 0.09);
        cursor: pointer;

        transition: all 0.2s;

        &:hover {
            background: rgba(227, 179, 65, 0.16);
            box-shadow: 0 0 12px rgba(227, 179, 65, 0.15);
        }
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 12px 16px;

        border-bottom: 1px solid var(--b1);
        background: rgba(227, 179, 65, 0.05);
    }

    &__title-wrap {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    &__bulb {
        font-size: 16px;
    }

    &__title {
        margin: 0;

        font-size: 14px;
        font-weight: 700;
        color: var(--yellow);
    }

    &__counter {
        padding: 2px 7px;

        font-family: var(--mono);
        font-size: 10px;
        font-weight: 700;
        color: var(--yellow);

        border: 1px solid rgba(227, 179, 65, 0.2);
        border-radius: 20px;

        background: rgba(227, 179, 65, 0.1);
    }

    &__close {
        width: 28px;
        height: 28px;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 12px;
        color: var(--muted);

        border: 1px solid var(--b1);
        border-radius: 50%;

        background: transparent;
        cursor: pointer;

        transition: all 0.15s;

        &:hover {
            color: var(--text);
            border-color: rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.05);
        }
    }

    &__list {
        margin: 0;
        padding: 0;

        list-style: none;
    }

    &__item {
        border-bottom: 1px solid var(--b1);
        background: #0f1520;

        transition: background 0.2s;

        &--revealed {
            background: var(--s1);
        }
    }

    &__item-header {
        display: flex;
        align-items: center;
        gap: 10px;

        padding: 12px 16px;
    }

    &__item-num {
        width: 22px;
        height: 22px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        font-family: var(--mono);
        font-size: 10px;
        font-weight: 700;
        color: var(--dim);

        border: 1px solid var(--b1);
        border-radius: 50%;

        background: rgba(255, 255, 255, 0.06);

        .hint-panel__item--revealed & {
            color: var(--yellow);
            border-color: rgba(227, 179, 65, 0.3);
            background: rgba(227, 179, 65, 0.1);
        }
    }

    &__item-title {
        flex: 1;

        font-size: 13px;
        font-weight: 600;
        color: var(--muted);

        .hint-panel__item--revealed & {
            color: var(--text);
        }
    }

    &__reveal-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;

        padding: 5px 12px;

        font-family: var(--mono);
        font-size: 10px;
        font-weight: 700;
        color: var(--blue);

        border: 1px solid rgba(79, 156, 255, 0.3);
        border-radius: 6px;

        background: transparent;
        cursor: pointer;

        transition: all 0.2s;

        &:hover:not(:disabled) {
            background: rgba(79, 156, 255, 0.08);
            box-shadow: 0 0 8px rgba(79, 156, 255, 0.15);
        }

        &:disabled {
            opacity: 0.6;
            cursor: default;
        }
    }

    &__spinner {
        display: inline-block;
        width: 10px;
        height: 10px;

        border: 1.5px solid rgba(79, 156, 255, 0.3);
        border-top-color: var(--blue);
        border-radius: 50%;

        animation: spin 0.6s linear infinite;
    }

    &__body {
        padding: 0 16px 16px;
    }

    &__text {
        margin: 0;

        font-size: 13px;
        line-height: 1.65;
        color: var(--muted);
    }

    &__code-wrap {
        position: relative;

        border-radius: 6px;
        border: 1px solid var(--b1);

        background: var(--bg);
        overflow: hidden;
    }

    &__code-lang {
        position: absolute;
        top: 8px;
        right: 12px;

        font-family: var(--mono);
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--cyan);
    }

    &__code {
        display: block;
        margin: 0;
        padding: 14px 14px 12px;

        font-family: var(--mono);
        font-size: 12px;
        line-height: 1.7;
        white-space: pre;
        color: var(--text);

        overflow-x: auto;

        &::-webkit-scrollbar {
            height: 3px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 2px;
            background: rgba(255, 255, 255, 0.1);
        }
    }

    &__complexity {
        display: flex;
        gap: 12px;
    }

    &__complexity-row {
        display: flex;
        align-items: center;
        gap: 7px;

        padding: 7px 12px;

        border: 1px solid var(--b1);
        border-radius: 6px;

        background: var(--s2);
    }

    &__complexity-label {
        font-family: var(--mono);
        font-size: 9px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--dim);
    }

    &__complexity-val {
        font-family: var(--mono);
        font-size: 13px;
        font-weight: 700;
        color: var(--purple);
    }
}

.hint-fade-enter-active {
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
}

.hint-fade-leave-active {
    transition: opacity 0.2s ease;
}

.hint-fade-enter-from {
    opacity: 0;
    transform: translateY(-6px);
}

.hint-fade-leave-to {
    opacity: 0;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
