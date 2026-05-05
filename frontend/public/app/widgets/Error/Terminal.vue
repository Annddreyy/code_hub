<template>
    <div class="terminal">
        <div class="terminal__bar">
            <div class="terminal__dot td1" />
            <div class="terminal__dot td2" />
            <div class="terminal__dot td3" />
            <div class="terminal__title">terminal — codehub</div>
        </div>
        <div class="terminal__line">
            <span class="terminal__prompt">codehub@web:~$</span>
            <span class="terminal__cmd"> GET /this-page-doesnterminal__exist</span>
        </div>
        <div class="terminal__line">
            <span class="terminal__err">✗ Ошибка: </span>
            <span>Маршрут не найден в обучающей матрице</span>
        </div>
        <div class="terminal__line">
            <span class="terminal__dim">→</span> В поисках алтернативы...
        </div>
        <div class="terminal__line">
            <span class="terminal__ok">→</span> Предложение: вернитесь на страницу
            <span class="terminal__cmd">/</span>
        </div>
        <div class="terminal__line">
            <span class="terminal__prompt">codehub@web:~$</span>
            <div class="terminal__cursor" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.terminal {
    position: relative;
    margin-bottom: 28px;
    padding: 16px 20px;

    text-align: left;

    border: 1px solid var(--b2);
    border-radius: 12px;

    background: rgba(6, 9, 13, 0.9);
    overflow: hidden;

    animation: fadeUp 0.6s ease 0.2s both;

    &::before {
        position: absolute;
        content: '';

        inset: 0;
        background: linear-gradient(135deg, rgba(79, 156, 255, 0.02), transparent);

        pointer-events: none;
    }

    &__bar {
        display: flex;
        align-items: center;
        gap: 6px;

        margin-bottom: 12px;
        padding-bottom: 10px;

        border-bottom: 1px solid var(--b1);
    }

    &__dot {
        width: 10px;
        height: 10px;

        border-radius: 50%;
    }
    .td1 {
        background: var(--red);
    }
    .td2 {
        background: var(--yellow);
    }
    .td3 {
        background: var(--green);
    }

    &__title {
        margin: 0 auto;

        font-family: var(--spaced);
        font-size: 10px;
        color: var(--dim);

        transform: translateX(22px);
    }

    &__line {
        font-family: var(--mono);
        font-size: 13px;
        line-height: 1.8;
        color: var(--muted);
    }

    &__prompt {
        color: var(--blue);
    }

    &__cmd {
        color: var(--text);
    }

    &__err {
        color: var(--red);
    }

    &__ok {
        color: var(--green);
    }

    &__dim {
        color: var(--dim);
    }

    &__cursor {
        display: inline-block;

        width: 8px;
        height: 15px;
        margin-left: 2px;

        vertical-align: middle;

        border-radius: 1px;
        background: var(--blue);

        animation: blink 1.1s ease-in-out infinite;
    }
}
</style>
