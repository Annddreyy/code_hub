<template>
    <div class="welcome">
        <div>
            <div class="welcome__greet">// доброе_утро · {{ date }}</div>
            <div class="welcome__name">С возвращением, {{ userName }} 👋</div>
            <div class="welcome__sub">
                У вас <span>{{ streak }}-дневная серия</span> — не прерывайте её!
            </div>
        </div>
        <div class="streak-card">
            <div class="streak-card__fire">🔥</div>
            <div class="streak-card__body">
                <div class="streak-card__val">{{ streak }}</div>
                <div class="streak-card__lbl">Дневная серия</div>
                <div class="streak-card__days">
                    <div
                        v-for="(weekDay, index) in WEEK_DAYS"
                        :key="weekDay"
                        :class="[
                            'streak-card__day',
                            {
                                'streak-card__day--today': currentDayOfWeek === index,
                            },
                        ]"
                    >
                        {{ weekDay }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const WEEK_DAYS = ['П', 'В', 'С', 'Ч', 'П', 'С', 'В'];
const now = new Date();

const dayOfWeek = now.getDay();
const currentDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

const formatter = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    month: 'long',
});

const parts = formatter.formatToParts(now);
const weekday = parts.find((p) => p.type === 'weekday')!.value;
const month = parts.find((p) => p.type === 'month')!.value;
const day = String(now.getDate()).padStart(2, '0');

const date = `${weekday}, ${day} ${month}`;

defineProps<{
    userName: string;
    streak: number;
}>();
</script>

<style lang="scss" scoped>
.welcome {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    animation: fadeUp 0.4s ease both;

    &__greet {
        margin-bottom: 3px;

        font-family: var(--sm);
        font-size: 10px;
        color: var(--muted);
    }

    &__name {
        font-size: 26px;
        font-weight: 900;
        letter-spacing: -0.02em;
    }

    &__sub {
        margin-top: 4px;

        font-size: 13px;
        color: var(--muted);

        span {
            font-weight: 700;
            color: var(--orange);
        }
    }
}

.streak-card {
    display: flex;
    align-items: center;
    gap: 12px;

    padding: 14px 18px;

    background: rgba(255, 140, 66, 0.06);

    border: 1px solid rgba(255, 140, 66, 0.2);
    border-radius: 12px;

    &__fire {
        font-size: 28px;
    }

    &__val {
        font-size: 24px;
        font-weight: 900;
        color: var(--orange);
    }

    &__lbl {
        font-family: var(--sm);
        font-size: 9px;
        color: var(--muted);
    }

    &__days {
        display: flex;
        gap: 3px;

        margin-top: 5px;
    }

    &__day {
        width: 16px;
        height: 16px;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 8px;
        color: var(--orange);

        border-radius: 4px;
        background: var(--s3);

        &--on {
            background: rgba(255, 140, 66, 0.3);
            color: var(--orange);
        }

        &--today {
            background: var(--orange);
            color: #000;
        }
    }
}

@media (max-width: 768px) {
    .welcome {
        flex-direction: column;
        align-items: start;
        gap: 20px;

        &__name {
            font-size: 21px;
        }
    }

    .streak-card {
        width: 100%;
    }
}
</style>
