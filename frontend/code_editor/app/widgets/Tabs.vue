<template>
    <div class="challenge-tabs">
        <button
            :class="[
                'challenge-tabs__tab',
                { 'challenge-tabs__tab--active': currentTab === ETabs.DESCRIPTION },
            ]"
            @click="setCurrentTab(ETabs.DESCRIPTION)"
        >
            Описание
        </button>
        <button
            :class="[
                'challenge-tabs__tab',
                { 'challenge-tabs__tab--active': currentTab === ETabs.SOLUTIONS },
            ]"
            @click="setCurrentTab(ETabs.SOLUTIONS)"
        >
            Решения
        </button>
        <button
            :class="[
                'challenge-tabs__tab',
                { 'challenge-tabs__tab--active': currentTab === ETabs.HINTS },
            ]"
            @click="setCurrentTab(ETabs.HINTS)"
        >
            Подсказки
        </button>
    </div>
</template>

<script setup lang="ts">
enum ETabs {
    DESCRIPTION = 'description',
    SOLUTIONS = 'solutions',
    HINTS = 'hints',
}

const emit = defineEmits<{
    setTab: [tab: ETabs];
}>();

const currentTab = ref<ETabs>(ETabs.DESCRIPTION);

const setCurrentTab = (tab: ETabs) => {
    currentTab.value = tab;
    emit('setTab', tab);
};
</script>

<style lang="scss" scoped>
.challenge-tabs {
    position: sticky;
    top: 88px;
    left: 0;

    display: flex;
    flex-shrink: 0;

    border-bottom: 1px solid var(--b1);
    background: var(--s1);

    z-index: 1;

    &__tab {
        padding: 9px 16px;

        font-family: var(--spaced);
        font-size: 9px;
        font-weight: 700;
        color: var(--muted);

        border: none;
        border-bottom: 2px solid transparent;

        background: transparent;
        cursor: pointer;

        transition: all 0.15s;

        &:hover {
            color: var(--text);
        }

        &--active {
            color: var(--blue);
            border-bottom-color: var(--blue);
        }
    }
}
</style>
