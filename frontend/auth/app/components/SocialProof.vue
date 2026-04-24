<template>
    <div class="social-proof">
        <div class="social-proof__avatars">
            <div class="social-proof__avatar social-proof__avatar--purple">А</div>
            <div class="social-proof__avatar social-proof__avatar--green">Л</div>
            <div class="social-proof__avatar social-proof__avatar--red">Р</div>
            <div class="social-proof__avatar social-proof__avatar--orange">Д</div>
        </div>
        <div class="social-proof__text">
            <strong>2 847 разработчиков</strong> присоединилось на этой неделе. Стань одним из них.
        </div>
    </div>
</template>

<style lang="scss" scoped>
.social-proof {
    position: relative;
    flex-shrink: 0;

    display: none;
    align-items: center;
    gap: 12px;

    padding: 12px 18px;

    background: var(--s1);
    border-top: 1px solid var(--b1);

    z-index: 1;

    &__avatars {
        display: flex;
    }

    &__avatar {
        width: 24px;
        height: 24px;
        margin-left: -6px;

        display: flex;
        align-items: center;
        justify-content: center;

        border: 2px solid var(--bg);
        border-radius: 50%;

        font-size: 9px;
        font-weight: 700;

        &:first-child {
            margin-left: 0;
        }

        &--purple {
            background: linear-gradient(135deg, #4f9cff, #bc8cff);
        }

        &--green {
            background: linear-gradient(135deg, #3fb950, #39d4c8);
        }

        &--red {
            background: linear-gradient(135deg, #ff8c42, #ff5c72);
        }

        &--orange {
            background: linear-gradient(135deg, #e3b341, #ffa657);
        }
    }

    &__text {
        flex: 1;

        font-family: var(--spaced);
        font-size: 9px;
        line-height: 1.4;
        color: var(--muted);

        strong {
            color: var(--text);
        }
    }
}

@media (max-width: 768px) {
    .social-proof {
        display: flex;
    }
}
</style>
