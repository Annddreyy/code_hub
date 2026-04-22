<template>
    <div class="hero">
        <div class="hero__num">{{ unlockedAchievements }}</div>
        <div>
            <div class="hero__info">
                <h2>Достижений разблокировано</h2>
                <p>из {{ totalAchievements }} · Продолжайте, чтобы разблокировать все!</p>
            </div>
            <div class="hero__prog">
                <div class="hero__track">
                    <div
                        class="hero__fill"
                        :style="`width: ${progress}%`"
                    />
                </div>
                <div class="hero__lbl">{{ progress }}% выполнено</div>
            </div>
        </div>
        <div class="hero__icon">🏆</div>
    </div>
</template>

<script setup lang="ts">
const { totalAchievements, unlockedAchievements } = defineProps<{
    totalAchievements: number;
    unlockedAchievements: number;
}>();

const progress = computed(() => Math.round((unlockedAchievements / totalAchievements) * 100));
</script>

<style lang="scss" scoped>
.hero {
    display: flex;
    align-items: center;
    gap: 20px;

    margin-bottom: 24px;
    padding: 22px;

    border: 1px solid rgba(188, 140, 255, 0.15);
    border-radius: 14px;

    background: linear-gradient(135deg, rgba(188, 140, 255, 0.06), rgba(79, 156, 255, 0.04));

    &__num {
        font-family: var(--spaced);
        font-size: 52px;
        font-weight: 700;
        line-height: 1;
        color: var(--purple);
    }

    &__info {
        h2 {
            margin-bottom: 4px;

            font-size: 20px;
            font-weight: 800;
        }

        p {
            font-family: var(--spaced);
            font-size: 10px;
            color: var(--muted);
        }
    }

    &__prog {
        width: 300px;
        margin-top: 12px;
    }

    &__track {
        height: 6px;
        margin-bottom: 4px;

        border-radius: 3px;
        background: var(--s3);

        overflow: hidden;
    }

    &__fill {
        height: 100%;

        border-radius: 3px;
        background: linear-gradient(90deg, var(--purple), var(--blue));
    }

    &__lbl {
        font-family: var(--spaced);
        font-size: 8px;
        color: var(--muted);
    }

    &__icon {
        margin-left: auto;
        font-size: 52px;
    }
}

@media (max-width: 1220px) {
    .hero {
        &__info {
            h2 {
                font-size: 16px;
            }
        }

        &__icon {
            font-size: 26px;
        }
    }
}

@media (max-width: 768px) {
    .hero {
        &__icon {
            display: none;
        }

        &__prog {
            max-width: 300px;
            width: auto;
        }
    }
}
</style>
