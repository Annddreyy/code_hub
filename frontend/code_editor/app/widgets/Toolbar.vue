<template>
    <div class="editor-toolbar">
        <select
            v-model="selectedLanguage"
            class="editor-toolbar__lang-select"
        >
            <option
                v-for="language in languages"
                :key="language.title"
                :selected="selectedLanguage === language.title"
                :value="language.title"
                class="editor-toolbar__lang-option"
            >
                {{ language.fullTitle }}
            </option>
        </select>
        <select
            v-model="selectedTheme"
            class="editor-toolbar__lang-select"
        >
            <option
                v-for="theme in themes"
                :key="theme"
                :selected="selectedTheme === theme"
                :value="theme"
                class="editor-toolbar__lang-option"
            >
                {{ theme }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import type { Language } from '@/entities/challenge';

const { languages, themes } = defineProps<{
    languages: Language[];
    themes: string[];
}>();

const selectedLanguage = defineModel<string>('language');
const selectedTheme = defineModel<string>('theme');
</script>

<style lang="scss" scoped>
.editor-toolbar {
    height: 40px;
    padding: 0 14px;

    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;

    border-bottom: 1px solid var(--b1);
    background: rgba(6, 9, 13, 0.5);

    &__lang-select {
        padding: 4px 10px;

        font-family: var(--spaced);
        font-size: 9px;
        font-weight: 700;
        color: var(--text);

        border: 1px solid var(--b2);
        border-radius: 6px;

        background: var(--s2);
        cursor: pointer;
    }
}
</style>
