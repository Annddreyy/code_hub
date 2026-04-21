<template>
    <div class="leaderboard-row">
        <span class="leaderboard-row__num">{{ position }}</span>
        <div class="leaderboard-row__user">
            <div
                class="leaderboard-row__avatar"
                style="background: linear-gradient(135deg, #6366f1, #8b5cf6)"
            >
                {{ name[0] }}
            </div>
            <div class="leaderboard-row__uinfo">
                <div class="leaderboard-row__name">{{ name }}</div>
            </div>
        </div>
        <span class="leaderboard-row__xp">{{ xp }}</span>
        <span class="leaderboard-row__solved">{{ challengesSolved }}</span>
        <span class="leaderboard-row__streak">🔥 {{ streak }}</span>
        <span class="leaderboard-row__delta delta-up">{{ posDeltaSymbol }} {{ posDelta }}</span>
    </div>
</template>

<script setup lang="ts">
import type { User } from '../model/user';

const { position } = defineProps<User>();

const posDelta = computed(() => position.currentPositon - position.prevPosition);
const posDeltaSymbol = computed(() => {
    if (posDelta.value > 0) {
        return '↑';
    } else if (posDelta.value < 0) {
        return '↓';
    } else {
        return '-';
    }
});
</script>
