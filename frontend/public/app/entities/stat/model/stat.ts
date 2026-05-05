export interface Stat {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: 'yellow' | 'green' | 'blue' | 'purple';
    userMeta: {
        prevCount: number;
        currentCount: number;
    };
}
