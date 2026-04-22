<template>
    <div class="status-badge">
        <div class="status-dot" />
        {{ errorText }}
    </div>
</template>

<script setup lang="ts">
defineProps<{
    errorText: string;
}>();
</script>

<style lang="scss" scoped>
@keyframes blink {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}

.status-badge {
    margin-bottom: 20px;
    padding: 5px 14px;

    display: inline-flex;
    align-items: center;
    gap: 6px;

    font-family: var(--spaced);
    font-size: 11px;
    font-weight: 700;
    color: var(--red);

    border: 1px solid rgba(255, 92, 114, 0.25);
    border-radius: 20px;

    background: rgba(255, 92, 114, 0.08);

    animation: fadeUp 0.6s ease 0.1s both;

    .status-dot {
        width: 6px;
        height: 6px;

        border-radius: 50%;
        background: var(--red);

        animation: blink 1s ease-in-out infinite;
    }
}
</style>
