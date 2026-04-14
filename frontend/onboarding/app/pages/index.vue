<template>
    <div class="app">
        <Topbar :current-step="currentStep" />
        <Orbs />
        <main>
            <div class="step-wrapper">
                <div class="step-content">
                    <KeepAlive>
                        <StepWrapper
                            v-if="currentStep === Steps.LANGUAGE"
                            :title="STEPS_CONTENT[0]?.title!"
                            :description="STEPS_CONTENT[0]?.description!"
                            :step="1"
                            :next-button-disabled="!userChoices.languages.length"
                            is-first-step
                            @next-step="currentStep = Steps.EXPERIENCE"
                        >
                            <div class="languages">
                                <LanguageCard
                                    v-for="language in languages"
                                    :key="language.id"
                                    v-bind="language"
                                    @select="
                                        (language: Language) => userChoices.languages.push(language)
                                    "
                                    @deselect="
                                        (language: Language) =>
                                            (userChoices.languages = userChoices.languages.filter(
                                                (elem) => elem.id !== language.id,
                                            ))
                                    "
                                />
                            </div>
                        </StepWrapper>
                        <StepWrapper
                            v-else-if="currentStep === Steps.EXPERIENCE"
                            class="experience-step"
                            :title="STEPS_CONTENT[1]?.title!"
                            :description="STEPS_CONTENT[1]?.description!"
                            :step="2"
                            :next-button-disabled="!userChoices.experienceLevels.length"
                            @next-step="currentStep = Steps.GOAL"
                            @prev-step="currentStep = Steps.LANGUAGE"
                        >
                            <div class="experiences">
                                <ExperienceLevelCard
                                    v-for="experienceLevel in experienceLevels"
                                    :key="experienceLevel.id"
                                    v-bind="experienceLevel"
                                    @select="
                                        (experienceLevel: ExperienceLevel) =>
                                            userChoices.experienceLevels.push(experienceLevel)
                                    "
                                    @deselect="
                                        (experienceLevel: ExperienceLevel) =>
                                            (userChoices.experienceLevels =
                                                userChoices.experienceLevels.filter(
                                                    (experience) =>
                                                        experience.id !== experienceLevel.id,
                                                ))
                                    "
                                />
                            </div>
                        </StepWrapper>
                        <StepWrapper
                            v-else-if="currentStep === Steps.GOAL"
                            class="goal-step"
                            :title="STEPS_CONTENT[2]?.title!"
                            :description="STEPS_CONTENT[2]?.description!"
                            :step="3"
                            :next-button-disabled="!userChoices.goals.length"
                            @next-step="currentStep = Steps.ROADMAP"
                            @prev-step="currentStep = Steps.EXPERIENCE"
                        >
                            <div class="goals">
                                <GoalCard
                                    v-for="goal in goals"
                                    :key="goal.id"
                                    v-bind="goal"
                                    @select="(goal: Goal) => userChoices.goals.push(goal)"
                                    @deselect="
                                        (goal: Goal) =>
                                            (userChoices.goals = userChoices.goals.filter(
                                                (elem) => elem.id !== goal.id,
                                            ))
                                    "
                                />
                            </div>
                        </StepWrapper>

                        <StepWrapper
                            v-else-if="currentStep === Steps.ROADMAP"
                            class="roadmap-step"
                            :title="STEPS_CONTENT[3]?.title!"
                            :description="STEPS_CONTENT[3]?.description!"
                            :step="4"
                            is-last-step
                            @next-step="sendResults"
                            @prev-step="currentStep = Steps.GOAL"
                        >
                            <Summary
                                :user-choices="userChoices"
                                @go-to-step="goToStep"
                            />
                            <div class="roadmaps">
                                <RoadmapCard
                                    v-for="roadmap in roadmaps"
                                    :key="roadmap.id"
                                    v-bind="roadmap"
                                />
                            </div>
                        </StepWrapper>
                    </KeepAlive>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { Steps, type UserChoices } from '@/types';

