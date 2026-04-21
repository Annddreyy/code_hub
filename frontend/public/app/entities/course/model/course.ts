import type { Module } from '@/entities/module';

export interface Course {
    id: string;
    title: string;
    description: string;
    status: Status;
    category: string;
    subCategory?: string;
    tags: string[];
    icon: string;
    difficulty: Difficulty;
    xpReward: number;
    modules: Module[];
    estimatedHours: number;
    userMeta: {
        startCourse: boolean;
        currentLesson?: number;
        currentModule?: number;
    };
}

export type Status = 'popular' | 'new' | 'hot' | null;
export type Difficulty = 'beginner' | 'intermediate' | 'hard';
