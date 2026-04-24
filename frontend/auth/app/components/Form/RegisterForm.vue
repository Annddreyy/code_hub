<template>
    <form
        id="register-form"
        class="register-form"
        @submit.prevent="handleSubmit"
    >
        <div
            :class="['register-form__message', { 'register-form__message--error': isErrorMessage }]"
        >
            {{ message }}
        </div>
        <div class="field">
            <label>Полное имя</label>
            <div class="field__wrap">
                <span class="field__ico">👤</span>
                <input
                    v-model="name"
                    type="text"
                    placeholder="Alex Developer"
                />
            </div>
        </div>
        <div class="field">
            <label>Email</label>
            <div class="field__wrap">
                <span class="field__ico">📧</span>
                <input
                    v-model="email"
                    type="email"
                    placeholder="you@example.com"
                />
            </div>
        </div>
        <div class="field">
            <label>Пароль</label>
            <div class="field__wrap">
                <span class="field__ico">🔒</span>
                <input
                    id="pw-input"
                    v-model="password"
                    type="password"
                    placeholder="Min 8 characters"
                    @input="checkPassword"
                />
            </div>
            <div
                v-if="showStrength"
                class="pw-strength"
            >
                <div class="pw-bars">
                    <div
                        v-for="(_, index) in 4"
                        :key="index"
                        class="pw-bar"
                        :class="index < score ? strengthClass : ''"
                    />
                </div>

                <div
                    class="pw-label"
                    :style="{ color: labelColor }"
                >
                    {{ label }}
                </div>
            </div>
        </div>
        <button
            class="submit-btn"
            type="submit"
        >
            <span>Создать аккаунт →</span>
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

const name = ref('');
const email = ref('');
const password = ref('');

const message = ref('');
const isErrorMessage = ref(false);

const showStrength = ref(false);
const score = ref(0);

const checkPassword = () => {
    showStrength.value = true;

    const len = password.value.length >= 8;
    const upLetters = /[A-Z]/.test(password.value);
    const digits = /[0-9]/.test(password.value);
    const specialSymbols = /[^A-Za-z0-9]/.test(password.value);

    score.value = [len, upLetters, digits, specialSymbols].filter(Boolean).length;
};

const strengthClass = computed(() => {
    if (score.value <= 1) return 'weak';
    if (score.value <= 3) return 'medium';
    return 'strong';
});

const label = computed(() => {
    return ['', 'Слабый', 'Средний', 'Хороший', 'Сильный'][score.value] || '';
});

const labelColor = computed(() => {
    if (score.value <= 1) return 'var(--red)';
    if (score.value <= 3) return 'var(--yellow)';
    return 'var(--green)';
});

const handleSubmit = async () => {
    try {
        const response = await authApi.register(name.value, email.value, password.value);
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

<style lang="scss" scoped>

.pw-strength {
    margin-top: 7px;

    .pw-bars {
        display: flex;
        gap: 3px;

        margin-bottom: 4px;

        .pw-bar {
            flex: 1;
            height: 3px;

            background: var(--b1);
            border-radius: 2px;
            transition: background 0.3s;

            &.weak {
                background: var(--red);
            }

            &.medium {
                background: var(--yellow);
            }

            &.strong {
                background: var(--green);
            }
        }
    }

    .pw-label {
        font-family: var(--spaced);
        font-size: 12px;
        color: var(--muted);
    }
}

@media (max-width: 1220px) {
    .pw-strength {
        margin-top: 6px;

        .pw-bars {
            margin-bottom: 3px;

            .pw-bar {
                height: 2px;
            }
        }

        .pw-label {
            font-size: 8px;
        }
    }
}

@media (max-width: 768px) {
    .pw-strength {
        .pw-bars {
            .pw-bar {
                height: 3px;
            }
        }
    }
}
</style>
