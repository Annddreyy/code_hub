<template>
    <div class="canvas-wrap">
        <div class="canvas-toolbar">
            <div class="legend">
                <div
                    v-for="legendItem in LEGENG_ITEMS"
                    :key="legendItem.title"
                    class="legend__item"
                >
                    <div :class="`legend__dot legend__dot--${legendItem.color}`" />
                    {{ legendItem.title }}
                </div>
            </div>
        </div>

        <ClientOnly>
            <div
                id="canvas"
                class="canvas"
                @mousedown="onMouseDown"
                @mousemove="onMouseMove"
                @mouseup="onMouseUp"
                @mouseleave="onMouseUp"
                @wheel.prevent="onWheel"
            >
                <svg
                    :width="config.width"
                    :height="config.height"
                    class="roadmap-svg"
                    :style="{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        transformOrigin: '0 0',
                        transition: isDragging ? 'none' : 'transform 0.1s',
                    }"
                >
                    <defs>
                        <marker
                            id="arr"
                            marker-width="8"
                            marker-height="8"
                            ref-x="4"
                            ref-y="4"
                            orient="auto"
                        >
                            <path
                                d="M1,1 L7,4 L1,7 Z"
                                :fill="markersConfig.default"
                            />
                        </marker>
                        <marker
                            id="arr-g"
                            marker-width="8"
                            marker-height="8"
                            ref-x="4"
                            ref-y="4"
                            orient="auto"
                        >
                            <path
                                d="M1,1 L7,4 L1,7 Z"
                                :fill="markersConfig.completed"
                            />
                        </marker>
                        <marker
                            id="arr-b"
                            marker-width="8"
                            marker-height="8"
                            ref-x="4"
                            ref-y="4"
                            orient="auto"
                        >
                            <path
                                d="M1,1 L7,4 L1,7 Z"
                                :fill="markersConfig.active"
                            />
                        </marker>
                    </defs>

                    <RoadmapConnection
                        v-for="connection in connections"
                        :key="`${connection.fromNodeId}-${connection.toNodeId}`"
                        :connection="connection"
                        :nodes="roadmapNodes"
                        :marker-types="{
                            done: 'url(#arr-g)',
                            active: 'url(#arr-b)',
                            locked: 'url(#arr)',
                        }"
                    />
                    <NodeCard
                        v-for="roadmapNode in roadmapNodes"
                        :key="roadmapNode.id"
                        v-bind="roadmapNode"
                    />
                </svg>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import type { RoadmapNode } from '@/api';
import type { RoadmapConfig, RoadmapConnection as RoadmapConnectionType } from '@/api/roadmap';

import NodeCard from './NodeCard.vue';
import RoadmapConnection from './RoadmapConnection.vue';

const LEGENG_ITEMS: {
    title: string;
    color: string;
}[] = [
    {
        title: 'Выполненные',
        color: 'green',
    },
    {
        title: 'Активные',
        color: 'green',
    },
    {
        title: 'Закрытые',
        color: 'gray',
    },
    {
        title: 'Необязательные',
        color: 'purple',
    },
];

defineProps<{
    connections: RoadmapConnectionType[];
    config: RoadmapConfig;
    roadmapNodes: RoadmapNode[];
}>();

const pan = reactive({ x: 0, y: 0 });
const zoom = ref(1);
const isDragging = ref(false);
const dragStart = reactive({ x: 0, y: 0 });
const panStart = reactive({ x: 0, y: 0 });

const onMouseDown = (e: MouseEvent) => {
    if ((e.target as Element).closest('.node-inner')) return;
    isDragging.value = true;
    dragStart.x = e.clientX;
    dragStart.y = e.clientY;
    panStart.x = pan.x;
    panStart.y = pan.y;
};

const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return;
    pan.x = panStart.x + (e.clientX - dragStart.x);
    pan.y = panStart.y + (e.clientY - dragStart.y);
};

const onMouseUp = () => {
    isDragging.value = false;
};

const onWheel = (e: WheelEvent) => {
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    zoom.value = Math.min(2, Math.max(0.3, zoom.value * delta));
};

const markersConfig = computed(() => ({
    default: 'rgba(72,79,88,.6)',
    completed: 'rgba(63,185,80,.5)',
    active: 'rgba(79,156,255,.6)',
}));
</script>

<style lang="scss" scoped>
.canvas-wrap {
    display: flex;
    flex-direction: column;
    flex: 1;

    overflow: hidden;
}

.canvas-toolbar {
    height: 48px;
    padding: 0 20px;

    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-bottom: 1px solid var(--b1);
    background: rgba(6, 9, 13, 0.6);

    &__title {
        font-size: 16px;
        font-weight: 800;
        letter-spacing: -0.01em;
    }

    &__sub {
        margin-left: 2px;

        font-family: var(--spaced);
        font-size: 9px;
        color: var(--muted);
    }

    &__spacer {
        flex: 1;
    }

    &__btn {
        padding: 5px 12px;

        font-family: var(--spaced);
        font-size: 8px;
        font-weight: 700;
        color: var(--muted);

        border: 1px solid var(--b2);
        border-radius: 6px;

        background: transparent;
        cursor: pointer;

        transition: all 0.15s;

        &:hover {
            color: var(--text);
            border-color: var(--b2);
        }
    }
}

.legend {
    display: flex;
    align-items: center;
    gap: 14px;

    &__item {
        display: flex;
        align-items: center;
        gap: 5px;

        font-family: var(--spaced);
        font-size: 8px;
        color: var(--muted);
    }

    &__dot {
        width: 8px;
        height: 8px;

        border-radius: 2px;

        &--green {
            background-color: var(--green);
        }

        &--blue {
            background-color: var(--blue);
        }

        &--gray {
            background-color: var(--gray);
        }

        &--purple {
            background-color: var(--purple);
        }
    }
}

.canvas {
    position: relative;
    flex: 1;

    overflow: auto;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }

    &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--s3);
        border-radius: 3px;
    }
}

#roadmap-svg {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}

.nodes {
    position: absolute;
    top: 0;
    left: 0;
}
</style>
