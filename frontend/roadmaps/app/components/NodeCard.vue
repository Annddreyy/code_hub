<template>
    <g
        :transform="`translate(${left}, ${top})`"
        @click="$emit('click')"
    >
        <g
            class="node-inner"
            :class="`node--${status}`"
        >
            <rect
                v-if="status === NodeStatus.ACTIVE"
                :width="NODE_WIDTH"
                :height="NODE_HEIGHT"
                rx="14"
                :fill="nodeBackgroundColor"
                :stroke="nodeStrokeColor"
                stroke-width="6"
                opacity="0.15"
                class="node__glow"
            />

            <rect
                :width="NODE_WIDTH"
                :height="NODE_HEIGHT"
                rx="14"
                :fill="nodeBackgroundColor"
                :stroke="nodeStrokeColor"
                stroke-width="1.5"
                class="node__rect"
            />

            <text
                x="14"
                y="28"
                font-size="18"
                dominant-baseline="middle"
                class="node__icon"
            >
                {{ icon }}
            </text>

            <text
                x="14"
                y="55"
                font-size="11"
                font-weight="800"
                dominant-baseline="middle"
                class="node__title"
            >
                {{ title }}
            </text>

            <text
                x="14"
                y="70"
                font-size="8"
                dominant-baseline="middle"
                class="node__description"
            >
                {{ description }}
            </text>

            <g transform="translate(14, 78)">
                <rect
                    :width="tagWidth"
                    height="15"
                    rx="3"
                    :fill="tagBackgroundColor"
                />
                <text
                    :x="tagWidth / 2"
                    y="7.5"
                    font-size="7"
                    font-weight="700"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    class="node__tag"
                >
                    {{ tag }}
                </text>

                <text
                    x="122"
                    y="7.5"
                    font-size="8"
                    font-weight="600"
                    text-anchor="end"
                    dominant-baseline="middle"
                    class="node__xp"
                >
                    +{{ xpCount }} XP
                </text>
            </g>

            <g
                v-if="status === NodeStatus.DONE"
                transform="translate(148, -8)"
            >
                <circle
                    r="10"
                    fill="var(--green)"
                    stroke="var(--bg)"
                    stroke-width="2"
                />
                <text
                    x="0"
                    y="0"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    font-size="9"
                    fill="white"
                >
                    ✓
                </text>
            </g>

            <g
                v-else-if="status === NodeStatus.ACTIVE"
                transform="translate(148, -8)"
            >
                <circle
                    r="14"
                    fill="none"
                    stroke="var(--blue)"
                    stroke-width="1.5"
                    class="node__pulse-ring"
                />
                <circle
                    r="10"
                    fill="var(--blue)"
                    stroke="var(--bg)"
                    stroke-width="2"
                />
                <circle
                    r="4"
                    fill="white"
                    opacity="0.9"
                />
            </g>

            <g
                v-else-if="status === NodeStatus.LOCKED"
                transform="translate(148, -8)"
            >
                <circle
                    r="10"
                    fill="var(--s3)"
                    stroke="var(--bg)"
                    stroke-width="2"
                />
                <text
                    x="0"
                    y="0"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    font-size="9"
                    fill="white"
                >
                    🔒
                </text>
            </g>
        </g>
    </g>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NodeStatus } from '@/api';

const { status, tag } = defineProps<{
    title: string;
    description: string;
    status: NodeStatus;
    left: number;
    top: number;
    icon: string;
    xpCount: number;
    tag: string;
}>();

defineEmits<{
    click: [];
}>();

const NODE_WIDTH = 160;
const NODE_HEIGHT = 110;

const tagWidth = computed(() => Math.max(40, tag.length * 7 + 12));

const nodeBackgroundColor = computed(() => {
    switch (status) {
        case NodeStatus.DONE:
            return 'rgba(13, 21, 14, 0.95)';
        case NodeStatus.ACTIVE:
            return 'rgba(10, 18, 28, 0.95)';
        default:
            return 'rgba(12, 14, 18, 0.80)';
    }
});

const nodeStrokeColor = computed(() => {
    switch (status) {
        case NodeStatus.DONE:
            return 'rgba(63, 185, 80, 0.45)';
        case NodeStatus.ACTIVE:
            return 'rgba(79, 156, 255, 0.60)';
        default:
            return 'rgba(72, 79, 88, 0.30)';
    }
});

const tagBackgroundColor = computed(() => {
    switch (status) {
        case NodeStatus.DONE:
            return 'rgba(63, 185, 80, 0.10)';
        case NodeStatus.ACTIVE:
            return 'rgba(79, 156, 255, 0.10)';
        default:
            return 'rgba(72, 79, 88, 0.10)';
    }
});
</script>

<style lang="scss" scoped>
.node-inner {
    transform-origin: 80px 55px;
    cursor: pointer;

    transition: transform 0.18s ease;

    &:hover {
        transform: scale(1.03);

        .node__rect {
            stroke-opacity: 0.85;
        }
    }

    &__rect {
        transition: stroke-opacity 0.18s ease;
    }
}

.node {
    &__pulse-ring {
        transform-origin: 0 0;
        animation: pulse-ring 2s ease-out infinite;
    }

    &__icon {
        dominant-baseline: hanging;
    }

    &__description {
        fill: var(--muted);
        font-family: var(--spaced);
    }

    &__xp {
        fill: var(--yellow);
    }

    &--active {
        .node__glow {
            animation: glow-breathe 2.5s ease-in-out infinite;
        }

        .node__tag {
            fill: var(--blue);
        }
    }

    &--done {
        .node__title {
            fill: var(--green);
        }

        .node__tag {
            fill: var(--green);
        }
    }

    &--active {
        .node__title {
            fill: var(--blue);
        }
    }

    &--locked {
        .node__title {
            fill: var(--muted);
        }

        .node__tag {
            fill: var(--dim);
        }
    }
}

@keyframes pulse-ring {
    0% {
        r: 10;
        opacity: 0.7;
    }
    70% {
        r: 16;
        opacity: 0;
    }
    100% {
        r: 16;
        opacity: 0;
    }
}

@keyframes glow-breathe {
    0%,
    100% {
        opacity: 0.1;
    }
    50% {
        opacity: 0.25;
    }
}
</style>
