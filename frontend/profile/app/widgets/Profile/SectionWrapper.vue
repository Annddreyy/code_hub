<template>
    <section class="section">
        <div class="section__title">
            {{ sectionTitle }}
            <NuxtLink
                v-if="link"
                :to="link"
                class="section__link"
            >
                {{ linkTitle }} →
            </NuxtLink>
        </div>
        <slot />
    </section>
</template>

<script setup lang="ts">
defineProps<{
    sectionTitle: string;
    linkTitle?: string;
    link?: `/${string}`;
}>();
</script>

<style lang="scss" scoped>
.section {
    padding: 18px;

    border: 1px solid var(--b1);
    border-radius: 11px;

    background: var(--s1);
    animation: fadeUp 0.4s 0.2s ease both;

    &__title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        font-family: var(--sm);
        font-size: 10px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--muted);

        margin-bottom: 14px;
    }

    &__link {
        font-size: 9px;
        text-decoration: none;
        color: var(--blue);
    }
}
</style>
