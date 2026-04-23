<template>
    <div class="form">
        <div class="form__head">
            <h1 id="form__title">С возвращением</h1>
            <p id="form__sub">Войдите, чтобы продолжить обучение</p>
        </div>
        <div class="tab-toggle">
            <button
                :class="['ttab', { active: isAuth }]"
                @click="isAuth = true"
            >
                Авторизоваться
            </button>
            <button
                :class="['ttab', { active: !isAuth }]"
                @click="isAuth = false"
            >
                Создать аккаунт
            </button>
        </div>
        <Socials />
        <LoginForm v-show="isAuth" />
        <RegisterForm v-show="!isAuth" />
    </div>
</template>

<script setup lang="ts">
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';
import Socials from './Socials/Socials.vue';

const isAuth = ref(true);
</script>

<style lang="scss" scoped>
.form {
    width: 100%;
    max-width: 400px;

    animation: fadeUp 0.5s 0.1s ease both;
    opacity: 0;

    &__head {
        margin-bottom: 32px;

        h1 {
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 6px;
        }

        p {
            font-size: 14px;
            color: var(--muted);
        }
    }
}

.tab-toggle {
    display: flex;
    margin-bottom: 28px;
    padding: 3px;

    border: 1px solid var(--b1);
    border-radius: 8px;

    background: var(--s2);

    .ttab {
        flex: 1;
        padding: 8px;

        font-family: var(--spaced);
        font-size: 11px;
        font-weight: 700;
        color: var(--muted);

        border: none;
        border-radius: 6px;

        background: transparent;
        cursor: pointer;
        transition: all 0.2s;

        &.active {
            background: var(--blue);
            color: #000;
        }
    }
}

@media (max-width: 1220px) {
    .form {
        max-width: 340px;

        &__head {
            h1 {
                font-size: 24px;
                margin-bottom: 5px;
            }

            p {
                font-size: 13px;
                margin-bottom: 22px;
            }
        }
    }

    .tab-toggle {
        margin-bottom: 20px;
        border-radius: 7px;

        .ttab {
            padding: 7px;

            font-size: 10px;
            border-radius: 5px;
        }
    }
}

@media (max-width: 768px) {
    .form {
        max-width: initial;

        &__head {
            h1 {
                font-size: 22px;
                margin-bottom: 4px;
            }

            p {
                margin-bottom: 20px;
            }
        }
    }

    .tab-toggle {
        border-radius: 8px;

        .ttab {
            padding: 9px;
            font-size: 11px;

            border-radius: 6px;
        }
    }
}
</style>
