export interface Lesson {
    id: string;
    title: string;
    slug: string;
    description: string;
    status: Status;
    tags: string[];
    difficulty: Difficulty;
    durationInMinutes: number;
    xpReward: number;
    mdContent: string;
    tasks: Task[];
}

export interface Task {
    id: string;
    variants: TaskVariant[];
}

export type TaskVariant = {
    id: string;
    title: string;
    isAnswer?: boolean;
};
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Status = 'completed' | 'active' | 'not-passed';
