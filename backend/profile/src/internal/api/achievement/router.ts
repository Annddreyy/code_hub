import { achievementService } from '@/internal/domain/achievement';
import { Router, Response, Request } from 'express';
export const achievementsRouter = Router();

achievementsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const userId = req.headers['x-user-id'] as string;
        const category = req.query.category as string;
        const achievements = await achievementService.getAchievements(userId, category);
        res.status(200).json(achievements);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : error,
        });
    }
});
