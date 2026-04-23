<template>
    <div class="stats">
        <div class="stats__one-stat">
            <div class="stats__val">50K<span class="hide-on-tablet">+</span></div>
            <div class="stats__lbl">Разработчиков</div>
        </div>
        <div class="stats__one-stat">
            <div class="stats__val stats__val--green">312</div>
            <div class="stats__lbl">Задач</div>
        </div>
        <div class="stats__one-stat">
            <div class="stats__val stats__val--purple">4.9★</div>
            <div class="stats__lbl">Оценка</div>
        </div>
        <div class="hide-on-tablet">
            <div class="stats__one-stat">
                <div class="stats__val stats__val--orange">94%</div>
                <div class="stats__lbl">Нашли работу</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.stats {
    display: flex;
    gap: 24px;

    margin-top: 40px;

    animation: fadeUp 0.7s 0.2s ease both;
    opacity: 0;

    &__one-stat {
        text-align: center;
    }

    &__val {
        font-family: var(--spaced);
        font-size: 22px;
        font-weight: 700;
        line-height: 1;
        color: var(--blue);

        &--green {
            color: var(--green);
        }

        &--purple {
            color: var(--purple);
        }

        &--orange {
            color: var(--orange);
        }
    }

    &__lbl {
        margin-top: 4px;

        font-family: var(--spaced);
        font-size: 9px;
        letter-spacing: 0.08em;
        color: var(--muted);
    }
}

@media (max-width: 1220px) {
    .stats {
        width: 100%;
        gap: 16px;
        margin-top: 24px;

        &__one-stat {
            flex: 1;
            padding: 10px 8px;

            background: var(--s2);

            border: 1px solid var(--b1);
            border-radius: 8px;
        }

        &__val {
            font-size: 16px;
            margin-bottom: 3px;
        }

        &__lbl {
            font-size: 7px;
            letter-spacing: 0.06em;
        }
    }
}

@media (max-width: 768px) {
    .stats {
        margin-top: 4px;
        gap: 20px;
        &__one-stat {
            background: none;
            border: none;
        }
    }
}
</style>
