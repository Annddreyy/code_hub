import camelcaseKeys from 'camelcase-keys';
import { pool } from '@/internal/infrastructure/db';
import { Roadmap } from './roadmap';
import {
    GET_ALL_TAGS,
    GET_NODE_BY_ID,
    GET_NODE_LESSONS,
    GET_NODE_STATS,
    GET_ROADMAP_BY_SLUG,
    GET_ROADMAP_CONNECTIONS,
    GET_ROADMAP_NODES,
    GET_ROADMAPS_BY_USER,
} from './dbQueries';

export const roadmapsRepository = {
    async getRoadmaps(userId: number, title: string, tag: string | null): Promise<Roadmap[]> {
        const result = await pool.query<Roadmap & { status: string; currentNode: number }>(
            GET_ROADMAPS_BY_USER,
            [userId, `%${title}%`, tag],
        );
        const { rows } = camelcaseKeys(result, { deep: true });

        return rows.map((row) => {
            let status = 'new';

            if (!row.isPublished) {
                status = 'locked';
            } else if (row.status === 'in_progress') {
                status = 'active';
            } else if (row.status === 'completed') {
                status = 'completed';
            }

            return {
                ...row,
                status,
            };
        });
    },

    async getRoadmapBySlug(slug: string) {
        const result = await pool.query(GET_ROADMAP_BY_SLUG, [slug]);
        const { rows } = camelcaseKeys(result, { deep: true });

        if (rows.length === 0) {
            return null;
        }

        const roadmap = rows[0];

        const nodesResult = await pool.query(GET_ROADMAP_NODES, [roadmap.id]);
        const nodes = camelcaseKeys(nodesResult.rows, { deep: true });

        const connectionsResult = await pool.query(GET_ROADMAP_CONNECTIONS, [roadmap.id]);
        const connections = camelcaseKeys(connectionsResult.rows, { deep: true });

        const currentUserNodeId = roadmap.currentNode;
        const userStatus = roadmap.status;

        const nodesWithStatus = nodes.map((node: any, index: number) => {
            let nodeStatus = 'locked';

            if (!userStatus) {
                nodeStatus = 'locked';
            } else if (userStatus === 'completed') {
                nodeStatus = 'completed';
            } else if (currentUserNodeId && node.roadmapNodeId === currentUserNodeId) {
                nodeStatus = 'active';
            } else if (currentUserNodeId) {
                const currentNodeIndex = nodes.findIndex(
                    (n: any) => n.roadmapNodeId === currentUserNodeId,
                );
                if (index < currentNodeIndex) {
                    nodeStatus = 'done';
                }
            }

            return {
                id: String(node.roadmapNodeId),
                title: node.title,
                description: node.description,
                status: nodeStatus,
                top: Number(node.positionY),
                left: Number(node.positionX),
                icon: getIconForTitle(node.title),
                xpCount: 100,
                tag: node.tag || 'default',
            };
        });

        const connectionsWithStatus = connections.map((conn: any) => {
            const toNode = nodesWithStatus.find((n: any) => n.id === String(conn.toNodeId));

            return {
                fromNodeId: String(conn.fromNodeId),
                toNodeId: String(conn.toNodeId),
                fromAnchor: 'bottom',
                toAnchor: 'top',
                markerType: toNode?.status || 'locked',
                strokeColor: getStrokeColor(toNode?.status),
            };
        });

        return {
            config: {
                width: 1200,
                height: 1800,
                backgroundColor: '#f5f5f5',
                nodeSize: {
                    width: 200,
                    height: 80,
                },
            },
            nodes: nodesWithStatus,
            connections: connectionsWithStatus,
        };
    },

    async getNodeById(nodeId: number) {
        const nodeResult = await pool.query(GET_NODE_BY_ID, [nodeId]);
        const { rows: nodeRows } = camelcaseKeys(nodeResult, { deep: true });

        if (nodeRows.length === 0) {
            return null;
        }

        const node = nodeRows[0];

        const lessonsResult = await pool.query(GET_NODE_LESSONS, [nodeId]);
        const lessons = camelcaseKeys(lessonsResult.rows, { deep: true });

        const statsResult = await pool.query(GET_NODE_STATS, [nodeId]);
        const stats = camelcaseKeys(statsResult.rows[0], { deep: true });

        let nodeStatus = 'locked';
        if (node.userStatus === 'in_progress') {
            nodeStatus = 'active';
        } else if (node.userStatus === 'completed') {
            nodeStatus = 'completed';
        } else if (node.userStatus === 'done') {
            nodeStatus = 'done';
        }

        const totalLessons = parseInt(stats.totalLessons);
        const completedLessons = parseInt(stats.completedLessons);
        const remainingLessons = totalLessons - completedLessons;
        const totalXpEarned = parseInt(stats.totalXpEarned);
        const remainingMinutes = parseInt(stats.remainingMinutes);

        const formattedStats = [
            {
                value: completedLessons,
                valueColor: 'blue',
                label: 'Уроков пройдено',
            },
            {
                value: remainingLessons,
                valueColor: 'gray',
                label: 'Уроков осталось',
            },
            {
                value: totalXpEarned,
                valueColor: 'orange',
                label: 'XP заработано',
            },
            {
                value: Math.ceil(remainingMinutes / 60),
                valueColor: 'yellow',
                label: 'ч. осталось',
            },
        ];

        const formattedLessons = lessons.map((lesson: any) => ({
            title: lesson.title,
            status: lesson.status,
            xpReward: lesson.xpReward,
        }));

        return {
            node: {
                id: String(node.roadmapNodeId),
                title: node.title,
                description: node.description,
                status: nodeStatus,
                left: Number(node.positionX),
                top: Number(node.positionY),
                icon: getIconForTitle(node.title),
                xpCount: node.xpCount || 100,
                tag: node.tag || 'default',
            },
            stats: formattedStats,
            lessons: formattedLessons,
        };
    },

    async getAllTags() {
        const result = await pool.query(GET_ALL_TAGS);
        const { rows } = camelcaseKeys(result, { deep: true });

        return rows.map((row) => ({
            id: row.roadmapTagId,
            title: row.title,
        }));
    },
};

function getIconForTitle(title: string): string {
    const iconMap: Record<string, string> = {
        HTML: '📄',
        CSS: '🎨',
        JavaScript: '📜',
        TypeScript: '📘',
        React: '⚛️',
        Vue: '💚',
        Angular: '🅰️',
        'Node.js': '🟢',
        Python: '🐍',
        Docker: '🐳',
        Git: '📦',
        'Введение в Backend': '🚀',
        'Основы Frontend': '🎯',
        'Основы Python': '🐍',
        'Next.js основы': '▲',
    };

    for (const [key, icon] of Object.entries(iconMap)) {
        if (title.includes(key)) {
            return icon;
        }
    }
    return '📚';
}

function getStrokeColor(status: string): string {
    switch (status) {
        case 'done':
            return 'rgba(63,185,80,.45)';
        case 'active':
            return 'rgba(79,156,255,.5)';
        case 'completed':
            return 'rgba(63,185,80,.6)';
        default:
            return 'rgba(150,150,150,.3)';
    }
}
