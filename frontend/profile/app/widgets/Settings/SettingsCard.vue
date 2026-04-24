<template>
    <section class="settings-card">
        <div class="settings-card__hdr">
            <h3 class="settings-card__title">{{ title }}</h3>
            <p class="settings-card__subtitle">{{ subtitle }}</p>
        </div>
        <form
            ref="form"
            class="settings-card__body"
            @submit.prevent="handleSubmit"
        >
            <SettingsRow
                v-for="(row, index) in rows"
                :key="index"
                v-bind="row"
            />
        </form>
    </section>
</template>

<script setup lang="ts">
import SettingsRow from './SettingsRow.vue';

defineProps<{
    title: string;
    subtitle: string;
    rows: Array<{
        label?: string;
        sublabel?: string;
        icon?: string;
        component: string;
        props?: Record<string, unknown>;
    }>;
}>();

const formRef = useTemplateRef('form');

const serializeForm = (formNode: HTMLFormElement) => {
    const formData = new FormData(formNode);
    const data: Record<string, string | File> = {};

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    return data;
};

const handleSubmit = () => {
    console.log(serializeForm(formRef.value!));
};
</script>

<style lang="scss" scoped>
.settings-card {
    margin-bottom: 20px;

    border: 1px solid var(--b1);
    border-radius: 14px;

    background: var(--s1);
    overflow: hidden;

    &__hdr {
        padding: 16px 20px;
        border-bottom: 1px solid var(--b1);
    }

    &__title {
        margin-bottom: 2px;

        font-size: 15px;
        font-weight: 700;
    }

    &__subtitle {
        font-family: var(--spaced);
        font-size: 9px;
        color: var(--muted);
    }

    &__body {
        padding: 8px 0;
    }
}
</style>
