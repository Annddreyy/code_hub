<template>
    <div class="tabs">
        <button
            :class="['tab', { 'tab--on': inProgress === undefined }]"
            @click="setInProgressValue(undefined)"
        >
            Все
            <span class="tab__count">{{ totalCount }}</span>
        </button>
        <button
            :class="['tab', { 'tab--on': inProgress }]"
            @click="setInProgressValue(true)"
        >
            В прогрессе
            <span class="tab__count">{{ inProgressCount }}</span>
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    totalCount: number;
    inProgressCount: number;
}>();

const emit = defineEmits<{
    updateInProgress: [value: true | undefined];
}>();

const inProgress = ref<true | undefined>(undefined);

const setInProgressValue = (status: true | undefined) => {
    inProgress.value = status;
    emit('updateInProgress', status);
};
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;
    gap: 0;
    flex-shrink: 0;

    padding: 0 28px;

    border-bottom: 1px solid var(--b1);
    background: var(--s1);

    .tab {
        padding: 12px 16px;

        font-family: var(--sm);
        font-size: 10px;
        font-weight: 700;
        white-space: nowrap;
        color: var(--muted);

        border: none;
        border-bottom: 2px solid transparent;

        background: none;

        cursor: pointer;
        transition: all 0.15s;

        &--on {
            color: var(--blue);
            border-bottom-color: var(--blue);
        }

        &:hover {
            &:not(.tab--on) {
                color: var(--text2);
            }
        }

        &__count {
            margin-left: 4px;
            padding: 1px 5px;

            font-size: 8px;
            color: var(--blue);

            border-radius: 3px;
            background: rgba(79, 156, 255, 0.12);
        }
    }
}
</style>
