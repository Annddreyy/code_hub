<template>
    <div class="step">
        <div class="step__label">// шаг_0{{ step }} из 04</div>
        <div class="step__title">{{ title }}</div>
        <p class="step__sub">{{ description }}</p>
        <div class="step__choices">
            <slot />
        </div>
        <div class="step__btns">
            <button
                v-if="!isFirstStep"
                class="step__back"
                @click="$emit('prevStep')"
            >
                Назад ←
            </button>
            <div
                v-else
                class="step__hint"
            >
                Выберите один или больше • ты можешь поменять позднее
            </div>
            <button
                :class="['step__next', { 'step__next--green': isLastStep }]"
                :disabled="nextButtonDisabled"
                @click="$emit('nextStep')"
            >
                {{ isLastStep ? 'Начать обучение' : 'Продолжить' }} →
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    isFirstStep?: boolean;
    isLastStep?: boolean;
    step: number;
    title: string;
    description: string;
    nextButtonDisabled?: boolean;
}>();

defineEmits(['nextStep', 'prevStep']);
</script>

<style lang="scss" scoped>
.step {
    &__label {
        margin-bottom: 8px;

        font-family: var(--sm);
        font-size: 9px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--blue);
    }

    &__title {
        margin-bottom: 8px;

        font-size: 34px;
        font-weight: 900;
        letter-spacing: -0.025em;
        line-height: 1.1;
    }

    &__sub {
        max-width: 560px;
        margin-bottom: 32px;

        font-size: 14px;
        line-height: 1.6;
        color: var(--muted);
    }

    &__choices {
        display: grid;
        gap: 10px;

        margin-bottom: 32px;
    }

    &__btns {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-top: 8px;
    }

    &__back {
        padding: 11px 24px;

        font-family: var(--sans);
        font-size: 13px;
        font-weight: 700;
        color: var(--muted);

        border: 1px solid var(--b2);
        border-radius: 9px;
        background: transparent;

        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            color: var(--text);
            border-color: var(--b3);
        }
    }

    &__next {
        padding: 12px 32px;

        font-family: var(--sans);
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.01em;
        color: #000;

        border: none;
        border-radius: 9px;

        background: var(--blue);

        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            background: #6aadff;
            transform: translateY(-1px);
        }

        &:disabled {
            background: #829dbf;
        }

        &--green {
            background: var(--green);

            &:hover {
                background: #4dcf61;
            }
        }
    }

    &__hint {
        font-family: var(--sm);
        font-size: 9px;
        color: var(--dim);
    }
}

@media (max-width: 768px) {
    .step {
        display: flex;
        flex-direction: column;
        gap: 10px;
        flex: 1;

        &__choices {
            margin-bottom: 0;
        }

        &__label {
            font-size: 8px;
        }

        &__title {
            font-size: 24px;
        }

        &__sub {
            margin-bottom: 20px;
            font-size: 13px;
        }

        &__hint {
            display: none;
        }

        &__btns {
            margin-top: auto;
            gap: 10px;
        }

        &__back {
            width: max-content;
            padding: 12px;

            flex-shrink: 0;
        }

        &__next {
            flex: 1;
            padding: 12px;
        }
    }
}
</style>
