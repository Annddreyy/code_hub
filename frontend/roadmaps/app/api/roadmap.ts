import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:8080/api/roadmaps',
    withCredentials: true,
});

export type ApiError = {
    response: {
        data: {
            message?: string;
            errors?: {
                messages: string[];
            }[];
        };
    };
};

export enum NodeStatus {
    DONE = 'done',
    ACTIVE = 'active',
    LOCKED = 'locked',
}

export type NodePosition = {
    x: number;
    y: number;
};

export interface ConnectionPoint {
    fromNodeId: string;
    toNodeId: string;
    fromAnchor?: 'top' | 'right' | 'bottom' | 'left';
    toAnchor?: 'top' | 'right' | 'bottom' | 'left';
}

export type RoadmapConnection = {
    fromNodeId: string;
    toNodeId: string;
    fromAnchor?: 'top' | 'right' | 'bottom' | 'left';
    toAnchor?: 'top' | 'right' | 'bottom' | 'left';
    strokeColor?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
    markerType?: NodeStatus;
    curve?: {
        type: 'linear' | 'bezier';
        controlPoint1?: NodePosition;
        controlPoint2?: NodePosition;
    };
};

export type RoadmapConfig = {
    width: number;
    height: number;
    backgroundColor?: string;
    nodeSize?: {
        width: number;
        height: number;
    };
};

export type Tag = {
    id: string;
    title: string;
};

export interface RoadmapNode {
    id: string;
    title: string;
    description: string;
    status: NodeStatus;
    left: number;
    top: number;
    icon: string;
    xpCount: number;
    tag: string;
}

export interface Stat {
    value: number;
    valueColor: 'blue' | 'orange' | 'yellow' | 'gray';
    label: string;
}

export type RoadmapData = {
    title: string;
    subtitle: string;
    totalNodes: number;
    userMeta: {
        completedNodes?: number;
    };
};

export interface NodeLesson {
    title: string;
    status: NodeStatus;
    xpReward?: number;
}

export enum RoadmapStatus {
    ACTIVE = 'active',
    COMPLETED = 'completed',
    NEW = 'new',
    LOCKED = 'locked',
}

export interface Roadmap {
    id: string;
    slug: string;
    title: string;
    description: string;
    icon: string;
    tags: string[];
    status: RoadmapStatus;
    xp: number;
    completedLessons: number;
    totalLessons: number;
    remainingTimeMinutes: number;
}

const ROADMAP_DATA: RoadmapData = {
    title: 'Frontend Developer',
    subtitle: 'Vue + Nuxt',
    totalNodes: 25,
    userMeta: {
        completedNodes: 12,
    },
};

export const roadmapsApi = {
    getRoadmaps: async (title = '', tag: string | null = null, headers = {}) => {
        const params = new URLSearchParams();
        if (title) {
            params.append('title', title);
        }
        if (tag) {
            params.append('tag', tag);
        }

        const query = params.toString() ? `/?${params.toString()}` : '/';
        return (await instance.get<Roadmap[]>(query, { headers })).data;
    },

    getTags: async (headers = {}) => {
        return (await instance.get<Tag[]>('/tags', { headers })).data;
    },

    getRoadmap: async () => {
        return Promise.resolve(ROADMAP_DATA);
    },

    getNodes: async (slug: string, headers = {}) => {
        return (
            await instance.get<{
                config: RoadmapConfig;
                nodes: RoadmapNode[];
                connections: RoadmapConnection[];
            }>(`${slug}`, { headers })
        ).data;
    },

    getSelectedNode: async (nodeId: string, headers = {}) => {
        return (
            await instance.get<{
                node: RoadmapNode;
                stats: Stat[];
                lessons: NodeLesson[];
            }>(`/node/${nodeId}`, { headers })
        ).data;
    },
};
