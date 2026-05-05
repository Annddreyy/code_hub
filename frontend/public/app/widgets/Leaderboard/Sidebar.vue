<template>
    <RankCard v-bind="currentUser" />
    <Teleport
        v-if="isMounted"
        to="#time-period"
        :disabled="teleportDisabled"
    >
        <Filters @select-period="(period: LeaderboardPeriod) => $emit('selectPeriod', period)" />
    </Teleport>
</template>

<script setup lang="ts">
import { useUserStore, RankCard, type LeaderboardPeriod } from '@/entities/user';
import { Filters } from '@/widgets/Leaderboard';
import { MOBILE_BREAKPOINT } from '@/constants';

defineEmits(['selectPeriod']);

const { currentUser } = useUserStore();

const isMounted = ref(false);
const teleportDisabled = ref(true);

const handleResize = () => {
    teleportDisabled.value = window.innerWidth > MOBILE_BREAKPOINT;
};

onMounted(() => {
    isMounted.value = true;
    handleResize();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>
