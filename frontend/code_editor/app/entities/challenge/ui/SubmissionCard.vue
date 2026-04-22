<template>
    <article :class="['submission-card', `submission-card--${statusMod}`]">
        <header class="submission-card__header">
            <div class="submission-card__status-wrap">
                <span class="submission-card__status-icon">
                    {{ ICONS[submission.status] }}
                </span>
                <span class="submission-card__status-label">
                    {{ LABELS[submission.status] }}
                </span>
            </div>

            <div class="submission-card__meta">
                <span class="submission-card__lang">{{ submission.language }}</span>
                <time
                    class="submission-card__time"
                    :datetime="submission.submittedAt"
                >
                    {{ formattedDate }}
                </time>
            </div>
        </header>

        <div class="submission-card__stats">
            <div class="submission-card__stat">
                <span class="submission-card__stat-label">Тесты</span>
                <span class="submission-card__stat-value">
                    {{ submission.passedTests }} / {{ submission.totalTests }}
                </span>
            </div>

            <div
                v-if="submission.runtimeMs"
                class="submission-card__stat"
            >
                <span class="submission-card__stat-label">Время</span>
                <span class="submission-card__stat-value">{{ submission.runtimeMs }} мс</span>
            </div>

            <div
                v-if="submission.memoryKb"
                class="submission-card__stat"
            >
                <span class="submission-card__stat-label">Память</span>
                <span class="submission-card__stat-value">{{ formattedMemory }}</span>
            </div>
        </div>

        <div class="submission-card__code-wrap">
            <button
                class="submission-card__toggle"
                type="button"
                @click="toggleCode"
            >
                <span>{{ expanded ? 'Скрыть код' : 'Показать код' }}</span>
                <span
                    :class="[
                        'submission-card__toggle-icon',
                        { 'submission-card__toggle-icon--open': expanded },
                    ]"
                >
                    ▾
                </span>
            </button>

            <Transition name="slide-down">
                <div
                    v-if="expanded"
                    class="submission-card__code-block"
                >
                    <pre class="submission-card__pre">
                        <code>{{ submission.code }}</code>
                    </pre>
                    <button
                        type="button"
                        :class="[
                            'submission-card__copy',
                            { 'submission-card__copy--copied': copied },
                        ]"
                        @click="copyCode"
                    >
                        {{ copied ? '✓ Скопировано' : 'Копировать' }}
                    </button>
                </div>
            </Transition>
        </div>

        <div
            v-if="submission.errorMessage"
            class="submission-card__error"
        >
            <span class="submission-card__error-label">Ошибка</span>
            <p class="submission-card__error-text">{{ submission.errorMessage }}</p>
        </div>
    </article>
</template>

<script setup lang="ts">
import type { Submission } from '../api/challenge';
import { SubmissionStatus } from '../api/challenge';

const ICONS: Record<SubmissionStatus, string> = {
    [SubmissionStatus.ACCEPTED]: '✓',
    [SubmissionStatus.WRONG_ANSWER]: '✗',
    [SubmissionStatus.TIME_LIMIT_EXCEED]: '⏱',
    [SubmissionStatus.RUNTIME_ERROR]: '⚡',
    [SubmissionStatus.COMPILER_ERROR]: '⚙',
};

const LABELS: Record<SubmissionStatus, string> = {
    [SubmissionStatus.ACCEPTED]: 'Принято',
    [SubmissionStatus.WRONG_ANSWER]: 'Неверный ответ',
    [SubmissionStatus.TIME_LIMIT_EXCEED]: 'Превышен лимит времени',
    [SubmissionStatus.RUNTIME_ERROR]: 'Ошибка выполнения',
    [SubmissionStatus.COMPILER_ERROR]: 'Ошибка компиляции',
};

const { submission } = defineProps<{
    submission: Submission;
}>();

const expanded = ref(false);
const copied = ref(false);

const statusMod = computed(() => submission.status.replace(/_/g, '-'));

const formattedDate = computed(() => {
    return new Date(submission.submittedAt).toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
});

const formattedMemory = computed(() => {
    const kb = submission.memoryKb;
    if (!kb) {
        return '—';
    }
    return kb >= 1024 ? `${(kb / 1024).toFixed(1)} МБ` : `${kb} КБ`;
});

const toggleCode = () => {
    expanded.value = !expanded.value;
};

