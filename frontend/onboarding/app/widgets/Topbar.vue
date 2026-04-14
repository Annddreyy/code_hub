<template>
  <div class="topbar">
    <div class="logo">
      <span class="logo__bracket">&lt;</span>
      <span> C<span class="hide-on-mobile">ode</span>H<span class="hide-on-mobile">ub</span> </span>
      <span class="logo__bracket">/&gt;</span>
      <div class="logo__dot" />
    </div>

    <div class="step-txt">Шаг {{ currentStepNumber }} из 4</div>

    <div class="step-track">
      <template
        v-for="(step, index) in steps"
        :key="step"
      >
        <div class="step-track__step">
          <div
            :class="[
              'step-track__num',
              { 'step-track__num--done': getStepStatus(stepsOrder[index]!) === 'completed' },
              { 'step-track__num--active': getStepStatus(stepsOrder[index]!) === 'active' },
            ]"
          >
            <template v-if="getStepStatus(stepsOrder[index]!) === 'completed'">✓</template>
            <template v-else>{{ index + 1 }}</template>
          </div>
          <div
            :class="[
              'step-track__label',
              { 'step-track__label--active': getStepStatus(stepsOrder[index]!) === 'active' },
            ]"
          >
            {{ step }}
          </div>
        </div>
        <div
          v-if="index < steps.length - 1"
          :class="[
            'step-track__line',
            { 'step-track__line--done': getStepStatus(stepsOrder[index]!) === 'completed' },
          ]"
        />
      </template>
    </div>

    <div class="step-dots">
      <div class="sd active" />
      <div class="sd" />
      <div class="sd" />
      <div class="sd" />
    </div>
    <a
      href="/"
      class="skip-btn"
    >
      Пропустить →
    </a>
  </div>
</template>

<script setup lang="ts">
import { Steps } from '@/types';

type StepStatus = 'completed' | 'active' | 'pending';

const stepsOrder = [Steps.LANGUAGE, Steps.EXPERIENCE, Steps.GOAL, Steps.ROADMAP];
const steps = ['Язык', 'Опыт', 'Цели', 'Дорожные карты'];

const { currentStep } = defineProps<{
  currentStep: Steps;
}>();

const currentStepNumber = computed(() => stepsOrder.indexOf(currentStep) + 1);

const getStepStatus = (stepName: Steps): StepStatus => {
  const currentIndex = stepsOrder.indexOf(currentStep);
  const stepIndex = stepsOrder.indexOf(stepName);

  if (stepIndex < currentIndex) {
    return 'completed';
  }
  if (stepIndex === currentIndex) {
    return 'active';
  }
  return 'pending';
};
</script>

<style lang="scss" scoped>
.topbar {
  position: relative;
  height: 56px;
  padding: 0 40px;

  display: flex;
  align-items: center;

  border-bottom: 1px solid var(--b1);
  background: rgba(7, 9, 13, 0.8);
  backdrop-filter: blur(20px);

  z-index: 10;
}

.logo {
  display: flex;
  align-items: center;
  gap: 7px;

  font-family: var(--sm);
  font-size: 15px;
  font-weight: 700;

  &__bracket {
    color: var(--blue);
  }

  &__dot {
    width: 6px;
    height: 6px;

    border-radius: 50%;
    background: var(--green);

    animation: pulse 2s infinite;
  }
}

.step-txt {
  display: none;
  font-family: var(--sm);
  font-size: 9px;
  color: var(--muted);
}

.step-track {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &__step {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__num {
    width: 28px;
    height: 28px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: var(--sm);
    font-size: 10px;
    font-weight: 700;
    color: var(--muted);

    border-radius: 50%;
    border: 1px solid var(--b2);
    background: var(--s2);

    transition: all 0.3s;
    position: relative;

    &--done {
      color: #000;
      border-color: var(--green);
      background: var(--green);
    }

    &--active {
      color: #000;
      border-color: var(--blue);
      background: var(--blue);
    }
  }

  &__label {
    font-family: var(--sm);
    font-size: 9px;
    white-space: nowrap;
    text-align: center;
    color: var(--muted);

    &--active {
      color: var(--text2);
    }
  }

  &__line {
    width: 48px;
    height: 1px;
    margin: 0 4px;

    background: var(--b2);
    transition: background 0.3s;

    &--done {
      background: var(--green);
    }
  }
}

.skip-btn {
  font-family: var(--sm);
  font-size: 10px;
  text-decoration: underline;
  color: var(--muted);

  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: var(--text2);
  }
}

@media (max-width: 768px) {
  .topbar {
    padding: 0 20px;
    justify-content: space-between;

    .step-txt {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }

    .step-track {
      display: none;
    }

    .skip-btn {
      flex-shrink: 0;
    }
  }
}
</style>
