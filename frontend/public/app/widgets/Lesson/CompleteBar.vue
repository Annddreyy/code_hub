<template>
    <div class="complete-bar">
        <div class="complete-bar__left">
            <div class="complete-bar__icon">🏁</div>
            <div class="complete-bar__txt">
                <h3>Вы дочитали эту тему до конца!</h3>
                <p>
                    Отметьте задание как выполненное, чтобы получить опыт и разблокировать
                    {{ nextLessonTitle }}.
                </p>
            </div>
        </div>
        <button
            class="complete-bar__btn"
            @click="$emit('complete')"
        >
            Завершить и Продолжить →
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    nextLessonTitle: string;
}>();

defineEmits(['complete']);
</script>

<style lang="scss" scoped>
.complete-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    margin: 32px 0;
    padding: 18px 22px;

    border: 1px solid rgba(63, 185, 80, 0.2);
    border-radius: 12px;

    background: linear-gradient(90deg, rgba(63, 185, 80, 0.08), rgba(57, 212, 200, 0.06));

    &__left {
        display: flex;
        align-items: center;
        gap: 14px;
    }

    &__icon {
        font-size: 28px;
    }

    &__txt {
        h3 {
            margin-bottom: 3px;

            font-size: 15px;
            font-weight: 700;
        }

        p {
            font-size: 12px;
            color: var(--muted);
        }
    }

    &__btn {
        padding: 10px 24px;

        font-family: var(--sans);
        font-size: 13px;
        font-weight: 700;
        white-space: nowrap;
        color: #000;

        border: none;
        border-radius: 8px;

        background: var(--green);
        cursor: pointer;

        transition: all 0.2s;

        &:hover {
            transform: translateY(-1px);
            background: #4dcf61;
        }
    }
}

@media (max-width: 768px) {
    .complete-bar {
        flex-direction: column;
        align-items: flex-start;

        margin: 8px 0;
    }
}
</style>
