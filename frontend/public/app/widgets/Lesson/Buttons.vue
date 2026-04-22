<template>
    <nav class="buttons">
        <NuxtLink
            :to="prevLessonLink"
            class="button"
        >
            <div class="button__dir">← Назад</div>
            <div class="button__name">{{ prevLessonTitle }}</div>
        </NuxtLink>
        <NuxtLink
            :to="nextLessonLink"
            class="button button--right"
        >
            <div class="button__dir">Дальше →</div>
            <div class="button__name">{{ nextLessonTitle }}</div>
        </NuxtLink>
    </nav>
</template>

<script setup lang="ts">
defineProps<{
    prevLessonLink: `/${string}`;
    prevLessonTitle: string;
    nextLessonLink: `/${string}`;
    nextLessonTitle: string;
}>();
</script>

<style lang="scss" scoped>
.buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    margin-top: 40px;
    padding-top: 32px;

    border-top: 1px solid var(--b1);

    .button {
        display: block;
        padding: 16px 20px;

        text-decoration: none;

        border: 1px solid var(--b1);
        border-radius: 10px;

        background: var(--s1);

        transition: all 0.2s;

        &:hover {
            transform: translateY(-1px);

            border-color: var(--b2);
            background: var(--s2);
        }

        &--right {
            text-align: right;
        }

        &__dir {
            margin-bottom: 5px;

            font-family: 'Space Mono', monospace;
            font-size: 8px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--muted);
        }

        &__name {
            font-size: 14px;
            font-weight: 700;
            color: var(--text);
        }
    }
}

@media (max-width: 768px) {
    .buttons {
        margin-top: 16px;
    }
}
</style>
