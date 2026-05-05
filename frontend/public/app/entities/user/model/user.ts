export interface User {
    id: string;
    name: string;
    avatarUrl?: string;
    position: Position;
    xp: number;
    challengesSolved: number;
    streak: number;
}

type Position = {
    currentPositon: number;
    prevPosition: number;
};

export type LeaderboardPeriod = 'week' | 'month' | 'all';
