<template>
    <div class="actions">
        <NuxtLink
            to="/"
            class="actions__btn actions__btn--primary"
        >
            🏠 На главную
        </NuxtLink>
        <NuxtLink
            to="/courses"
            class="actions__btn actions__btn--ghost"
        >
            📚 Курсы
        </NuxtLink>
        <NuxtLink
            to="/challenges"
            class="actions__btn actions__btn--ghost"
        >
            ⚡ Задачи
        </NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
.actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;

    margin-bottom: 32px;

    animation: fadeUp 0.6s ease 0.5s both;

    &__btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;

        padding: 12px 24px;

        font-family: var(--sans);
        font-size: 14px;
        font-weight: 700;
        text-decoration: none;

        border-radius: 10px;

        cursor: pointer;
        transition: all 0.2s;

        &--primary {
            color: #fff;
            border: none;
            background: linear-gradient(135deg, var(--blue), #3d7de8);

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(79, 156, 255, 0.35);
            }
        }

        &--ghost {
            color: var(--muted);
            border: 1px solid var(--b2);
            background: transparent;

            &:hover {
                color: var(--text);
                border-color: var(--b2);
                background: var(--b1);

                transform: translateY(-1px);
            }
        }
    }
}

@media (max-width: 768px) {
    .actions {
        &__btn {
            font-size: 12px;
            padding: 8px 12px;
        }
    }
}
</style>
