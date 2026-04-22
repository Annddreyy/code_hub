<template>
    <div class="code-display">
        <div class="code-display__scanline" />
        <div class="code-display__big-num">{{ code }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    code: number;
}>();
</script>

<style lang="scss" scoped>
@keyframes scanline {
    0% {
        top: -10%;
    }
    100% {
        top: 110%;
    }
}

.code-display {
    position: relative;

    display: inline-block;
    margin-bottom: 8px;

    &__scanline {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;

        height: 2px;

        background: linear-gradient(90deg, transparent, rgba(79, 156, 255, 0.3), transparent);

        pointer-events: none;
        z-index: 3;

        animation: scanline 3s linear infinite;
    }

    &__big-num {
        position: relative;

        font-family: var(--spaced);
        font-size: clamp(80px, 18vw, 160px);
        font-weight: 700;
        line-height: 1;
        letter-spacing: -4px;
        color: var(--text);

        animation: countUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
}
</style>
