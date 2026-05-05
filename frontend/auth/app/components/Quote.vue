<template>
    <q class="quote">
        <div class="quote__text">
            За 14 месяцев CodeHub помог мне пройти путь от выпускника учебного центра до старшего
            инженера в Stripe. Структурированные дорожные карты не похожи ни на что другое.
        </div>
        <div class="quote__author">
            <div class="quote__avatar">M</div>
            <div>
                <div class="quote__name">Марина К.</div>
                <div class="quote__role">Старший разработчик @Stripe</div>
            </div>
        </div>
    </q>
</template>

<style lang="scss" scoped>
.quote {
    display: block;
    max-width: 460px;
    margin-top: 36px;

    animation: fadeUp 0.7s 0.3s ease both;
    opacity: 0;

    &::before,
    &::after {
        display: none;
    }

    &__text {
        position: relative;

        margin-bottom: 10px;
        padding-left: 16px;

        font-size: 13px;
        font-style: italic;
        line-height: 1.7;
        color: var(--muted);

        &::before {
            position: absolute;
            content: '"';
            left: 0;
            top: -4px;

            font-size: 24px;
            font-style: normal;
            line-height: 1;
            color: var(--blue);
        }
    }

    &__author {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    &__avatar {
        width: 30px;
        height: 30px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 50%;
        background: linear-gradient(135deg, var(--blue), var(--purple));

        font-size: 11px;
        font-weight: 700;
    }

    &__name {
        font-family: var(--spaced);
        font-size: 10px;
        font-weight: 700;
    }

    &__role {
        font-family: var(--spaced);
        font-size: 9px;
        color: var(--muted);
    }
}

@media (max-width: 1280px) {
    .quote {
        display: none;
    }
}
</style>
