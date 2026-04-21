<template>
    <div class="layout">
        <Cover />
        <div class="layout__content">
            <aside class="sidebar">
                <div class="sidebar__nav">
                    <div class="nav-section">
                        <div class="nav-section__label">// Аккаунт</div>
                        <NuxtLink
                            class="nav-section__link active"
                            :to="`${BASE_PATH}/`"
                        >
                            <span class="nav-section__ico">👤</span>
                            Профиль
                        </NuxtLink>
                        <NuxtLink
                            class="nav-section__link"
                            :to="`${BASE_PATH}achievements`"
                        >
                            <span class="nav-section__ico">🏆</span>
                            Ачивки
                        </NuxtLink>
                        <NuxtLink
                            class="nav-section__link"
                            :to="`${BASE_PATH}settings`"
                        >
                            <span class="nav-section__ico">⚙️</span>
                            Настройки
                        </NuxtLink>
                    </div>
                </div>
            </aside>
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
const BASE_PATH = useRuntimeConfig().public.basePath;

onMounted(() => console.log(100))
</script>

<style lang="scss" scoped>
.layout {
    position: relative;

    display: flex;
    flex-direction: column;
    flex: 1;

    overflow: hidden;
    z-index: 1;

    &__content {
        display: flex;
    }
}

main {
    display: flex;
    flex-direction: column;
    flex: 1;

    padding: 28px 32px 60px;

    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--s2);
        border-radius: 3px;
    }
}

.sidebar {
    width: 260px;

    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    border-right: 1px solid var(--b1);

    background: var(--s1);
    overflow: hidden;

    &__nav {
        flex: 1;
        padding: 12px 14px;
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 3px;
        }

        &::-webkit-scrollbar-thumb {
            background: var(--s3);
        }
    }
}

.nav-section {
    margin-bottom: 20px;

    &__label {
        margin-bottom: 8px;

        font-family: var(--spaced);
        font-size: 8px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--dim);
    }

    &__link {
        display: flex;
        align-items: center;
        gap: 9px;

        margin-bottom: 2px;
        padding: 9px 11px;

        font-size: 13px;
        font-weight: 600;
        text-decoration: none;
        color: var(--muted);

        border-left: 2px solid transparent;
        border-radius: 8px;

        cursor: pointer;
        transition: all 0.15s;

        &:hover {
            color: var(--text);
            background: rgba(255, 255, 255, 0.03);
        }

        &.router-link-active {
            color: var(--blue);
            background: rgba(79, 156, 255, 0.07);
            border-left-color: var(--blue);
        }
    }

    &__ico {
        width: 22px;

        font-size: 15px;
        text-align: center;
    }
}

@media (max-width: 768px) {
    .sidebar {
        display: none;
    }

    main {
        padding: 14px 16px 100px;
    }
}
</style>
