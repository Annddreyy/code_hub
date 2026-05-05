<template>
    <div class="filters">
        <Teleport
            v-if="isMounted"
            :disabled="teleportDisabled"
            to="#searchbar"
        >
            <div class="filters__search-box">
                <span class="filters__loupe"> 🔍 </span>
                <input
                    v-model="searchText"
                    class="filters__search-input"
                    placeholder="Найти задачу..."
                />
            </div>
        </Teleport>

        <div class="filters__section">
            <div class="filters__label">Тема</div>
            <Teleport
                v-if="isMounted"
                :disabled="teleportDisabled"
                to="#topics"
            >
                <div class="filters__tags">
                    <button
                        v-for="topic in topics"
                        :key="topic"
                        :class="[
                            'filters__tag',
                            { 'filters__tag--on': selectedTopics.includes(topic) },
                        ]"
                        @click="toggleTopic(topic)"
                    >
                        {{ topic }}
                    </button>
                </div>
            </Teleport>
        </div>

        <div class="filters__section">
            <div class="filters__label">Статус</div>
            <Teleport
                v-if="isMounted"
                :disabled="teleportDisabled"
                to="#statuses"
            >
                <div class="filters__statuses">
                    <div
                        v-for="status in STATUSES"
                        :key="status.value"
                        :class="{
                            status: true,
                            [`status--${status.color}`]: selectedStatuses.includes(status.value),
                        }"
                        @click="toggleStatus(status.value)"
                    >
                        <div :class="['status__dot', `status__dot--${status.color}`]" />
                        {{ status.title }}
                    </div>
                </div>
            </Teleport>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Status } from '@/entities/challenge';
import { MOBILE_BREAKPOINT } from '@/constants';

type ChallengeStatus = {
    value: Status;
    title: string;
    color: string;
};

const STATUSES: ChallengeStatus[] = [
    { value: 'done', title: 'Решено', color: 'green' },
    { value: 'in-progress', title: 'Попытки', color: 'yellow' },
    { value: 'todo', title: 'Не решались', color: 'gray' },
];

defineProps<{
    topics: string[];
}>();

const emit = defineEmits<{
    setTitle: [title?: string];
    setTopics: [topics: string[]];
    setStatuses: [statuses: Status[]];
}>();

const searchText = defineModel<string>('searchText');

const isMounted = ref(false);
const teleportDisabled = ref(true);

const selectedTopics = ref<string[]>([]);
const selectedStatuses = ref<Status[]>([]);

watch(searchText, (value) => {
    emit('setTitle', value);
});

const handleResize = () => {
    teleportDisabled.value = window.innerWidth > MOBILE_BREAKPOINT;
};

onMounted(() => {
    isMounted.value = true;
    handleResize();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

const toggleTopic = (topic: string) => {
    if (selectedTopics.value.includes(topic)) {
        selectedTopics.value = selectedTopics.value.filter((elem) => elem !== topic);
    } else {
        if (selectedTopics.value.length) {
            selectedTopics.value.push(topic);
        } else {
            selectedTopics.value = [topic];
        }
    }

    emit('setTopics', selectedTopics.value);
};

const toggleStatus = (status: Status) => {
    if (selectedStatuses.value.includes(status)) {
        selectedStatuses.value = selectedStatuses.value.filter((elem) => elem !== status);
    } else {
        if (selectedStatuses.value.length) {
            selectedStatuses.value.push(status);
        } else {
            selectedStatuses.value = [status];
        }
    }
    emit('setStatuses', selectedStatuses.value);
};
</script>

<style lang="scss" scoped>
.filters {
    width: 100%;
    flex-shrink: 0;

    background: var(--s1);
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--s3);
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

    &__loupe {
        font-size: 12px;
        color: var(--muted);
    }

    &__search-input {
        width: 100%;

        font-family: var(--sans);
        font-size: 12px;
        color: var(--text);

        border: none;
        outline: none;
        background: none;

        &::placeholder {
            color: var(--dim);
        }
    }

    &__label {
        margin-bottom: 10px;

        font-family: var(--sm);
        font-size: 8px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--muted);
    }

    &__section {
        margin-bottom: 20px;
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }

    &__tag {
        padding: 3px 8px;

        font-family: var(--sm);
        font-size: 8px;
        font-weight: 700;
        color: var(--muted);

        border: 1px solid var(--b2);
        border-radius: 4px;

        background: transparent;
        cursor: pointer;

        transition: all 0.15s;

        &:hover {
            color: var(--text2);
            border-color: var(--b3);
        }

        &--on {
            color: var(--blue);
            border-color: rgba(79, 156, 255, 0.35);
            background: rgba(79, 156, 255, 0.1);
        }
    }

    &__statuses {
        display: flex;
        flex-direction: column;
        gap: 5px;

        .status {
            display: flex;
            align-items: center;
            gap: 8px;

            padding: 7px 10px;

            font-size: 12px;
            font-weight: 600;
            color: var(--muted);

            border: 1px solid var(--b1);
            border-radius: 7px;

            background: var(--s2);
            user-select: none;
            cursor: pointer;

            transition: all 0.15s;

            &:hover {
                color: var(--text2);
                border-color: var(--b2);
            }

            &--green {
                color: var(--green);
                border-color: rgba(63, 185, 80, 0.3);
                background: rgba(63, 185, 80, 0.07);
            }

            &--yellow {
                color: var(--yellow);
                border-color: rgba(227, 179, 65, 0.3);
                background: rgba(227, 179, 65, 0.07);
            }

            &--gray {
                color: var(--red);
                border-color: rgba(255, 92, 114, 0.3);
                background: rgba(255, 92, 114, 0.07);
            }

            &__dot {
                width: 8px;
                height: 8px;
                flex-shrink: 0;

                border-radius: 50%;

                &--green {
                    background-color: var(--green);
                }

                &--yellow {
                    background-color: var(--yellow);
                }

                &--gray {
                    background-color: var(--dim);
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .filters {
        &__statuses {
            flex-direction: row;

            .status {
                font-size: 10px;
            }
        }

        &__search-box {
            margin-bottom: 0;
        }
    }
}
</style>
