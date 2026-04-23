<template>
    <form
        id="login-form"
        @submit.prevent="handleSubmit"
    >
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
const email = ref('');
const password = ref('');

const handleSubmit = () => {
    console.log('Оправлено! (Лог для теста)');
};
</script>

<style lang="scss" scoped>
@use '@/styles/forms.scss';
</style>