import {
    experienceLevelApi,
    ExperienceLevelCard,
    type ExperienceLevel,
} from '@/entities/experienceLevel';
import { goalApi, GoalCard, type Goal } from '@/entities/goal';
import { languageApi, LanguageCard, type Language } from '@/entities/language';
import { roadmapsApi, RoadmapCard } from '@/entities/roadmap';

import { Orbs, Topbar, StepWrapper, Summary } from '@/widgets';

type StepContent = {
    title: string;
    description: string;
};

const STEPS_CONTENT: StepContent[] = [
    {
        title: 'Что ты хочешь изучить?',
        description:
            'Выберите основной язык или стек. Позже вы сможете добавить что-то еще — начните с того, что вас больше всего интересует.',
    },
    {
        title: 'Каков ваш уровень опыта?',
        description:
            'Мы разработаем программу обучения и подберем уровень сложности специально для вас. Здесь нет неправильных ответов.',
    },
    {
        title: 'Какова ваша цель?',
        description:
            'Выберите все, что подходит. Мы соответствующим образом расставим приоритеты в вашей дорожной карте.',
    },
    {
        title: 'Ваша дорожная карта готова 🎉',
        description:
            'На основе ваших ответов мы составили индивидуальный план обучения. Вы можете изменить его в любое время.',
    },
];

const currentStep = ref<Steps>(Steps.LANGUAGE);
const userChoices = ref<UserChoices>({
    languages: [],
    experienceLevels: [],
    goals: [],
});

useHead({
    title: 'Онбординг',
});

const [experienceLevelsResult, languagesResult, goalsResult, roadmapsResult] = await Promise.all([
    useAsyncData('experiences', () => experienceLevelApi.getExperienceLevel()),
    useAsyncData('languages', () => languageApi.getLanguages()),
    useAsyncData('goals', () => goalApi.getGoals()),
    useAsyncData('roadmaps', () => roadmapsApi.getRoadmaps()),
]);

const experienceLevels = experienceLevelsResult.data;
const languages = languagesResult.data;
const goals = goalsResult.data;
const roadmaps = roadmapsResult.data;

const goToStep = (step: Steps) => {
    currentStep.value = step;
};

const sendResults = () => {
    // будет запрос к API
    console.log(userChoices);
    window.location.replace('/');
};
</script>

<style lang="scss">
@use '@/styles/index.scss';

.app {
    min-height: 100vh;

    display: flex;
    flex-direction: column;
}

main {
    position: relative;

    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    z-index: 1;

    .step-wrapper {
        width: 760px;
        padding: 44px;

        border: 1px solid var(--b1);
        border-radius: 16px;

        background: rgba(13, 17, 23, 0.75);
        backdrop-filter: blur(24px);
        box-shadow: 0 32px 100px rgba(0, 0, 0, 0.5);

        animation: scaleIn 0.4s ease both;
    }

    .step-content {
        animation: slideL 0.3s ease both;

        .languages,
        .experiences,
        .goals,
        .roadmaps {
            display: grid;
            gap: 10px;
        }

        .languages {
            grid-template-columns: repeat(4, 1fr);
        }

        .experiences {
            grid-template-columns: repeat(3, 1fr);
        }

        .goals {
            grid-template-columns: repeat(2, 1fr);
        }

        .roadmaps {
            grid-template-columns: repeat(3, 1fr);
        }
    }
}

@media (max-width: 768px) {
    main {
        align-items: flex-start;
        padding: 16px;

        .step-wrapper {
            display: flex;

            min-height: calc(100vh - 88px);
            padding: 0;

            background: transparent;
            backdrop-filter: none;
        }

        .step-content {
            display: flex;
            flex: 1;

            .languages {
                grid-template-columns: repeat(2, 1fr);
            }

            .experiences,
            .goals,
            .roadmaps {
                grid-template-columns: 1fr;
            }
        }
    }
}
</style>
