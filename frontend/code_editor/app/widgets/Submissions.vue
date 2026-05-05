<template>
    <div class="submissions">
        <SubmissionCard
            v-for="submission in submissions"
            :key="submission.id"
            :submission
        />
    </div>
</template>

<script setup lang="ts">
import { SubmissionCard, type Submission } from '@/entities/challenge';

defineProps<{
    submissions: Submission[];
}>();
</script>

<style lang="scss" scoped>
.submissions {
    display: flex;
    flex-direction: column;
    gap: 15px;

    padding: 16px;
}
</style>
