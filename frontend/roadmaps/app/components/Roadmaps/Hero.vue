<template>
    <div class="hero">
        <div class="hero__left">
            <h1>Дорожные карты</h1>
            <p>// выберайте путь · достигайте целей</p>
        </div>
        <div class="search">
            <span class="search__ico">🔍</span>
            <input
                class="search___input"
                type="text"
                placeholder="Поиск роадмапов..."
                @input="(event: InputEvent) => $emit('setSearchString', event.data)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
defineEmits<{
    setSearchString: [title: string | null];
}>();
</script>

<style lang="scss" scoped>
.hero {
    position: relative;

    margin-bottom: 20px;
    padding-block: 32px;

    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-shrink: 0;

    z-index: 1;

    &__left {
        h1 {
            margin-bottom: 5px;

            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.03em;
        }

        p {
            font-family: var(--spaced);
            font-size: 13px;
            color: var(--muted);
        }
    }
}

.search {
    min-width: 260px;
    height: 38px;
    padding: 0 14px;

    display: flex;
    align-items: center;
    gap: 8px;

    border: 1px solid var(--b1);
    border-radius: 10px;

    background: var(--s1);
    transition: border-color 0.2s;

    &:focus-within {
        border-color: var(--blue);
    }

    &__ico {
        font-size: 13px;
        color: var(--dim);
    }

    &___input {
        flex: 1;

        font-family: var(--spaced);
        font-size: 11px;
        color: var(--text);

        border: none;
        outline: none;

        background: transparent;

        &::placeholder {
            color: var(--dim);
        }
    }
}

@media (max-width: 768px) {
    .hero {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;

        padding-bottom: 0;
    }
}
</style>
