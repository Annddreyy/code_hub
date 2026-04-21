<template>
    <div class="layout">
        <Cover />
        <div class="layout__content">
            <aside
                id="sidebar"
                class="layout__sidebar"
            />
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.layout {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;

    &__content {
        display: flex;
        height: 100dvh;
    }

    &__sidebar {
        width: 220px;
        flex-shrink: 0;
        padding: 18px 12px 24px;

        display: flex;
        flex-direction: column;

        background: var(--s1);
        border-right: 1px solid var(--b1);

        overflow-y: auto;
        z-index: 1;

        &::-webkit-scrollbar {
            width: 3px;
        }

        &::-webkit-scrollbar-thumb {
            background: var(--s3);
        }
    }
}

@media (max-width: 768px) {
    .layout {
        &__sidebar {
            display: none;
        }
    }
}
</style>
