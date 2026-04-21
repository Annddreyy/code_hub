<template>
    <label class="toggle-label">
        <input
            type="checkbox"
            :checked="isActive"
            class="toggle-input"
        />
        <span class="toggle-slider" />
    </label>
</template>

<script setup lang="ts">
defineProps<{
    isActive?: boolean;
}>();
</script>

<style lang="scss" scoped>
.toggle-label {
    position: relative;

    display: inline-block;
    width: 38px;
    height: 20px;
}

.toggle-input {
    position: absolute;
    width: 0;
    height: 0;

    opacity: 0;

    &:checked + .toggle-slider {
        background: var(--blue);
    }

    &:checked + .toggle-slider::after {
        transform: translateX(18px);
    }
}

.toggle-slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    border-radius: 10px;
    background: var(--s3);
    cursor: pointer;

    transition: background 0.2s;

    &::after {
        position: absolute;
        content: '';
        left: 3px;
        bottom: 3px;

        height: 14px;
        width: 14px;

        border-radius: 50%;

        background: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

        transition: transform 0.2s;
    }
}
</style>
