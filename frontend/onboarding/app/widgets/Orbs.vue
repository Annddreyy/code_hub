<template>
    <div>
        <div class="orb orb--1" />
        <div class="orb orb--2" />
    </div>
</template>

<style lang="scss" scoped>
.orb {
    position: fixed;

    border-radius: 50%;

    filter: blur(90px);
    pointer-events: none;

    z-index: 0;

    &--1 {
        width: 500px;
        height: 500px;

        top: -100px;
        right: -100px;

        background: radial-gradient(circle, rgba(79, 156, 255, 0.12), transparent 70%);
    }

    &--2 {
        width: 400px;
        height: 400px;

        bottom: -50px;
        left: -100px;

        background: radial-gradient(circle, rgba(188, 140, 255, 0.1), transparent 70%);
    }
}
</style>
