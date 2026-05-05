export interface Challenge {
    id: string;
    title: string;
    topics: string[];
    tags: string[];
    difficulty: Difficulty;
    xpReward: number;
    descriptionMD: string;
    tests: Test[];
}

type Difficulty = 'easy' | 'medium' | 'hard';

type Test = {
    id: string;
    inputData: string[];
    outputData: string[];
    order: number;
};
