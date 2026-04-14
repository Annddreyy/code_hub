<template>
  <div class="summary">
    <div class="summary__row">
      <span class="summary__lbl">Язык</span>
      <span class="summary__val">{{ languageChoices }}</span>
      <span
        class="summary__edit"
        @click="$emit('goToStep', Steps.LANGUAGE)"
      >
        Исправить
      </span>
    </div>
    <div class="summary__row">
      <span class="summary__lbl">Уровень</span>
      <span class="summary__val">{{ experienceChoices }}</span>
      <span
        class="summary__edit"
        @click="$emit('goToStep', Steps.EXPERIENCE)"
      >
        Исправить
      </span>
    </div>
    <div class="summary__row">
      <span class="summary__lbl">Цели</span>
      <span class="summary__val">{{ goalChoices }}</span>
      <span
        class="summary__edit"
        @click="$emit('goToStep', Steps.GOAL)"
      >
        Исправить
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Steps as StepsType, UserChoices } from '@/types';
import { Steps } from '@/types';

const { userChoices } = defineProps<{
  userChoices: UserChoices;
}>();
defineEmits<{
  goToStep: [step: StepsType];
}>();

const languageChoices = computed(() =>
  userChoices.languages.map((language) => language.title).join(' · '),
);
const experienceChoices = computed(() =>
  userChoices.experienceLevels.map((experience) => experience.title).join(' · '),
);
const goalChoices = computed(() => userChoices.goals.map((goal) => goal.title).join(' · '));
</script>

<style lang="scss" scoped>
.summary {
  margin-bottom: 24px;
  padding: 20px;

  border: 1px solid var(--b1);
  border-radius: 12px;

  background: var(--s2);

  &__row {
    display: flex;
    align-items: center;
    gap: 10px;

    padding: 10px 0;

    border-bottom: 1px solid var(--b1);

    &:last-child {
      border-bottom: none;
    }
  }

  &__lbl {
    width: 100px;
    flex-shrink: 0;

    font-family: var(--sm);
    font-size: 9px;
    color: var(--muted);
  }

  &__val {
    font-size: 13px;
    font-weight: 700;
  }

  &__edit {
    margin-left: auto;

    font-family: var(--sm);
    font-size: 9px;
    text-decoration: underline;
    color: var(--blue);

    cursor: pointer;
  }
}
</style>
