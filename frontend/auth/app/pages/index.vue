<template>
    <div class="auth-page">
        <header
            id="brand-bar"
            class="brand-bar"
        />

        <div class="hero">
            <div id="hero-logo" />
            <div class="hero__tag">// learn · build · get hired</div>
            <div id="hero-stats" />
        </div>

        <main>
            <div class="left">
                <Orbs />
                <Terminal />
                <Teleport
                    v-if="isMounted"
                    to="#hero-stats"
                    :disabled="!isMobile"
                >
                    <Stats />
                </Teleport>
                <Quote />
            </div>

            <div class="right">
                <Teleport
                    v-if="isMounted"
                    :disabled="isDesktop"
                    :to="isMobile ? '#hero-logo' : '#brand-bar'"
                >
                    <Logo />
                </Teleport>
                <Form />
            </div>
        </main>
        <SocialProof />
    </div>
</template>

<script setup lang="ts">
import Form from '@/components/Form/Form.vue';
import Stats from '@/components/Stats.vue';
import Terminal from '@/components/Terminal.vue';
import SocialProof from '@/components/SocialProof.vue';

const isMounted = ref(false);

const isDesktop = ref(true);
const isMobile = ref(false);

const checkWidth = () => {
    isDesktop.value = window.innerWidth > 1220;
    isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
    isMounted.value = true;
    checkWidth();
    window.addEventListener('resize', checkWidth);
});

onUnmounted(() => {
    isMounted.value = false;
    window.removeEventListener('resize', checkWidth);
});

useHead({
    title: 'Авторизация',
});
</script>

<style lang="scss" scoped>
.auth-page {
    flex-direction: column;

    &,
    main {
        display: flex;

        width: 100vw;
        height: 100vh;
    }

    main {
        justify-content: center;
        align-items: center;
    }
}

.left,
.right {
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.left {
    width: 52%;

    padding: 60px;
    overflow: hidden;
    background: radial-gradient(ellipse at 30% 50%, rgba(79, 156, 255, 0.06) 0%, transparent 70%);
    border-right: 1px solid var(--b1);
}

.right {
    padding: 60px 80px;
    flex: 1;

    overflow-y: auto;
}

.hero {
    position: relative;
    height: 180px;
    flex-shrink: 0;

    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    background: radial-gradient(ellipse at 50% 60%, rgba(79, 156, 255, 0.12) 0%, transparent 70%);

    &__tag {
        position: relative;

        font-family: var(--spaced);
        font-size: 10px;
        color: var(--muted);

        z-index: 1;
    }
}

.brand-bar {
    position: relative;
    display: none;

    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;

    height: 54px;
    padding: 0 28px;

    background: rgba(6, 9, 13, 0.9);
    backdrop-filter: blur(20px);

    border-bottom: 1px solid var(--b1);

    z-index: 10;
}

@media (max-width: 1220px) {
    .brand-bar {
        display: flex;
    }

    .left,
    .right {
        padding: 36px 30px;
    }

    .left {
        width: 340px;
        height: calc(100vh - 54px);

        flex-shrink: 0;

        background: linear-gradient(180deg, rgba(79, 156, 255, 0.04) 0%, transparent 100%);
    }

    .right {
        &::-webkit-scrollbar {
            width: 3px;
        }

        &::-webkit-scrollbar-thumb {
            background: var(--s3);
        }
    }
}

@media (max-width: 768px) {
    .auth-page {
        main {
            align-items: start;
        }

        .left {
            display: none;
            padding: 20px 18px 24px;
        }

        .brand-bar {
            display: none;
        }

        .hero {
            display: flex;
        }
    }
}
</style>
