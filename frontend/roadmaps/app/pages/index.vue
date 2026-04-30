<template>
    <div class="layout">
        <Sidebar
            :total-nodes-count="roadmapData?.totalNodes || 0"
            :current-node="roadmapData?.userMeta.completedNodes || 0"
            :roadmap-title="roadmapData?.title || 'Дорожная карта не найдена'"
        />
        <Canvas
            :roadmap-nodes="roadmap?.nodes || []"
            :connections="roadmap?.connections || []"
            :config="roadmap?.config || { width: 1200, height: 1200 }"
        />
        <DetailPanel
            :status="currentNode?.node?.status || NodeStatus.ACTIVE"
            :title="currentNode?.node?.title || 'Узел карты не загрузился'"
            :description="currentNode?.node?.description || '-'"
            :icon="currentNode?.node.icon || ''"
            :stats="currentNode?.stats || []"
            :lessons="currentNode?.lessons || []"
        />
    </div>
</template>

<script setup lang="ts">
import { DetailPanel } from '@/components';
import { roadmapsApi, NodeStatus } from '@/api/roadmap';

const { data: roadmapData } = await useAsyncData(() => roadmapsApi.getRoadmap());
const { data: roadmap } = await useAsyncData(() => roadmapsApi.getNodes());
const { data: currentNode } = await useAsyncData(() => roadmapsApi.getSelectedNode());

useHead({
    title: roadmapData.value?.title || 'Дорожная карта не найдена',
});
</script>

<style lang="scss" scoped>
.layout {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex: 1;

    overflow: hidden;
    z-index: 1;
}

@media (max-width: 1220px) {
    .layout {
        flex-direction: column;
        height: 100vh;
    }
}
</style>
