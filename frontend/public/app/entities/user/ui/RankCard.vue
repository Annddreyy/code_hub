<template>
    <div class="rank-card">
        <div class="rank-card__label">// Ваша текущая позиция</div>
        <div class="rank-card__body">
            <div class="rank-card__rank">#{{ position.currentPositon }}</div>
            <div class="rank-card__info">
                <div class="rank-card__name">{{ name }}</div>
                <div class="rank-card__xp-info">
                    <span class="rank-card__xp">{{ xp }} XP</span>
                    <span class="rank-card__delta"
                        >{{ posDeltaSymbol }} {{ posDelta }} на этой неделе</span
                    >
                </div>
            </div>
            <div class="rank-card__avatar">{{ name[0] }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '../model/user';

const { position } = defineProps<User>();

const posDelta = computed(() => position.currentPositon - position.prevPosition);
const posDeltaSymbol = computed(() => {
    if (posDelta.value > 0) {
        return '↑';
    } else if (posDelta.value < 0) {
        return '↓';
    } else {
        return '-';
    }
});
</script>

<style lang="scss" scoped>
.rank-card {
    margin: -20px -20px 20px -20px;
    padding: 20px 16px;

    border-bottom: 1px solid var(--b1);
    background: linear-gradient(135deg, rgba(79, 156, 255, 0.05), rgba(188, 140, 255, 0.03));

    &__label {
        margin-bottom: 10px;

        font-family: var(--spaced);
        font-size: 7px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--dim);
    }

    &__body {
        position: relative;
        padding: 14px;

        display: flex;
        align-items: center;
        gap: 12px;

        border: 1px solid rgba(79, 156, 255, 0.2);
        border-radius: 12px;

        background: rgba(79, 156, 255, 0.06);
        overflow: hidden;

        &::after {
            position: absolute;
            content: '';
            top: 0;
            left: -100%;

            width: 60%;
            height: 100%;

            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.04), transparent);
            animation: shine 3s ease-in-out infinite;
        }
    }

    &__rank {
        flex-shrink: 0;

        font-family: var(--spaced);
        font-size: 28px;
        font-weight: 700;
        line-height: 1;
        color: var(--blue);
    }

    &__info {
        flex: 1;
        min-width: 0;
    }

    &__name {
        margin-bottom: 2px;

        font-size: 14px;
        font-weight: 700;
    }

    &__xp-info {
        display: flex;
        flex-direction: column;
        gap: 8px;

        margin-top: 4px;
    }

    &__xp {
        font-family: var(--spaced);
        font-size: 11px;
        font-weight: 700;
        color: var(--yellow);
    }

    &__delta {
        font-family: var(--spaced);
        font-size: 8px;
        color: var(--green);
    }

    &__avatar {
        width: 40px;
        height: 40px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        font-size: 15px;
        font-weight: 700;

        border: 2px solid rgba(79, 156, 255, 0.4);
        border-radius: 50%;

        background: linear-gradient(135deg, var(--blue), var(--purple));
    }
}
</style>
