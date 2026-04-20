<template>
    <div class="filters">
        <div class="filters__search-box">
            <span class="filters__search-icon">🔍</span>
            <input
                v-model="searchString"
                class="filters__search-input"
                placeholder="Найти курс..."
            />
        </div>

        <div class="filters__section">
            <div class="filters__title">Категории</div>
            <div
                v-for="category in categories"
                :key="category.title"
                :class="[
                    'filters__check',
                    { 'filters__check--on': selectedCategories.includes(category.id) },
                ]"
                @click="toggleCategory(category.id)"
            >
                <div class="filters__box" />
                {{ category.title }}
                <span class="filters__count">{{ category.challengesCount }}</span>
            </div>
        </div>

        <div class="filters__section">
            <div class="filters__title">Сложность</div>
            <div class="filters__level-pills">
                <button
                    :class="[
                        'filters__level-pill',
                        { 'filters__level-pill--on-easy': selectedDifficulties.includes('easy') },
                    ]"
                    @click="toggleDifficulty('easy')"
                >
                    Легко
                </button>
                <button
                    :class="[
                        'filters__level-pill',
                        {
                            'filters__level-pill--on-medium':
                                selectedDifficulties.includes('medium'),
                        },
                    ]"
                    @click="toggleDifficulty('medium')"
                >
                    Средне
                </button>
                <button
                    :class="[
                        'filters__level-pill',
                        { 'filters__level-pill--on-hard': selectedDifficulties.includes('hard') },
                    ]"
                    @click="toggleDifficulty('hard')"
                >
                    Сложно
                </button>
            </div>
        </div>

        <div class="filters__section">
            <div class="filters__title">Язык</div>
            <div
                v-for="language in languages"
                :key="language.title"
                class="filters__check on"
                :class="[
                    'filters__check',
                    { 'filters__check--on': selectedLanguages.includes(language.id) },
                ]"
                @click="toggleLanguage(language.id)"
            >
                <div class="filters__box" />
                {{ language.title }}
                <span class="filters__count">{{ language.challengesCount }}</span>
            </div>
        </div>

        <div class="filters__section">
            <div class="filters__title">Сортировать по</div>
            <select
                v-model="sortBy"
                class="filters__sort-sel"
            >
                <option :value="undefined" />
                <option value="popular">Сначала популярные</option>
                <option value="not-popular">Сначала непопулярные</option>
                <option value="new">Сначала новые</option>
                <option value="old">Сначала старые</option>
                <option value="high-rating">Самый высокий рейтинг</option>
                <option value="low-rating">Самый низкий рейтинг</option>
                <option value="easy-hard">Сложность: Легкие → Сложные</option>
                <option value="hard-easy">Сложность: Сложные → Легкие</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Category, Language } from '@/entities/course';

type UpdatedFilters = {
    searchString?: string;
    categories?: string[];
    difficulties?: string[];
    languages?: string[];
    durations?: string[];
    sortBy?: string;
};

defineProps<{
    categories: Category[];
    languages: Language[];
}>();

const emit = defineEmits<{
    updateFilters: [updatedFilters: UpdatedFilters];
}>();

const searchString = defineModel<string>('searchString');
const sortBy = defineModel<string>('sortBy');

const selectedCategories = ref<string[]>([]);
const selectedDifficulties = ref<string[]>([]);
const selectedLanguages = ref<string[]>([]);
const selectedDurations = ref<string[]>([]);

watch([searchString, sortBy], () => updateFilters());

const toggleCategory = (selectedCategoryId: string) => {
    if (selectedCategories.value.includes(selectedCategoryId)) {
        selectedCategories.value = selectedCategories.value.filter(
            (categoryId) => categoryId !== selectedCategoryId,
        );
    } else {
        selectedCategories.value.push(selectedCategoryId);
    }

    updateFilters();
};

