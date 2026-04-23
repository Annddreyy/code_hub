<template>
    <div class="socials">
        <button class="socials__btn">
            <img
                class="socials__ico"
                :src="githubIcon"
            />GitHub
        </button>
        <button class="socials__btn">
            <img
                class="socials__ico"
                :src="googleIcon"
            />Google
        </button>
    </div>
    <div class="socials__info">
        <div class="socials__txt">Или продолжить с email</div>
    </div>
</template>

<script setup lang="ts">
import githubIcon from './github.png';
import googleIcon from './google.png';
</script>

<style lang="scss" scoped>
.socials {
    display: flex;
    gap: 10px;

    margin-bottom: 20px;

    &__btn {
        flex: 1;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        padding: 11px;

        border-radius: 8px;
        border: 1px solid var(--b2);

        font-family: var(--spaced);
        font-size: 11px;
        font-weight: 700;
        color: var(--text);

        background: var(--s2);
        cursor: pointer;

        transition: all 0.2s;

        &:hover {
            border-color: var(--b3);
            background: var(--s3);
        }
    }

    &__info {
        padding-bottom: 14px;
    }

    &__ico {
        width: 20px;
        height: 20px;
    }

    &__txt {
        font-family: var(--spaced);
        color: var(--dim);
    }
}

@media (max-width: 1220px) {
    .socials {
        gap: 8px;
        margin-bottom: 16px;

        &__btn {
            gap: 6px;
            padding: 10px;

            font-size: 10px;

            border-radius: 7px;
            transition: all 0.2s;
        }
    }
}

@media (max-width: 768px) {
    .socials {
        &__btn {
            gap: 7px;
            padding: 12px;

            font-size: 11px;
            border-radius: 9px;
        }
    }
}
</style>
