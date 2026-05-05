<template>
    <div class="console-pane">
        <div class="console-pane__tabs">
            <button class="console-pane__title">Тестовые примеры</button>
        </div>
        <div class="console-pane__body">
            <div
                v-if="!isEmpty(resultStats)"
                :class="['result-banner', { 'result-banner--fail': !isPassed }]"
            >
                <span v-if="isPassed">✓ Принято</span>
                <span v-else>✗ Решение неверное</span>
                <div>{{ totalPassedTestsCount }} / {{ totalTestsCount }} тест-кейсов пройдено</div>
                <div>
                    {{ totalUnpassedTestsCount }} / {{ totalTestsCount }} тест-кейсов провалено
                </div>
                <div class="result-banner__stats">
                    Время: {{ resultStats?.runtime?.time }} ms · Эффективность
                    {{ resultStats?.runtime?.beats }}%
                </div>
                <div class="result-banner__stats">
                    Используемая память: {{ resultStats?.memory?.volume }} MB · Эффективность
                    {{ resultStats?.memory?.beats }}%
                </div>
            </div>
            <div
                v-for="testCase in testCases"
                :key="testCase.id"
                class="test-case"
            >
                <div class="test-case__label">
                    Тестовый пример {{ testCase.order }}
                    <div
                        v-if="!isEmpty(resultStats)"
                        :class="{ 'test-case__pass': isPassed, 'test-case__fail': !isPassed }"
                    >
                        <span v-if="isPassed">✓ Принято</span>
                        <span v-else>✗ Решение неверное</span>
                    </div>
                </div>
                <div class="test-case__row">
                    <span class="test-case__title">Входные данные:</span>
                    <span class="test-case__value">{{ testCase.inputData.join(' ') }}</span>
                </div>
                <div class="test-case__row">
                    <span class="test-case__title">Ожидаемые выходные данные:</span>
                    <span class="test-case__value">{{ testCase.outputData.join(' ') }}</span>
                </div>
                <div
                    v-if="testCase.userOutput"
                    class="test-case__row"
                >
                    <span class="test-case__title">Ваш ответ:</span>
                    <span class="test-case__value">{{ testCase.userOutput }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash-es';

const { testCases, resultStats = {} } = defineProps<{
    testCases: {
        id: string;
        inputData: string[];
        outputData: string[];
        order: number;
        userOutput?: string[];
        isPassed?: boolean;
    }[];
    resultStats?: {
        runtime?: {
            time: string;
            beats: string;
        };
        memory?: {
            volume: string;
            beats: string;
        };
    };
}>();

const totalTestsCount = computed(() => testCases.length);
const totalPassedTestsCount = computed(() => testCases.filter((test) => test.isPassed).length);
const totalUnpassedTestsCount = computed(() => totalTestsCount.value - totalPassedTestsCount.value);

const isPassed = computed(() => totalTestsCount.value === totalPassedTestsCount.value);
</script>

<style lang="scss" scoped>
.console-pane {
    height: 200px;

    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    flex: 1;

    border-top: 1px solid var(--b1);
    background: var(--s1);

    &__tabs {
        display: flex;
        flex-shrink: 0;

        border-bottom: 1px solid var(--b1);
    }

    &__title {
        padding: 7px 14px;

        font-family: var(--spaced);
        font-size: 8px;
        font-weight: 700;
        color: var(--blue);

        border: none;
        border-bottom: 2px solid transparent;
        border-bottom-color: var(--blue);

        background: transparent;
        cursor: pointer;
    }

    &__body {
        flex: 1;
        padding: 10px 14px;

        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 3px;
        }

        &::-webkit-scrollbar-thumb {
            background: var(--s3);
        }
    }
}

.test-case {
    margin-bottom: 7px;
    padding: 10px 12px;

    border: 1px solid var(--b1);
    border-radius: 7px;

    background: var(--s2);

    &__label {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 6px;

        font-family: var(--spaced);
        font-size: 8px;
        color: var(--dim);
    }

    &__pass {
        font-weight: 700;
        color: var(--green);
    }

    &__fail {
        font-weight: 700;
        color: var(--red);
    }

    &__row {
        margin-bottom: 3px;

        font-family: var(--mono);
        font-size: 11px;
    }

    &__title {
        color: var(--muted);
    }

    &__value {
        color: var(--text);
    }
}

.result-banner {
    margin-bottom: 8px;
    padding: 10px 14px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;

    font-family: var(--spaced);
    font-size: 10px;
    font-weight: 700;
    color: var(--green);

    border: 1px solid rgba(63, 185, 80, 0.25);
    border-radius: 8px;

    background: rgba(63, 185, 80, 0.08);
    animation: slideUp 0.3s ease;

    &--fail {
        color: var(--red);
        border: 1px solid rgba(255, 92, 114, 0.25);
        background: rgba(255, 92, 114, 0.08);
    }

    &__stats {
        margin-top: 4px;

        font-family: var(--spaced);
        font-size: 8px;
        color: var(--muted);
    }
}
</style>
