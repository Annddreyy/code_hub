export interface Challenge {
    id: string;
    title: string;
    topic: string;
    difficulty: Difficulty;
    status: Status;
    tags: string[];
    accept: number;
    xpReward: number;
    userMeta: {
        solvedAt?: Date;
    };
}

export type Status = 'todo' | 'in-progress' | 'done';
export type Difficulty = 'easy' | 'medium' | 'hard';
