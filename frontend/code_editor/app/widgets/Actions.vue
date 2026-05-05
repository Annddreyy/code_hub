<template>
    <div class="action-pane">
        <div class="action-pane__section">
            <button
                class="action-pane__run-btn"
                @click="$emit('run')"
            >
                ▷ Запустить код
            </button>
            <button
                class="action-pane__submit-btn"
                @click="$emit('send')"
            >
                ↑ Отправить решение
            </button>
        </div>

        <div class="action-pane__section">
            <div class="action-pane__header">// сложность</div>
            <div class="stat-row">
                <span class="stat-row__label">По времени</span>
                <span class="stat-row__val stat-row__val--green">{{ time }}</span>
            </div>
            <div class="stat-row">
                <span class="stat-row__label">По памяти</span>
                <span class="stat-row__val stat-row__val--blue">{{ memory }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    time: string;
    memory: string;
}>();

defineEmits(['run', 'send']);
</script>

<style lang="scss" scoped>
.action-pane {
    width: 220px;

    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    border-left: 1px solid var(--b1);
    background: var(--s1);

    &__section {
        padding: 14px 16px;
        border-bottom: 1px solid var(--b1);
    }

    &__header {
        margin-bottom: 10px;

        font-family: var(--spaced);
        font-size: 7px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--dim);
    }

    &__run-btn,
    &__submit-btn {
        width: 100%;
        padding: 10px;

        font-family: var(--sans);
        font-size: 13px;
        font-weight: 800;

        border-radius: 8px;
        cursor: pointer;
    }

    &__run-btn {
        margin-bottom: 6px;

        color: var(--green);

        border: 1px solid rgba(63, 185, 80, 0.35);
        background: rgba(63, 185, 80, 0.08);
        transition: all 0.2s;

        &:hover {
            background: rgba(63, 185, 80, 0.14);
            transform: translateY(-1px);
        }
    }

    &__submit-btn {
        color: #fff;

        border: none;
        background: linear-gradient(135deg, var(--blue), #3d7de8);
        transition: all 0.2s;

        &:hover {
            transform: translateY(-1px);
            box-shadow: 0 5px 18px rgba(79, 156, 255, 0.3);
        }
    }
}

.stat-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 8px;

    &__label {
        font-family: var(--spaced);
        font-size: 9px;
        color: var(--muted);
    }

    &__val {
        font-family: var(--spaced);
        font-size: 9px;
        font-weight: 700;

        &--green {
            color: var(--green);
        }

        &--blue {
            color: var(--blue);
        }
    }
}

@media (max-width: 768px) {
    .action-pane {
        &__run-btn,
        &__submit-btn {
            width: max-content;
            padding: 6px 10px;

            font-size: 10px;
            font-weight: 800;
        }

        &__submit-btn {
            margin-left: 12px;
        }
    }
}
</style>