const toggleLanguage = (selectedLanguageId: string) => {
    if (selectedLanguages.value.includes(selectedLanguageId)) {
        selectedLanguages.value = selectedLanguages.value.filter(
            (languageId) => languageId !== selectedLanguageId,
        );
    } else {
        selectedLanguages.value.push(selectedLanguageId);
    }

    updateFilters();
};

const toggleDifficulty = (selectedDifficulty: 'easy' | 'medium' | 'hard') => {
    if (selectedDifficulties.value.includes(selectedDifficulty)) {
        selectedDifficulties.value = selectedDifficulties.value.filter(
            (difficulty) => difficulty !== selectedDifficulty,
        );
    } else {
        selectedDifficulties.value.push(selectedDifficulty);
    }

    updateFilters();
};

const updateFilters = () => {
    emit('updateFilters', {
        searchString: searchString.value,
        categories: selectedCategories.value,
        difficulties: selectedDifficulties.value,
        languages: selectedLanguages.value,
        durations: selectedDurations.value,
        sortBy: sortBy.value,
    });
};
</script>

<style lang="scss" scoped>
.filters {
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--s3);
    }

    &__section {
        margin-bottom: 20px;
    }

    &__title {
        margin-bottom: 10px;

        font-family: var(--sm);
        font-size: 8px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--muted);
    }

    &__search-box {
        display: flex;
        align-items: center;
        gap: 7px;

        margin-bottom: 16px;
        padding: 8px 10px;

        border: 1px solid var(--b2);
        border-radius: 8px;

        background: var(--s2);
    }

    &__search-icon {
        font-size: 12px;
        color: var(--muted);
    }

    &__search-input {
        width: 100%;

        font-family: var(--sans);
        font-size: 12px;
        color: var(--text);

        background: none;

        border: none;
        outline: none;

        &::placeholder {
            color: var(--dim);
        }
    }

    &__check {
        display: flex;
        align-items: center;
        gap: 8px;

        padding: 5px 4px;

        font-size: 12px;
        font-weight: 600;
        color: var(--muted);

        border-radius: 5px;

        cursor: pointer;
        user-select: none;

        transition: all 0.12s;

        &:hover {
            color: var(--text2);
            background: rgba(255, 255, 255, 0.02);
        }

        &--on {
            color: var(--text);

            .filters__box {
                color: #000;
                border-color: var(--blue);
                background: var(--blue);

                &::after {
                    content: '✓';
                }
            }
        }
    }

    &__box {
        width: 15px;
        height: 15px;
        flex-shrink: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 9px;

        border: 1px solid var(--b2);
        border-radius: 4px;

        background: var(--s3);

        transition: all 0.15s;

        &::after {
            position: relative;
            content: '';
            top: 0;
            left: 0;
        }
    }

    &__count {
        margin-left: auto;

        font-family: var(--sm);
        font-size: 8px;
        color: var(--dim);
    }

    &__level-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }

    &__level-pill {
        padding: 4px 9px;

        font-family: var(--sm);
        font-size: 8px;
        font-weight: 700;
        color: var(--muted);

        border: 1px solid var(--b2);
        border-radius: 5px;

        background: transparent;
        cursor: pointer;

        transition: all 0.15s;

        &:hover {
            color: var(--text);
            border-color: var(--b3);
        }

        &--on-easy {
            color: var(--green);
            border-color: rgba(63, 185, 80, 0.35);
            background: rgba(63, 185, 80, 0.1);
        }

        &--on-medium {
            color: var(--yellow);
            border-color: rgba(227, 179, 65, 0.35);
            background: rgba(227, 179, 65, 0.1);
        }

        &--on-hard {
            color: var(--red);
            border-color: rgba(255, 92, 114, 0.35);
            background: rgba(255, 92, 114, 0.1);
        }
    }

    &__sort-sel {
        width: 100%;
        padding: 7px 10px;

        font-family: var(--sm);
        font-size: 10px;
        color: var(--text);

        border: 1px solid var(--b2);
        border-radius: 7px;

        cursor: pointer;
        background: var(--s2);
    }
}
</style>
