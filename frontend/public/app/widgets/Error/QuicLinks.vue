<template>
    <div class="quick-links">
        <div class="quick-links__label">// популярные страницы</div>
        <div class="quick-links__row">
            <NuxtLink
                href="/roadmaps"
                class="quick-links__item"
            >
                🗺️ Дорожные карты
            </NuxtLink>
            <NuxtLink
                href="/leaderboard"
                class="quick-links__item"
            >
                🏆 Таблица лидеров
            </NuxtLink>
            <NuxtLink
                href="/profile"
                class="quick-links__item"
            >
                👤 Профиль
            </NuxtLink>
            <NuxtLink
                href="/settings"
                class="quick-links__item"
            >
                ⚙️ Настройки
            </NuxtLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.quick-links {
    animation: fadeUp 0.6s ease 0.6s both;

    &__label {
        margin-bottom: 10px;

        font-family: var(--spaced);
        font-size: 8px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--dim);
    }

    &__row {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 8px;
    }

    &__item {
        padding: 7px 14px;

        display: inline-flex;
        align-items: center;
        gap: 6px;

        font-family: var(--spaced);
        font-size: 10px;
        font-weight: 700;
        text-decoration: none;
        color: var(--muted);

        border: 1px solid var(--b1);
        border-radius: 8px;

        background: var(--s1);
        cursor: pointer;

        transition: all 0.15s;

        &:hover {
            color: var(--blue);
            border-color: rgba(79, 156, 255, 0.25);
            background: rgba(79, 156, 255, 0.05);
        }
    }
}
</style>
