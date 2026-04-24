<template>
    <div class="terminal">
        <div class="terminal__bar">
            <div class="dot dot--red" />
            <div class="dot dot--yellow" />
            <div class="dot dot--green" />
            <div class="terminal__title">
                codehub — bash<span class="hide-on-tablet"> — 80×24</span>
            </div>
        </div>
        <div class="terminal__body">
            <div class="terminal__line">
                <span class="terminal__prompt"
                    ><span class="hide-on-tablet">user@codehub:</span>~$</span
                ><span class="terminal__cmd">whoami</span>
            </div>
            <div class="terminal__line">
                <span class="terminal__out"
                    >alex_dev · старший
                    <span class="hide-on-tablet">Frontend </span>разработчик</span
                >
            </div>
            <div class="terminal__line">&nbsp;</div>
            <div class="terminal__line">
                <span class="terminal__prompt">
                    <span class="hide-on-tablet">user@codehub:</span>
                    ~$
                </span>
                <span class="terminal__cmd">
                    <span class="hide-on-tablet">codehub </span>
                    статистика
                </span>
            </div>
            <div class="terminal__line">
                <span class="terminal__cyan"><span class="hide-on-tablet">✦ </span>streak:</span
                ><span class="terminal__out"> 47 дней 🔥</span>
            </div>
            <div class="terminal__line">
                <span class="terminal__cyan"><span class="hide-on-tablet">✦ </span>solved:</span
                ><span class="terminal__out"> 312 задач</span>
            </div>
            <div class="terminal__line">
                <span class="terminal__cyan"><span class="hide-on-tablet">✦ </span>rank:</span
                ><span class="terminal__out"> топ 3% по всему миру</span>
            </div>
            <div class="terminal__line">
                <span class="terminal__cyan"><span class="hide-on-tablet">✦ </span>xp:</span
                ><span class="terminal__yellow">
                    18 450<span class="hide-on-tablet"> / 20 000</span></span
                >
            </div>
            <div class="hide-on-tablet">
                <div class="terminal__line">&nbsp;</div>
                <div class="terminal__line">
                    <span class="terminal__prompt">user@codehub:~$</span
                    ><span class="terminal__cmd"> git log --oneline -3</span>
                </div>
                <div class="terminal__line">
                    <span class="terminal__ok">a3f2c1b</span
                    ><span class="terminal__out"> Задача решена: дерево двоичного поиска</span>
                </div>
                <div class="terminal__line">
                    <span class="terminal__ok">e9d4a07</span
                    ><span class="terminal__out"> Завершено: модуль React Hooks</span>
                </div>
                <div class="terminal__line">
                    <span class="terminal__ok">7b1f3e2</span
                    ><span class="terminal__out"> Пройдено: испытание CSS Grid</span>
                </div>
            </div>
            <div class="terminal__line">&nbsp;</div>
            <div class="terminal__line">
                <span class="terminal__prompt"
                    ><span class="hide-on-tablet">user@codehub:</span>~$</span
                ><span class="terminal__cursor" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.terminal {
    width: 100%;
    max-width: 560px;

    background: var(--s1);
    border: 1px solid var(--b2);
    border-radius: 12px;

    overflow: hidden;
    animation: fadeUp 0.6s ease both;
    box-shadow:
        0 24px 80px rgba(0, 0, 0, 0.6),
        0 0 0 1px rgba(79, 156, 255, 0.06);

    &__bar {
        display: flex;
        align-items: center;
        gap: 6px;

        padding: 12px 16px;

        background: var(--s2);
        border-bottom: 1px solid var(--b1);
    }

    .dot {
        width: 11px;
        height: 11px;

        border-radius: 50%;

        &--red {
            background: #ff5c72;
        }

        &--yellow {
            background: #e3b341;
        }

        &--green {
            background: #3fb950;
        }
    }

    &__title {
        margin-left: 8px;

        font-family: var(--spaced);
        font-size: 11px;
        color: var(--muted);
    }

    &__body {
        padding: 20px 22px;

        font-family: var(--mono);
        font-size: 12px;
        line-height: 1.7;
    }

    &__line {
        display: flex;
        gap: 10px;

        min-height: 20.4px;
    }

    &__prompt {
        flex-shrink: 0;

        color: var(--green);
    }

    &__cmd {
        color: var(--text);
    }

    &__out {
        color: var(--muted);
    }

    &__ok {
        color: var(--green);
    }

    &__blue {
        color: var(--blue);
    }

    &__cyan {
        color: var(--cyan);
    }

    &__yellow {
        color: var(--yellow);
    }

    &__cursor {
        &::after {
            content: '█';
            animation: blink 1.1s step-end infinite;

            font-size: 11px;
            color: var(--blue);
        }
    }
}

@media (max-width: 1280px) {
    .terminal {
        border-radius: 10px;
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);

        &__bar {
            gap: 5px;
            padding: 10px 14px;
        }

        .dot {
            width: 9px;
            height: 9px;
        }

        &__title {
            font-size: 10px;
            margin-left: 6px;
        }

        &__body {
            padding: 14px 16px;
            font-size: 11px;
            line-height: 1.65;
        }
    }

    .tl {
        display: flex;
        gap: 8px;
        min-height: 18.2px;
    }
    .tcursor::after {
        font-size: 10px;
    }
}
</style>
