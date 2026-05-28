import { Router, Request, Response } from 'express';
import { roadmapsService } from '@/internal/domain/roadmaps';
import { GetRoadmapsDto } from './dto';

export const roadmapsRouter = Router();

roadmapsRouter.get('/', async (req: RequestWithQuery<GetRoadmapsDto>, res: Response) => {
    try {
        const userId = req.headers['x-user-id'] as string;
        const title = req.query.title ?? '';
        const tag = req.query.tag ?? null;
        const roadmaps = await roadmapsService.getRoadmaps(+userId, title, tag);
        res.status(200).json(roadmaps);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Ошибка при загрузке дорожных карт',
        });
    }
});

roadmapsRouter.get('/tags', async (_req: Request, res: Response) => {
    try {
        const tags = await roadmapsService.getAllTags();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Ошибка при загрузке тегов',
        });
    }
});

roadmapsRouter.get('/:slug', async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;

        const roadmap = await roadmapsService.getRoadmapBySlug(slug);

        if (!roadmap) {
            res.status(404).json({
                message: 'Дорожная карта не найдена',
            });
            return;
        }

        res.status(200).json(roadmap);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Ошибка при загрузке дорожной карты',
        });
    }
});

roadmapsRouter.get('/node/:nodeId', async (req: Request, res: Response) => {
    try {
        const { nodeId } = req.params;
        const node = await roadmapsService.getNodeById(+nodeId);

        if (!node) {
            res.status(404).json({
                message: 'Узел не найден',
            });
            return;
        }

        res.status(200).json(node);
    } catch (error) {
        res.status(500).json({
            message:
                error instanceof Error ? error.message : 'Ошибка при загрузке информации об узле',
        });
    }
});
