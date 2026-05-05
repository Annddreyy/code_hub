<template>
    <div class="avatar-upload">
        <div class="avatar-upload__avatar">
            <img
                v-if="avatarPreview"
                :src="avatarPreview"
            />
            <span v-else>{{ userName[0] }}</span>
        </div>
        <div class="avatar-upload__btns">
            <input
                ref="fileInput"
                type="file"
                accept="image/*"
                :name="name"
                class="avatar-upload__btn avatar-upload__btn--change"
                @change="handleFileChange"
            />
            <button
                class="avatar-upload__btn avatar-upload__btn--remove"
                @click="removeAvatar"
            >
                Убрать
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    userName: string;
    name: string;
}>();

const avatarPreview = ref<string | null>(null);
const fileInput = useTemplateRef('fileInput');

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            avatarPreview.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
};

const removeAvatar = () => {
    avatarPreview.value = null;
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};
</script>

<style lang="scss" scoped>
.avatar-upload {
    display: flex;
    align-items: center;
    gap: 14px;

    padding: 16px 20px;

    &__avatar {
        width: 60px;
        height: 60px;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 22px;
        font-weight: 700;

        border: 1px solid var(--blue);
        border-radius: 50%;

        background: linear-gradient(135deg, var(--blue), var(--purple));

        img {
            width: 100%;
            height: 100%;

            border-radius: 50%;
        }
    }

    &__btns {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    &__btn {
        padding: 5px 12px;

        font-family: var(--spaced);
        font-size: 9px;
        font-weight: 700;

        border-radius: 6px;
        cursor: pointer;

        transition: all 0.15s;

        &--change {
            color: var(--muted);
            border: 1px solid var(--b2);
            background: transparent;

            &:hover {
                color: var(--text);
            }
        }

        &--remove {
            color: var(--red);
            border: 1px solid rgba(255, 92, 114, 0.2);
            background: transparent;
        }
    }
}
</style>
