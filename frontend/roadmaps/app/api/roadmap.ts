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

export const ROADMAP_DATA: RoadmapData = {
    title: 'Frontend Developer',
    subtitle: 'Vue + Nuxt',
    totalNodes: 25,
    userMeta: {
        completedNodes: 12,
    },
};

const ROADMAPS_DATA: {
    config: RoadmapConfig;
    nodes: RoadmapNode[];
    connections: RoadmapConnection[];
} = {
    config: {
        width: 1200,
        height: 1800,
        backgroundColor: '#f5f5f5',
        nodeSize: {
            width: 200,
            height: 80,
        },
    },
    nodes: [
        {
            id: 'html',
            title: 'HTML',
            description: 'Структура веб-страниц',
            status: NodeStatus.DONE,
            top: 130,
            left: 380,
            icon: '📄',
            xpCount: 100,
            tag: 'Frontend',
        },
        {
            id: 'css',
            title: 'CSS',
            description: 'Стилизация и анимация',
            status: NodeStatus.DONE,
            top: 295,
            left: 380,
            icon: '🎨',
            xpCount: 100,
            tag: 'Frontend',
        },
        {
            id: 'js',
            title: 'JavaScript',
            description: 'Язык программирования',
            status: NodeStatus.ACTIVE,
            top: 460,
            left: 380,
            icon: '📜',
            xpCount: 150,
            tag: 'Frontend',
        },
        {
            id: 'typescript',
            title: 'TypeScript',
            description: 'Типизированный JS',
            status: NodeStatus.LOCKED,
            top: 540,
            left: 230,
            icon: '📘',
            xpCount: 120,
            tag: 'Language',
        },
        {
            id: 'react',
            title: 'React',
            description: 'Библиотека для UI',
            status: NodeStatus.LOCKED,
            top: 670,
            left: 380,
            icon: '⚛️',
            xpCount: 200,
            tag: 'Framework',
        },
        {
            id: 'react-router',
            title: 'React Router',
            description: 'Маршрутизация',
            status: NodeStatus.LOCKED,
            top: 1020,
            left: 200,
            icon: '🗺️',
            xpCount: 100,
            tag: 'Routing',
        },
        {
            id: 'state-mgmt',
            title: 'State Management',
            description: 'Управление состоянием',
            status: NodeStatus.LOCKED,
            top: 1020,
            left: 560,
            icon: '⚙️',
            xpCount: 120,
            tag: 'State',
        },
    ],
    connections: [
        {
            fromNodeId: 'html',
            toNodeId: 'css',
            fromAnchor: 'bottom',
            toAnchor: 'top',
            markerType: NodeStatus.DONE,
            strokeColor: 'rgba(63,185,80,.45)',
        },

        {
            fromNodeId: 'css',
            toNodeId: 'js',
            fromAnchor: 'bottom',
            toAnchor: 'top',
            markerType: NodeStatus.DONE,
            strokeColor: 'rgba(63,185,80,.45)',
        },

        {
            fromNodeId: 'js',
            toNodeId: 'typescript',
            fromAnchor: 'bottom',
            toAnchor: 'top',
            markerType: NodeStatus.DONE,
            strokeColor: 'rgba(63,185,80,.35)',
            curve: {
                type: 'bezier',
                controlPoint1: { x: 380, y: 500 },
                controlPoint2: { x: 230, y: 500 },
            },
        },

        {
            fromNodeId: 'typescript',
            toNodeId: 'react',
            fromAnchor: 'bottom',
            toAnchor: 'top',
            markerType: NodeStatus.ACTIVE,
            strokeColor: 'rgba(79,156,255,.5)',
            curve: {
                type: 'bezier',
                controlPoint1: { x: 230, y: 580 },
                controlPoint2: { x: 380, y: 580 },
            },
        },

        {
            fromNodeId: 'react',
            toNodeId: 'react-router',
            fromAnchor: 'bottom',
            toAnchor: 'top',
            markerType: NodeStatus.ACTIVE,
            strokeColor: 'rgba(79,156,255,.6)',
            curve: {
                type: 'bezier',
                controlPoint1: { x: 380, y: 750 },
                controlPoint2: { x: 200, y: 900 },
            },
        },

        {
            fromNodeId: 'react',
            toNodeId: 'state-mgmt',
            fromAnchor: 'bottom',
            toAnchor: 'top',
            markerType: NodeStatus.ACTIVE,
            strokeColor: 'rgba(79,156,255,.6)',
            curve: {
                type: 'bezier',
                controlPoint1: { x: 380, y: 750 },
                controlPoint2: { x: 560, y: 900 },
            },
        },
    ],
};

export const NODE: {
    node: RoadmapNode;
    stats: Stat[];
    lessons: NodeLesson[];
} = {
    node: {
        id: '1',
        title: 'Введение в программирование',
        description: 'Изучите основы программирования: переменные, циклы, условия и функции',
        status: NodeStatus.ACTIVE,
        left: 100,
        top: 200,
        icon: '🎓',
        xpCount: 150,
        tag: 'Основы',
    },
    stats: [
        {
            value: 4,
            valueColor: 'blue',
            label: 'Уроков пройдено',
        },
        {
            value: 9,
            valueColor: 'gray',
            label: 'Уроков осталось',
        },
        {
            value: 680,
            valueColor: 'orange',
            label: 'XP заработано',
        },
        {
            value: 3,
            valueColor: 'yellow',
            label: 'ч. осталось',
        },
    ],
    lessons: [
        {
            title: 'JSX & Components',
            status: NodeStatus.DONE,
            xpReward: 50,
        },
        {
            title: 'Props & State',
            status: NodeStatus.DONE,
            xpReward: 60,
        },
        {
            title: 'useEffect & Lifecycle',
            status: NodeStatus.DONE,
            xpReward: 70,
        },
        {
            title: 'Custom Hooks',
            status: NodeStatus.ACTIVE,
        },
        {
            title: 'Context API',
            status: NodeStatus.LOCKED,
        },
        {
            title: 'Performance & Memo',
            status: NodeStatus.LOCKED,
        },
    ],
};

export const roadmapsApi = {
    getRoadmap: async () => {
        return Promise.resolve(ROADMAP_DATA);
    },

    getNodes: async () => {
        return Promise.resolve(ROADMAPS_DATA);
    },

    getSelectedNode: async () => {
        return Promise.resolve(NODE);
    },
};
