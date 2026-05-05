<template>
    <path
        :d="pathData"
        :stroke="connection.strokeColor || defaultStrokeColor"
        :stroke-width="connection.strokeWidth || DEFAULT_STROKE_WIDTH"
        :stroke-dasharray="connection.strokeDasharray || 'none'"
        :marker-end="markerEndUrl"
        fill="none"
    />
</template>

<script setup lang="ts">
import type { RoadmapConnection, RoadmapNode } from '@/api/roadmap';
import { NODE_WIDTH, NODE_HEIGHT } from '@/constants';

const { nodes, connection, markerTypes } = defineProps<{
    connection: RoadmapConnection;
    nodes: RoadmapNode[];
    markerTypes: {
        done: string;
        active: string;
        locked: string;
    };
}>();

const DEFAULT_STROKE_WIDTH = 2;

const fromNode = computed(() => nodes.find((node) => node.id === connection.fromNodeId));
const toNode = computed(() => nodes.find((node) => node.id === connection.toNodeId));

const getAnchorPoint = (
    node: RoadmapNode,
    anchor: 'top' | 'right' | 'bottom' | 'left' = 'bottom',
) => {
    const cx = node.left + NODE_WIDTH / 2;
    const cy = node.top + NODE_HEIGHT / 2;

    switch (anchor) {
        case 'top':
            return { x: cx, y: node.top };
        case 'bottom':
            return { x: cx, y: node.top + NODE_HEIGHT };
        case 'left':
            return { x: node.left, y: cy };
        case 'right':
            return { x: node.left + NODE_WIDTH, y: cy };
    }
};

const adjustedPoints = computed(() => {
    if (!fromNode.value || !toNode.value) {
        return {
            start: { x: 0, y: 0 },
            end: { x: 0, y: 0 },
        };
    }

    return {
        start: getAnchorPoint(fromNode.value, connection.fromAnchor ?? 'bottom'),
        end: getAnchorPoint(toNode.value, connection.toAnchor ?? 'top'),
    };
});

const pathData = computed(() => {
    const { start, end } = adjustedPoints.value;
    const curve = connection.curve;

    if (!curve || curve.type === 'linear') {
        return `M${start.x},${start.y} L${end.x},${end.y}`;
    }

    if (curve.type === 'bezier') {
        const cp1 = curve.controlPoint1 ?? { x: start.x, y: (start.y + end.y) / 2 };
        const cp2 = curve.controlPoint2 ?? { x: end.x, y: (start.y + end.y) / 2 };
        return `M${start.x},${start.y} C${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${end.x},${end.y}`;
    }

    return `M${start.x},${start.y} L${end.x},${end.y}`;
});

const markerEndUrl = computed(() => {
    const markerType = connection.markerType;
    if (!markerType) return '';
    return markerTypes[markerType];
});

const defaultStrokeColor = computed(() => {
    switch (connection.markerType) {
        case 'done':
            return 'rgba(63,185,80,.5)';
        case 'active':
            return 'rgba(79,156,255,.6)';
        default:
            return 'rgba(72,79,88,.4)';
    }
});
</script>
