<template>
    <div class="stats-strip">
        <div class="stat">
            <div class="stat__val stat__val--blue">{{ inProgressCount }}</div>
            <div class="stat__lbl">В процессе</div>
        </div>
        <div class="stat">
            <div class="stat__val stat__val--green">{{ completedCount }}</div>
            <div class="stat__lbl">Завершено</div>
        </div>
        <div class="stat">
            <div class="stat__val stat__val--yellow">{{ xpEarned }}</div>
            <div class="stat__lbl">XP заработано</div>
        </div>
        <div class="stat">
            <div class="stat__val stat__val--purple">{{ nodesCompleted }}</div>
            <div class="stat__lbl">Узлов пройдено</div>
        </div>
        <div class="stat">
            <div class="stat__val stat__val--orange">{{ roadmapsCount }}</div>
            <div class="stat__lbl">Роадмапов всего</div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    inProgressCount: number;
    completedCount: number;
    xpEarned: number;
    nodesCompleted: number;
    roadmapsCount: number;
}>();
</script>

<style lang="scss" scoped>
.stats-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    margin-bottom: 20px;

    border: 1px solid var(--b1);
    border-radius: 10px;

    overflow: hidden;
}

.stat {
    min-width: 100px;
    flex: 1;
    padding: 10px 16px;

    text-align: center;

    border-right: 1px solid var(--b1);
    background: var(--s1);

    &:last-child {
        border: none;
    }

    &__val {
        margin-bottom: 3px;

        font-family: var(--spaced);
        font-size: 18px;
        font-weight: 700;
        line-height: 1;

        &--blue {
            color: var(--blue);
        }

        &--green {
            color: var(--green);
        }

        &--yellow {
            color: var(--yellow);
        }

        &--purple {
            color: var(--purple);
        }

        &--orange {
            color: var(--orange);
        }
    }

    &__lbl {
        font-family: var(--spaced);
        font-size: 8px;
        color: var(--muted);
    }
}
</style>
