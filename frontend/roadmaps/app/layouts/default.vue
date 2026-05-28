<template>
    <div class="layout">
        <Cover />
        <div class="layout__content">
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
}
</style>
