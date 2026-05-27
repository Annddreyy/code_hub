<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useUserStore } from './entities/user';

const cookieHeaders = import.meta.server ? useRequestHeaders(['cookie']) : {};

const userStore = useUserStore();
await useAsyncData(() => userStore.getCurrentUser(cookieHeaders));
</script>

<style lang="scss">
@use '@/styles/index.scss';
</style>
