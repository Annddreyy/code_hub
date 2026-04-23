<template>
    <div class="hero">
        <div class="hero__bg" />
        <div
            v-if="user"
            class="hero__top"
        >
            <div class="hero__avatar">{{ user.name[0] }}</div>
            <div class="hero__info">
                <div class="hero__name">{{ user.name }}</div>
                <div class="hero__handle">Участник с {{ createdDate }}</div>
                <div class="hero__bio">
                    {{ user.bio }}
                </div>
                <div class="hero__socials">
                    <a
                        v-for="socialLink in user.socialLinks"
                        :key="socialLink.link"
                        :href="socialLink.link"
                        class="hero__social"
                    >
                        {{ socialLink.title }}
                    </a>
                </div>
            </div>
            <NuxtLink
                class="hero__edit-btn"
                to="/settings"
            >
                ✏️ Редактировать профиль
            </NuxtLink>
        </div>
        <div
            v-if="stats"
            class="hero__stats"
        >
            <StatCard
                v-for="stat in stats"
                :key="stat.id"
                v-bind="stat"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '@/entities/user';
import { statApi, StatCard } from '@/entities/stat';

const { user } = defineProps<{
    user: User;
}>();

const formatter = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
});

const { data: stats } = await useAsyncData(() => statApi.getStats());

const createdDate = computed(() => formatter.format(user.createdAt));
</script>

<style lang="scss" scoped>
.hero {
    position: relative;

    margin-bottom: 24px;
    padding: 28px;

    border: 1px solid var(--b1);
    border-radius: 16px;

    background: var(--s1);
    overflow: hidden;

    animation: fadeUp 0.4s 0.2s ease both;

    &__bg {
        position: absolute;

        inset: 0;
        background: linear-gradient(
            135deg,
            rgba(79, 156, 255, 0.04) 0%,
            transparent 50%,
            rgba(188, 140, 255, 0.03) 100%
        );
    }

    &__top {
        position: relative;

        display: flex;
        align-items: flex-start;
        gap: 20px;

        margin-bottom: 24px;
    }

    &__avatar {
        width: 80px;
        height: 80px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        font-size: 32px;
        font-weight: 700;

        border: 3px solid var(--blue);
        border-radius: 50%;

        background: linear-gradient(135deg, var(--blue), var(--purple));
    }

    &__info {
        flex: 1;
    }

    &__name {
        margin-bottom: 3px;

        font-size: 26px;
        font-weight: 800;
        letter-spacing: -0.025em;
    }

    &__handle {
        margin-bottom: 6px;

        font-family: var(--spaced);
        font-size: 11px;
        color: var(--blue);
    }

    &__bio {
        max-width: 500px;
        margin-bottom: 10px;

        font-size: 13px;
        line-height: 1.6;
        color: var(--muted);
    }

    &__socials {
        display: flex;
        gap: 8px;
    }

    &__social {
        padding: 4px 10px;

        font-family: var(--spaced);
        font-size: 9px;
        font-weight: 700;
        text-decoration: none;
        color: var(--muted);

        border: 1px solid var(--b2);
        border-radius: 6px;

        cursor: pointer;
        transition: all 0.15s;

        &:hover {
            color: var(--text);
            border-color: var(--b3);
        }
    }

    &__edit-btn {
        position: absolute;
        top: 0;
        right: 0;

        padding: 8px 18px;

        font-family: var(--spaced);
        font-size: 10px;
        font-weight: 700;
        text-decoration: none;
        color: var(--muted);

        border: 1px solid var(--b2);
        border-radius: 8px;

        background: transparent;
        cursor: pointer;

        transition: all 0.2s;

        &:hover {
            color: var(--text);
            border-color: var(--b3);
            background: rgba(255, 255, 255, 0.03);
        }
    }

    &__stats {
        position: relative;

        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 12px;
    }
}

@media (max-width: 768px) {
    .hero {
        &__top {
            flex-direction: column;
        }

        &__stats {
            grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
        }

        &__avatar {
            width: 40px;
            height: 40px;

            font-size: 21px;
        }

        &__name {
            font-size: 21px;
        }

        &__edit-btn {
            position: static;
        }
    }
}
</style>
