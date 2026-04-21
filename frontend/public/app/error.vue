<template>
    <main>
        <CodeDisplay :code="error?.status || SERVER_ERROR" />
        <StatusBadge :error-text="error?.statusText || 'Ошибка сервера'" />
        <Terminal />
        <Actions />
        <QuicLinks />
    </main>
</template>

<script setup lang="ts">
import { Actions, CodeDisplay, QuicLinks, StatusBadge, Terminal } from '@/widgets/Error';
import type { NuxtError } from '#app';

const SERVER_ERROR = 500;

defineProps({
    error: Object as () => NuxtError,
});
</script>

<style lang="scss" scoped>
main {
    position: relative;
    max-width: 100vw;
    min-height: 100vh;
    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;

    z-index: 10;

    animation: fadeUp 0.6s ease;
}
</style>
