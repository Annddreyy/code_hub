<template>
    <form
        id="login-form"
        @submit.prevent="handleSubmit"
    >
        <div
            :class="['register-form__message', { 'register-form__message--error': isErrorMessage }]"
        >
            {{ message }}
        </div>
        <div class="field">
            <label>Email</label>
            <div class="field__wrap">
                <span class="field__ico">📧</span>
                <input
                    v-model="email"
                    type="email"
                    placeholder="you@example.com"
                    autocomplete="email"
                />
            </div>
        </div>
        <div class="field">
            <div class="field__meta">
                <span class="field__label">Пароль</span>
                <span class="f-link">Забыли пароль?</span>
            </div>
            <div class="field__wrap">
                <span class="field__ico">🔒</span>
                <input
                    v-model="password"
                    type="password"
                    placeholder="••••••••"
                    autocomplete="current-password"
                />
            </div>
        </div>
        <button
            class="submit-btn"
            type="submit"
        >
            <span>Войти →</span>
            <div class="submit-btn__spinner" />
        </button>
        <div class="terms">
            Авторизуясь, вы соглашаетесь с нашими <a href="#">Условиями</a> и
            <a href="#">Политикой конфиденциальности</a>
        </div>
    </form>
</template>

<script setup lang="ts">
import { authApi, type ApiError } from '@/api/auth';

const email = ref('');
const password = ref('');

const message = ref('');
const isErrorMessage = ref(false);

const handleSubmit = async () => {
    try {
        const response = await authApi.login(email.value, password.value);
        message.value = response.data.message;
        isErrorMessage.value = false;
    } catch (error: unknown) {
        message.value =
            (error as ApiError).response.data.message ||
            (error as ApiError).response.data.errors?.[0]?.messages[0] ||
            'Неизвестная ошибка';
        isErrorMessage.value = true;
    }
};
</script>

<style lang="scss" scoped>
@use '@/styles/forms.scss';
</style>
