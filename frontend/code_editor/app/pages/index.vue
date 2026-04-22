<template>
    <div>
        <Cover />
        <main>
            <section
                v-if="challenge"
                class="challenge-pane"
            >
                <ChallengeHead
                    :id="challenge.id"
                    :tags="challenge.tags"
                    :title="challenge.title"
                    :difficulty="challenge.difficulty"
                    :topics="challenge.topics"
                    :xp-reward="challenge.xpReward"
                />
                <Tabs @set-tab="setCurrentTab" />
                <ChallengeBody
                    v-if="currentTab === ETabs.DESCRIPTION"
                    :html="challenge.descriptionMD"
                />
                <Submissions
                    v-else-if="currentTab === ETabs.SOLUTIONS && submissions"
                    :submissions
                />
                <Hints
                    v-else-if="currentTab === ETabs.HINTS && hints"
                    :hints
                    challenge-id="1"
                />
            </section>
            <div v-else>Ошибка загрузки задачи, обновите страницу</div>
            <section class="editor-pane">
                <Toolbar
                    v-if="languages && selectedLanguage"
                    v-model:language="selectedLanguage"
                    v-model:theme="selectedTheme"
                    :languages="languages"
                    :themes="CODE_THEMES"
                />
                <CodeArea
                    v-if="selectedLanguage && selectedTheme"
                    ref="codeArea"
                    :language="selectedLanguage"
                    :template="findCodeTemplate()"
                    :code-theme="selectedTheme"
                />
                <Console
                    v-if="challenge"
                    :test-cases="challenge.tests"
                    :result-stats="challengeResultsArray"
                />
            </section>
            <Actions
                v-if="difficultyResults"
                class="actions"
                v-bind="difficultyResults"
                @run="runCode"
                @send="sendCode"
            />
        </main>
    </div>
</template>

<script setup lang="ts">
import { ChallengeHead, ChallengeBody, challengeApi } from '@/entities/challenge';
import { Tabs, Toolbar, Console, CodeArea, Actions, Submissions, Hints } from '@/widgets';

enum ETabs {
    DESCRIPTION = 'description',
    SOLUTIONS = 'solutions',
    HINTS = 'hints',
}

const CODE_THEMES = ['github-dark', 'docco', 'atom-one-dark', 'vs2015', 'monokai'];

const codeArea = useTemplateRef('codeArea');

const [
    challengeResult,
    challengeResults,
    languagesResult,
    submissionsResult,
    hintsResult,
    difficultyResult,
] = await Promise.all([
    useAsyncData('challenge', () => challengeApi.getChallenge()),
    useAsyncData('challengeResults', () => challengeApi.getChallengeResults()),
    useAsyncData('languages', () => challengeApi.getLanguages()),
    useAsyncData('submissions', () => challengeApi.getSubmissions()),
    useAsyncData('hints', () => challengeApi.getHints()),
    useAsyncData('difficulty', () => challengeApi.getDifficultyResults()),
]);

const challenge = challengeResult.data;
const challengeResultsArray = challengeResults.data;
const submissions = submissionsResult.data;
const hints = hintsResult.data;
const languages = languagesResult.data;
const difficultyResults = difficultyResult.data;

const selectedLanguage = ref<string | undefined>(languages.value?.[0]?.title);
const selectedTheme = ref<string | undefined>(CODE_THEMES[0]);

const currentTab = ref<ETabs>(ETabs.DESCRIPTION);

const setCurrentTab = (tab: ETabs) => {
    currentTab.value = tab;
};

const sendCode = () => {
    console.log(codeArea.value?.rawCode);
};

const runCode = () => {
    console.log(codeArea.value?.rawCode);
};

const findCodeTemplate = () => {
    return (
        languages.value?.find((lang) => lang.title === selectedLanguage.value)?.codeTemplate || ''
    );
};

useHead({
    title: challenge.value?.title,
});
</script>

<style lang="scss" scoped>
main {
    position: relative;
    min-height: 100vh;

    display: flex;
    flex: 1;

    overflow: hidden;
    z-index: 1;

    .challenge-pane {
        width: 38%;
        min-width: 340px;
        height: 100vh;

        display: flex;
        flex-direction: column;

        border-right: 1px solid var(--b1);
        background: var(--s1);

        overflow: auto;

        &::-webkit-scrollbar {
            width: 3px;
        }

        &::-webkit-scrollbar-thumb {
            background: var(--s3);
        }
    }

    .editor-pane {
        height: 100vh;

        display: flex;
        flex-direction: column;
        flex: 1;

        overflow: hidden;
    }
}

@media (max-width: 1220px) {
    main {
        display: grid;
        grid-template-areas:
            'description code'
            'description actions';
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 70vh 30vh;

        .challenge-pane {
            width: 100%;
            grid-area: description;
        }

        .editor-pane {
            grid-area: code;
        }

        .actions {
            width: 100%;
            grid-area: actions;
        }
    }
}

@media (max-width: 768px) {
    main {
        display: grid;
        grid-template-areas:
            'description'
            'code'
            'actions';
        grid-template-columns: 1fr;
        grid-template-rows: 45vh 35vh 20vh;

        .challenge-pane {
            width: 100vw;
            min-width: 280px;
            height: 100%;
            grid-area: description;
        }

        .editor-pane {
            height: 100%;
            overflow: auto;
        }

        .actions {
            height: 100%;
        }
    }
}
</style>
