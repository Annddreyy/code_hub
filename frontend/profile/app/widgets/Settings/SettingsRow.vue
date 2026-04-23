<template>
    <div class="setting-row">
        <span
            v-if="icon"
            class="setting-row__ico"
        >
            {{ icon }}
        </span>
        <div
            v-if="label || sublabel"
            class="setting-row__info"
        >
            <div
                v-if="label"
                class="setting-row__label"
            >
                {{ label }}
            </div>
            <div
                v-if="sublabel"
                class="setting-row__sub"
            >
                {{ sublabel }}
            </div>
        </div>
        <component
            :is="resolvedComponent"
            v-if="resolvedComponent"
            v-bind="props ?? {}"
        />
    </div>
</template>

<script setup lang="ts">
import { componentRegistry } from './componentRegistry';

const {
    component,
    label = '',
    sublabel = '',
    icon = '',
    props = {},
} = defineProps<{
    label?: string;
    sublabel?: string;
    icon?: string;
    component: string;
    props?: Record<string, unknown>;
}>();

const resolvedComponent = computed(() => {
    const comp = componentRegistry[component];
    if (!comp) {
        console.warn(`[SettingRow] Unknown component: "${component}"`);
    }
    return comp ?? null;
});
</script>

<style lang="scss" scoped>
.setting-row {
    display: flex;
    align-items: center;
    gap: 14px;

    padding: 13px 20px;

    border-bottom: 1px solid var(--b1);

    transition: background 0.12s;

    &:hover {
        background: rgba(255, 255, 255, 0.02);
    }

    &:last-child {
        border: none;
    }

    &__ico {
        flex-shrink: 0;

        font-size: 18px;
    }

    &__info {
        flex: 1;
    }

    &__label {
        margin-bottom: 2px;

        font-size: 13px;
        font-weight: 600;
    }

    &__sub {
        font-family: var(--spaced);
        font-size: 9px;
        color: var(--muted);
    }
}

@media (max-width: 768px) {
    .setting-row {
        flex-direction: column;
        align-items: flex-start;

        &__ico {
            display: none;
        }
    }
}
</style>