const copyCode = async () => {
    try {
        await navigator.clipboard.writeText(submission.code);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch {}
};
</script>

<style lang="scss" scoped>
.submission-card {
    font-family: var(--sans);
    color: var(--text);

    border-radius: 10px;
    background: var(--s1);

    overflow: hidden;

    transition: box-shadow 0.2s ease;

    &--accepted {
        border: 1px solid rgba(63, 185, 80, 0.2);

        &:hover {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .submission-card__header {
            background: rgba(63, 185, 80, 0.08);
        }

        .submission-card__status-icon,
        .submission-card__status-label {
            color: var(--green);
        }

        .submission-card__status-icon {
            text-shadow: 0 0 8px rgba(63, 185, 80, 0.5);
        }
    }

    &--wrong-answer {
        border: 1px solid rgba(255, 92, 114, 0.2);

        &:hover {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .submission-card__header {
            background: rgba(255, 92, 114, 0.08);
        }

        .submission-card__status-icon,
        .submission-card__status-label {
            color: var(--red);
        }

        .submission-card__status-icon {
            text-shadow: 0 0 8px rgba(255, 92, 114, 0.5);
        }
    }

    &--time-limit-exceeded {
        border: 1px solid rgba(227, 179, 65, 0.2);

        &:hover {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .submission-card__header {
            background: rgba(227, 179, 65, 0.08);
        }

        .submission-card__status-icon,
        .submission-card__status-label {
            color: var(--yellow);
        }

        .submission-card__status-icon {
            text-shadow: 0 0 8px rgba(227, 179, 65, 0.5);
        }
    }

    &--runtime-error {
        border: 1px solid rgba(255, 140, 66, 0.2);

        &:hover {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .submission-card__header {
            background: rgba(255, 140, 66, 0.08);
        }

        .submission-card__status-icon,
        .submission-card__status-label {
            color: var(--orange);
        }

        .submission-card__status-icon {
            text-shadow: 0 0 8px rgba(255, 140, 66, 0.5);
        }
    }

    &--compile-error {
        border: 1px solid rgba(188, 140, 255, 0.2);

        &:hover {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .submission-card__header {
            background: rgba(188, 140, 255, 0.08);
        }

        .submission-card__status-icon,
        .submission-card__status-label {
            color: var(--purple);
        }

        .submission-card__status-icon {
            text-shadow: 0 0 8px rgba(188, 140, 255, 0.5);
        }
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 12px 16px;

        border-bottom: 1px solid var(--b1);
    }

    &__status-wrap {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    &__status-icon {
        width: 20px;

        font-family: var(--mono);
        font-size: 14px;
        font-weight: 700;
        text-align: center;
    }

    &__status-label {
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.01em;
    }

    &__meta {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    &__lang {
        padding: 2px 8px;

        font-family: var(--mono);
        font-size: 10px;
        font-weight: 700;
        color: var(--blue);

        border: 1px solid rgba(79, 156, 255, 0.2);
        border-radius: 20px;

        background: rgba(255, 255, 255, 0.07);
    }

    &__time {
        font-family: var(--mono);
        font-size: 10px;
        color: var(--muted);
    }

    &__stats {
        display: flex;
        gap: 0;

        border-bottom: 1px solid var(--b1);
    }

    &__stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        flex: 1;

        padding: 10px 8px;

        border-right: 1px solid var(--b1);

        &:last-child {
            border-right: none;
        }
    }

    &__stat-label {
        font-family: var(--mono);
        font-size: 9px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--dim);
    }

    &__stat-value {
        font-family: var(--mono);
        font-size: 13px;
        font-weight: 700;
        color: var(--text);
    }

    &__code-wrap {
        padding: 0;
    }

    &__toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 100%;
        padding: 10px 16px;

        font-family: var(--mono);
        font-size: 11px;
        color: var(--muted);

        border: none;
        border-bottom: 1px solid var(--b1);

        background: transparent;
        cursor: pointer;

        transition:
            color 0.15s,
            background 0.15s;

        &:hover {
            color: var(--text);
            background: rgba(255, 255, 255, 0.03);
        }
    }

    &__toggle-icon {
        display: inline-block;
        font-size: 16px;

        transition: transform 0.25s ease;

        &--open {
            transform: rotate(180deg);
        }
    }

    &__code-block {
        position: relative;

        border-bottom: 1px solid var(--b1);
        background: var(--bg);
    }

    &__pre {
        margin: 0;
        padding: 16px;

        font-family: var(--mono);
        font-size: 12px;
        line-height: 1.7;
        white-space: pre;
        color: var(--text);

        overflow-x: auto;

        &::-webkit-scrollbar {
            height: 4px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 2px;
            background: rgba(255, 255, 255, 0.12);
        }
    }

    &__copy {
        position: absolute;
        top: 10px;
        right: 12px;

        padding: 4px 10px;

        font-family: var(--mono);
        font-size: 10px;
        color: var(--muted);

        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 6px;

        background: rgb(66, 57, 3);
        cursor: pointer;

        transition: all 0.2s;

        &:hover {
            color: var(--text);
            background: rgba(255, 255, 255, 0.12);
        }

        &--copied {
            color: var(--green);
            border-color: rgba(63, 185, 80, 0.3);
            background: rgba(63, 185, 80, 0.08);
        }
    }

    &__error {
        padding: 12px 16px;

        border-top: 1px solid rgba(255, 92, 114, 0.15);
        background: rgba(255, 92, 114, 0.05);
    }

    &__error-label {
        display: block;
        margin-bottom: 5px;

        font-family: var(--mono);
        font-size: 9px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--red);
    }

    &__error-text {
        margin: 0;

        font-family: var(--mono);
        font-size: 11px;
        line-height: 1.6;
        white-space: pre-wrap;
        word-break: break-word;
        color: rgba(255, 92, 114, 0.85);
    }
}

.slide-down-enter-active,
.slide-down-leave-active {
    max-height: 600px;

    overflow: hidden;
    transition:
        max-height 0.3s ease,
        opacity 0.25s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
    max-height: 0;
    opacity: 0;
}
</style>
