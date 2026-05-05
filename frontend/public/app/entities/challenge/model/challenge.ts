export interface Challenge {
    id: string;
    title: string;
    topics: string[];
    difficulty: Difficulty;
    status?: Status;
    themes: string[];
    accept?: number;
    xpReward: number;
    userMeta?: {
        solvedAt?: Date;
    };
}

export type Status = 'todo' | 'in-progress' | 'done';
export type Difficulty = 'easy' | 'medium' | 'hard';
