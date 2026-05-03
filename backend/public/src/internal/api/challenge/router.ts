import { Router, Response, Request } from 'express';
import { challengesService } from '@/internal/domain/challenge/service';
import { ChallengeFiltersDto } from './dto';

export const challengesRouter = Router();

challengesRouter.post('/', async (req: RequestWithBody<ChallengeFiltersDto>, res: Response) => {
    try {
        const userId = req.headers['x-user-id'] as string;
        const challenges = await challengesService.getChallenges(req.body, userId);
        res.status(200).json(challenges);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : error,
        });
    }
});

challengesRouter.get('/topics', async (_req: Request, res: Response) => {
    try {
        const topics = await challengesService.getAllTopics();
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : error,
        });
    }
});

challengesRouter.get('/stats', async (req: Request, res: Response) => {
    try {
        const userId = req.headers['x-user-id'] as string;
        const stats = await challengesService.getStats(userId);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : error,
        });
    }
});
