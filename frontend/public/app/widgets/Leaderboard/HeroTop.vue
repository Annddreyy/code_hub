<template>
    <section class="hero">
        <div class="hero__top">
            <div class="podium">
                <div class="podium__crown podium__crown--second">🥈</div>
                <div class="podium__avatar">
                    <div class="podium__avatar-inner podium__avatar-inner--second">
                        {{ secondPlace.name[0] }}
                    </div>
                    <div class="podium__badge podium__badge--second">2</div>
                </div>
                <div class="podium__name">{{ secondPlace.name }}</div>
                <div class="podium__xp podium__xp--second">{{ secondPlace.xp }} XP</div>
                <div class="podium__platform-wrapper podium__platform-wrapper--second">
                    <div class="podium__platform podium__platform--second">2</div>
                </div>
            </div>
            <div class="podium podium--big">
                <div class="podium__crown podium__crown--first">👑</div>
                <div class="podium__avatar">
                    <div class="podium__avatar-inner podium__avatar-inner--first">
                        {{ firstPlace.name[0] }}
                    </div>
                    <div class="podium__badge podium__badge--first">1</div>
                </div>
                <div class="podium__name">{{ firstPlace.name }}</div>
                <div class="podium__xp podium__xp--first">{{ firstPlace.xp }} XP</div>
                <div class="podium__platform-wrapper podium__platform-wrapper--first">
                    <div class="podium__platform podium__platform--first">1</div>
                </div>
            </div>
            <div class="podium">
                <div class="podium__crown podium__crown--third">🥉</div>
                <div class="podium__avatar">
                    <div class="podium__avatar-inner podium__avatar-inner--third">
                        {{ thirdPlace.name[0] }}
                    </div>
                    <div class="podium__badge podium__badge--third">3</div>
                </div>
                <div class="podium__name">{{ thirdPlace.name }}</div>
                <div class="podium__xp podium__xp--third">{{ thirdPlace.xp }} XP</div>
                <div class="podium__platform-wrapper podium__platform-wrapper--third">
                    <div class="podium__platform podium__platform--third">3</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { LeaderboardUser } from '@/entities/user';

defineProps<{
    firstPlace: LeaderboardUser;
    secondPlace: LeaderboardUser;
    thirdPlace: LeaderboardUser;
}>();
</script>

<style lang="scss" scoped>
.hero {
    flex-shrink: 0;
    padding: 28px 32px 0;

    background: linear-gradient(180deg, rgba(255, 215, 0, 0.02) 0%, transparent 100%);

    &__top {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 16px;

        padding-bottom: 24px;
    }
}

.podium {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: 0;

    &__crown {
        margin-bottom: 4px;

        &--first {
            font-size: 28px;
        }

        &--second {
            font-size: 22px;
        }

        &--third {
            font-size: 18px;
        }
    }

    &__avatar {
        position: relative;
        margin-bottom: 8px;
    }

    &__avatar-inner {
        display: flex;
        align-items: center;
        justify-content: center;

        font-weight: 700;

        border: 3px solid;
        border-radius: 50%;

        &--first {
            width: 76px;
            height: 76px;

            font-size: 26px;

            border-color: rgba(255, 215, 0, 0.5);
            background: linear-gradient(135deg, #ffd700, #ffaa00);

            animation: glow 3s ease-in-out infinite;
        }

        &--second {
            width: 62px;
            height: 62px;

            font-size: 20px;

            border-color: rgba(192, 192, 192, 0.4);
            background: linear-gradient(135deg, #a0a8c0, #7a82a0);
        }

        &--third {
            width: 58px;
            height: 58px;

            font-size: 18px;

            border-color: rgba(205, 127, 50, 0.4);
            background: linear-gradient(135deg, #cd8b4b, #a0621f);
        }
    }

    &__badge {
        position: absolute;
        bottom: -4px;
        right: -2px;

        width: 22px;
        height: 22px;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 10px;
        font-weight: 800;
        color: #000;

        border: 2px solid var(--bg);
        border-radius: 50%;

        &--first {
            background: var(--gold);
        }

        &--second {
            background: var(--silver);
        }

        &--third {
            background: var(--bronze);
        }
    }

    &__name {
        margin-bottom: 2px;

        font-size: 14px;
        font-weight: 800;
        text-align: center;
    }

    &__xp {
        font-family: var(--spaced);
        font-size: 10px;
        font-weight: 700;
        text-align: center;

        &--first {
            color: var(--gold);
        }

        &--second {
            color: var(--silver);
        }

        &--third {
            color: var(--bronze);
        }
    }

    &__platform-wrapper {
        margin-top: 8px;

        &--first {
            width: 130px;
        }

        &--second {
            width: 120px;
        }

        &--third {
            width: 110px;
        }
    }

    &__platform {
        width: 100%;
        padding-bottom: 4px;

        display: flex;
        justify-content: center;
        align-items: flex-end;

        border-radius: 10px 10px 0 0;

        &--first {
            height: 68px;

            font-family: var(--spaced);
            font-size: 11px;
            font-weight: 700;
            color: var(--gold);

            border: 1px solid rgba(255, 215, 0, 0.2);
            border-bottom: none;

            background: linear-gradient(180deg, rgba(255, 215, 0, 0.12), rgba(255, 215, 0, 0.04));
        }

        &--second {
            height: 48px;

            font-family: var(--spaced);
            font-size: 10px;
            font-weight: 700;
            color: var(--silver);

            border: 1px solid rgba(192, 192, 192, 0.15);
            border-bottom: none;

            background: linear-gradient(
                180deg,
                rgba(192, 192, 192, 0.1),
                rgba(192, 192, 192, 0.03)
            );
        }

        &--third {
            height: 36px;

            font-family: var(--spaced);
            font-size: 10px;
            font-weight: 700;
            color: var(--bronze);

            border: 1px solid rgba(205, 127, 50, 0.15);
            border-bottom: none;

            background: linear-gradient(180deg, rgba(205, 127, 50, 0.1), rgba(205, 127, 50, 0.03));
        }
    }

    &--big {
        .podium__name {
            font-size: 16px;
        }

        .podium__xp {
            font-size: 12px;
        }
    }
}

@media (max-width: 768px) {
    .hero {
        padding: 12px 16px 0;
    }

    .podium {
        &__platform {
            &--first {
                height: 50px;
            }

            &--second {
                height: 40px;
            }

            &--third {
                height: 30px;
            }
        }

        &__name {
            font-size: 12px;
        }

        &__platform-wrapper {
            &--first {
                width: 90px;
            }

            &--second {
                width: 80px;
            }

            &--third {
                width: 70px;
            }
        }

        &__avatar-inner {
            font-size: 16px;

            &--first {
                width: 50px;
                height: 50px;
            }

            &--second {
                width: 45px;
                height: 45px;
            }

            &--third {
                width: 40px;
                height: 40px;
            }
        }
    }
}
</style>
