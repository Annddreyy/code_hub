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
        />
    </div>
</template>

<script setup lang="ts">
import { SettingsCard } from '@/widgets/Settings';
import { useUserStore } from '@/entities/user';

const { user } = useUserStore();

const forms = computed(() => [
    {
        title: 'Публичный профиль',
        subtitle: 'Каким вас видят другие в CodeHub',
        rows: [
            {
                component: 'AvatarUpload',
                props: { userName: user?.name, name: 'avatar' },
            },
            {
                label: 'Отображаемое имя',
                sublabel: 'Отображается в таблицах лидеров и профиле',
                icon: '👤',
                component: 'Input',
                props: { value: user?.name, name: 'name' },
            },
            {
                label: 'Bio',
                sublabel: 'Краткое описание отображается в профиле',
                icon: '📝',
                component: 'Input',
                props: { value: user?.bio, name: 'bio' },
            },
            {
                component: 'SaveBtn',
                props: { text: 'Сохранить изменения' },
            },
        ],
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
                    name: 'theme',
                    options: [
                        {
                            value: 'dark',
                            title: 'Темная',
                        },
                    ],
                },
            },
            {
                label: 'Размер шрифта',
                sublabel: 'Размер шрифта редактора кода',
                icon: '🔤',
                component: 'Select',
                props: {
                    name: 'fontSize',
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
                },
            },
            {
                label: 'Дневная цель',
                sublabel: 'Минут обучения в день',
                icon: '⏱️',
                component: 'Select',
                props: {
                    name: 'dayMinutes',
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
                },
            },
            {
                label: 'Анимации',
                sublabel: 'Анимации UI и переходы',
                icon: '✨',
                component: 'Toggle',
                props: {
                    name: 'animations',
                },
            },
            {
                component: 'SaveBtn',
                props: { text: 'Сохранить изменения' },
            },
        ],
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
                    value: user?.email,
                },
            },
            {
                label: 'Пароль',
                icon: '🔒',
                component: 'Input',
                props: {
                    name: 'password',
                    type: 'password',
                    value: user?.password,
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
