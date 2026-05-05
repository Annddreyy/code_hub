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

export enum RoadmapStatus {
    ACTIVE = 'active',
    COMPLETED = 'completed',
    NEW = 'new',
    LOCKED = 'locked',
}

export interface Roadmap {
    id: string;
    title: string;
    description: string;
    icon: string;
    tags: string[];
    status: RoadmapStatus;
    xp: number;
    currentNode: number;
    totalNodes: number;
}

const ROADMAP_DATA: RoadmapData = {
    title: 'Frontend Developer',
    subtitle: 'Vue + Nuxt',
    totalNodes: 25,
    userMeta: {
        completedNodes: 12,
    },
};

const ROADMAPS: Roadmap[] = [
    {
        id: '1',
        title: 'JavaScript Fundamentals',
        description:
            'Изучи основы JavaScript: переменные, функции, циклы, массивы и объекты. Этот курс даст тебе прочную базу для изучения любых фреймворков.',
        icon: '🟨',
        tags: ['JavaScript', 'Basics', 'Programming'],
        status: RoadmapStatus.ACTIVE,
        xp: 500,
        currentNode: 7,
        totalNodes: 20,
    },
    {
        id: '2',
        title: 'React Mastery',
        description:
            'Освой React с нуля до профи: компоненты, хуки, состояние, контекст и маршрутизация. Научись создавать современные одностраничные приложения.',
        icon: '⚛️',
        tags: ['React', 'Frontend', 'Hooks'],
        status: RoadmapStatus.ACTIVE,
        xp: 750,
        currentNode: 12,
        totalNodes: 25,
    },
    {
        id: '3',
        title: 'TypeScript Deep Dive',
        description:
            'Погрузись в TypeScript: статическая типизация, интерфейсы, дженерики и утилитарные типы. Улучши качество своего кода и избегай ошибок.',
        icon: '📘',
        tags: ['TypeScript', 'Types', 'Advanced'],
        status: RoadmapStatus.NEW,
        xp: 600,
        currentNode: 0,
        totalNodes: 18,
    },
    {
        id: '4',
        title: 'Node.js Backend',
        description:
            'Создавай серверные приложения на Node.js: Express, маршрутизация, middleware, обработка запросов и работа с базами данных.',
        icon: '🟢',
        tags: ['Node.js', 'Backend', 'Express'],
        status: RoadmapStatus.ACTIVE,
        xp: 650,
        currentNode: 5,
        totalNodes: 22,
    },
    {
        id: '5',
        title: 'CSS & Tailwind',
        description:
            'Изучи современные подходы к стилизации: от основ CSS до утилитарного фреймворка Tailwind. Создавай красивые и адаптивные интерфейсы.',
        icon: '🎨',
        tags: ['CSS', 'Tailwind', 'Styling'],
        status: RoadmapStatus.COMPLETED,
        xp: 400,
        currentNode: 15,
        totalNodes: 15,
    },
    {
        id: '6',
        title: 'Git & GitHub',
        description:
            'Освой систему контроля версий Git: коммиты, ветки, слияния, разрешение конфликтов. Научись работать в команде через GitHub.',
        icon: '📦',
        tags: ['Git', 'Version Control', 'Collaboration'],
        status: RoadmapStatus.COMPLETED,
        xp: 300,
        currentNode: 12,
        totalNodes: 12,
    },
    {
        id: '7',
        title: 'Next.js Framework',
        description:
            'Изучи фреймворк Next.js для React: серверный рендеринг, генерация статических сайтов, API-роуты и оптимизация производительности.',
        icon: '▲',
        tags: ['Next.js', 'React', 'SSR'],
        status: RoadmapStatus.NEW,
        xp: 800,
        currentNode: 0,
        totalNodes: 30,
    },
    {
        id: '8',
        title: 'Python Data Science',
        description:
            'Погрузись в науку о данных с Python: библиотеки Pandas, NumPy, Matplotlib. Научись анализировать данные и строить визуализации.',
        icon: '🐍',
        tags: ['Python', 'Data Science', 'Pandas'],
        status: RoadmapStatus.LOCKED,
        xp: 900,
        currentNode: 0,
        totalNodes: 28,
    },
    {
        id: '9',
        title: 'Docker & Kubernetes',
        description:
            'Освой контейнеризацию с Docker и оркестрацию с Kubernetes. Узнай, как упаковывать и масштабировать приложения в продакшене.',
        icon: '🐳',
        tags: ['Docker', 'Kubernetes', 'DevOps'],
        status: RoadmapStatus.LOCKED,
        xp: 1000,
        currentNode: 0,
        totalNodes: 25,
    },
    {
        id: '10',
        title: 'SQL Databases',
        description:
            'Изучи реляционные базы данных: SQL, PostgreSQL, MySQL. Научись писать сложные запросы, работать с JOIN и оптимизировать производительность.',
        icon: '🗄️',
        tags: ['SQL', 'PostgreSQL', 'MySQL'],
        status: RoadmapStatus.ACTIVE,
        xp: 450,
        currentNode: 8,
        totalNodes: 16,
    },
    {
        id: '11',
        title: 'RESTful APIs',
        description:
            'Научись проектировать и создавать RESTful API: эндпоинты, методы HTTP, статус-коды, авторизация и документация Swagger.',
        icon: '🔌',
        tags: ['API', 'REST', 'HTTP'],
        status: RoadmapStatus.ACTIVE,
        xp: 550,
        currentNode: 6,
        totalNodes: 14,
    },
    {
        id: '12',
        title: 'GraphQL Basics',
        description:
            'Освой GraphQL — современный язык запросов для API. Изучи схемы, резолверы, мутации и подписки для гибкой работы с данными.',
        icon: '📡',
        tags: ['GraphQL', 'Apollo', 'Query'],
        status: RoadmapStatus.NEW,
        xp: 700,
        currentNode: 0,
        totalNodes: 20,
    },
    {
        id: '13',
        title: 'Web Security',
        description:
            'Изучи основы веб-безопасности: HTTPS, CORS, XSS, CSRF, SQL-инъекции. Научись защищать приложения от распространённых атак.',
        icon: '🔒',
        tags: ['Security', 'Auth', 'HTTPS'],
        status: RoadmapStatus.LOCKED,
        xp: 850,
        currentNode: 0,
        totalNodes: 20,
    },
    {
        id: '14',
        title: 'Testing with Jest',
        description:
            'Освой тестирование JavaScript-приложений с Jest: юнит-тесты, интеграционные тесты, моки, снапшоты и покрытие кода.',
        icon: '🧪',
        tags: ['Testing', 'Jest', 'Unit Tests'],
        status: RoadmapStatus.COMPLETED,
        xp: 350,
        currentNode: 10,
        totalNodes: 10,
    },
    {
        id: '15',
        title: 'Vue.js Essentials',
        description:
            'Изучи Vue.js: реактивность, компоненты, директивы, композиция API, роутинг и управление состоянием с Pinia.',
        icon: '💚',
        tags: ['Vue.js', 'Composition API', 'Frontend'],
        status: RoadmapStatus.ACTIVE,
        xp: 500,
        currentNode: 4,
        totalNodes: 18,
    },
    {
        id: '16',
        title: 'Angular Framework',
        description:
            'Освой мощный фреймворк Angular: компоненты, сервисы, dependency injection, RxJS, реактивные формы и модули.',
        icon: '🅰️',
        tags: ['Angular', 'RxJS', 'TypeScript'],
        status: RoadmapStatus.NEW,
        xp: 750,
        currentNode: 0,
        totalNodes: 24,
    },
    {
        id: '17',
        title: 'MongoDB & NoSQL',
        description:
            'Изучи документо-ориентированные базы данных на примере MongoDB: схемы, индексы, агрегации и масштабирование.',
        icon: '🍃',
        tags: ['MongoDB', 'NoSQL', 'Database'],
        status: RoadmapStatus.ACTIVE,
        xp: 480,
        currentNode: 5,
        totalNodes: 15,
    },
    {
        id: '18',
        title: 'AWS Cloud',
        description:
            'Погрузись в облачные технологии AWS: EC2, S3, Lambda, RDS, IAM. Научись деплоить и масштабировать приложения в облаке.',
        icon: '☁️',
        tags: ['AWS', 'Cloud', 'DevOps'],
        status: RoadmapStatus.LOCKED,
        xp: 1100,
        currentNode: 0,
        totalNodes: 35,
    },
    {
        id: '19',
        title: 'Web Performance',
        description:
            'Изучи методы оптимизации производительности веб-приложений: код-сплиттинг, ленивая загрузка, кэширование и Core Web Vitals.',
        icon: '⚡',
        tags: ['Performance', 'Optimization', 'Lighthouse'],
        status: RoadmapStatus.NEW,
        xp: 600,
        currentNode: 0,
        totalNodes: 16,
    },
    {
        id: '20',
        title: 'Mobile React Native',
        description:
            'Освой разработку кросс-платформенных мобильных приложений на React Native: навигация, анимации, нативные модули и публикация в магазины.',
        icon: '📱',
        tags: ['React Native', 'Mobile', 'Cross-platform'],
        status: RoadmapStatus.LOCKED,
        xp: 950,
        currentNode: 0,
        totalNodes: 26,
    },
];

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

const FILTERS = [
    '🚀 В процессе',
    '✅ Завершённые',
    '⚡ Новые',
    '🌐 Frontend',
    '⚙️ Backend',
    '🧮 Алгоритмы',
    '🗄️ Базы данных',
    '🔒 Безопасность',
];

const NODE: {
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

const STATS = {
    inProgressCount: 10,
    completedCount: 12,
    xpEarned: 1250,
    nodesCompleted: 12,
    roadmapsCount: 1,
};

export const roadmapsApi = {
    getRoadmaps: async () => {
        return Promise.resolve(ROADMAPS);
    },

    getFilters: async () => {
        return Promise.resolve(FILTERS);
    },

    getStats: async () => {
        return Promise.resolve(STATS);
    },

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
