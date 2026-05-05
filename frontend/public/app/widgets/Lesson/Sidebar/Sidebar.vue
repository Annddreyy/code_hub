<template>
    <div>
        <Title
            :title="courseTitle"
            :completed-lessons="completedLessons"
            :total-lessons="totalLessons"
        />
        <ModuleList
            v-for="(module, index) in modules"
            :key="module.id"
            v-bind="{ ...module, id: String(index + 1) }"
        />
    </div>
</template>

<script setup lang="ts">
import type { Module } from '@/entities/module';
import { ModuleList } from '@/entities/module';
import Title from './Title.vue';

const { modules } = defineProps<{
    courseTitle: string;
    modules: Module[];
    completedLessons: number;
}>();

const totalLessons = computed(() => 10);
</script>
