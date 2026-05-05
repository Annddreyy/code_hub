<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useUserStore } from './entities/user';

const userStore = useUserStore();
await useAsyncData('user', () => userStore.getCurrentUser());
</script>

<style lang="scss">
@use '@/styles/index.scss';
</style>
