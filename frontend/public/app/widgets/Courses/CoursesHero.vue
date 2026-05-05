<template>
    <div class="hero">
        <div class="hero__lbl">// каталог_курсов</div>
        <div class="hero__title">Все курсы</div>
        <p class="hero__sub">
            {{ totalCoursesCount }} тщательно подобранных курсов — от базовых до продвинутых — с
            интерактивными упражнениями и реальным кодом.
        </p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    totalCoursesCount: number;
}>();
</script>

<style lang="scss" scoped>
.hero {
    width: 100%;
    padding: 28px 28px 20px;

    border-bottom: 1px solid var(--b1);
    background: linear-gradient(180deg, rgba(79, 156, 255, 0.04) 0%, transparent 100%);

    animation: fadeUp 0.4s ease both;

    &__lbl {
        margin-bottom: 6px;

        font-family: var(--sm);
        font-size: 9px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--blue);
    }

    &__title {
        margin-bottom: 6px;

        font-size: 30px;
        font-weight: 900;
        letter-spacing: -0.02em;
    }

    &__sub {
        margin-bottom: 14px;

        font-size: 13px;
        color: var(--muted);
    }
}
</style>
