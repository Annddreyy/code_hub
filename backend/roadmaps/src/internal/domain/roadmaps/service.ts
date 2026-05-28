import { roadmapsRepository } from './repository';

export const roadmapsService = {
    async getRoadmaps(userId: number, title: string, tag: string | null) {
        return await roadmapsRepository.getRoadmaps(userId, title, tag);
    },

    async getRoadmapBySlug(slug: string) {
        return await roadmapsRepository.getRoadmapBySlug(slug);
    },

    async getNodeById(nodeId: number) {
        return await roadmapsRepository.getNodeById(nodeId);
    },

    async getAllTags() {
        return await roadmapsRepository.getAllTags();
    },
};
