<template>
    <div class="settings-page">
        <h1 class="settings-page__title">Настройки</h1>
        <p class="settings-page__description">Управление аккаунтом, настройками и уведомлениями</p>
        <SettingsCard
            v-for="(form, index) in forms"
            :key="index"
            :title="form.title"
            :subtitle="form.subtitle"
            :rows="form.rows"
            @submit="form.submit"
        />
    </div>
</template>

<script setup lang="ts">
import { SettingsCard } from '@/widgets/Settings';
import { useUserStore, userApi } from '@/entities/user';
import { settingsApi } from '@/entities/settings';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const cookieHeaders = import.meta.server ? useRequestHeaders(['cookie']) : {};

const { data: settings } = await useAsyncData('settings', () =>
    settingsApi.getSettings(cookieHeaders),
);
const localSettings = ref(settings.value || {});

const forms = computed(() => [
    {
        title: 'Публичный профиль',
        subtitle: 'Каким вас видят другие в CodeHub',
        rows: [
            {
                component: 'AvatarUpload',
                props: { userName: user.value?.name, name: 'avatar' },
            },
            {
                label: 'Отображаемое имя',
                sublabel: 'Отображается в таблицах лидеров и профиле',
                icon: '👤',
                component: 'Input',
                props: { value: user.value?.name, name: 'name' },
            },
            {
                label: 'Bio',
                sublabel: 'Краткое описание отображается в профиле',
                icon: '📝',
                component: 'Input',
                props: { value: user.value?.bio, name: 'bio' },
            },
            {
                component: 'SaveBtn',
                props: { text: 'Сохранить изменения' },
            },
        ],
        submit: async (data: Record<string, unknown>) =>
            await userApi.updateProfile(data, cookieHeaders),
    },
    {
        title: 'Предпочтения',
        subtitle: 'Настраивайте свой опыт обучения',
        rows: [
            {
                label: 'Тема редактора кода',
                sublabel: 'Цветовая схема редактора кода',
                icon: '🎨',
                component: 'Select',
                props: {
                    name: 'editorTheme',
                    options: [
                        {
                            value: 'dark',
                            title: 'Темная',
                        },
                    ],
                    currentValue: settings.value?.editorTheme,
                    onChange: (event: Event) => {
                        if (localSettings.value?.editorTheme) {
                            localSettings.value.editorTheme = event.target?.value;
                        }
                    },
                },
            },
            {
                label: 'Размер шрифта',
                sublabel: 'Размер шрифта редактора кода',
                icon: '🔤',
                component: 'Select',
                props: {
                    name: 'editorFontSize',
                    options: [
                        {
                            value: '8',
                            title: '8px',
                        },
                        {
                            value: '12',
                            title: '12px',
                        },
                        {
                            value: '14',
                            title: '14px',
                        },
                        {
                            value: '16',
                            title: '16px',
                        },
                        {
                            value: '20',
                            title: '20px',
                        },
                        {
                            value: '24',
                            title: '24px',
                        },
                    ],
                    currentValue: String(settings.value?.editorFontSize),
                    onChange: (event: Event) => {
                        if (localSettings.value?.editorFontSize) {
                            localSettings.value.editorFontSize = +(event.target?.value || 12);
                        }
                    },
                },
            },
            {
                label: 'Язык программирования по умолчанию',
                sublabel: 'Автоматический выбор в задачах',
                icon: '🌐',
                component: 'Select',
                props: {
                    name: 'defaultLanguage',
                    options: [
                        {
                            value: 'javascript',
                            title: 'JavaScript',
                        },
                        {
                            value: 'typescript',
                            title: 'TypeScript',
                        },
                        {
                            value: 'python',
                            title: 'Python',
                        },
                        {
                            value: 'java',
                            title: 'Java',
                        },
                    ],
                    currentValue: settings.value?.defaultLanguage,
                    onChange: (event: Event) => {
                        if (localSettings.value?.defaultLanguage) {
                            localSettings.value.defaultLanguage = event.target?.value;
                        }
                    },
                },
            },
            {
                label: 'Дневная цель',
                sublabel: 'Минут обучения в день',
                icon: '⏱️',
                component: 'Select',
                props: {
                    name: 'dailyGoal',
                    options: [
                        {
                            value: '15',
                            title: '15 мин',
                        },
                        {
                            value: '30',
                            title: '30 мин',
                        },
                        {
                            value: '45',
                            title: '45 мин',
                        },
                        {
                            value: '60',
                            title: '60 мин',
                        },
                    ],
                    currentValue: String(settings.value?.dailyGoal),
                    onChange: (event: Event) => {
                        if (localSettings.value?.dailyGoal) {
                            localSettings.value.dailyGoal = +(event.target?.value || 15);
                        }
                    },
                },
            },
            {
                label: 'Анимации',
                sublabel: 'Анимации UI и переходы',
                icon: '✨',
                component: 'Toggle',
                props: {
                    name: 'enableAnimations',
                    isActive: settings.value?.enableAnimations,
                },
            },
            {
                component: 'SaveBtn',
                props: { text: 'Сохранить изменения' },
            },
        ],
        submit: async (data: Record<string, unknown>) =>
            await settingsApi.updateSettings(data, cookieHeaders),
    },
    {
        title: 'Безопасность аккаунта',
        subtitle: 'Настройки пароля и аутентификации',
        rows: [
            {
                label: 'Email',
                icon: '📧',
                component: 'Input',
                props: {
                    name: 'email',
                    value: user.value?.email,
                },
            },
            {
                label: 'Удалить аккаунт',
                sublabel: 'Навсегда удалите все свои данные',
                icon: '🗑️',
                component: 'DangerBtn',
                props: {
                    text: 'Удалить аккаунт',
                },
            },
            {
                component: 'SaveBtn',
                props: { text: 'Сохранить изменения' },
            },
        ],
        submit: async (data: Record<string, unknown>) => {
            try {
                await userApi.updateProfile(data, cookieHeaders);
            } catch {
                console.error('Ошибка при обновлении профиля');
            }
        },
    },
]);

useHead({
    title: 'Настройки',
});
</script>

<style lang="scss" scoped>
.settings-page {
    &__title {
        font-size: 22px;
        font-weight: 800;
        letter-spacing: -0.02em;
        margin-bottom: 6px;
    }

    &__description {
        font-family: var(--spaced);
        font-size: 11px;
        color: var(--muted);
        margin-bottom: 24px;
    }
}
</style>
