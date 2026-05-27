import { settingsService } from '@/internal/domain/settings';
import { Router, Response, Request } from 'express';

export const settingsRouter = Router();

settingsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const userId = +(req.headers['x-user-id'] as string);
        const settings = await settingsService.getSettings(userId);
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : error,
        });
    }
});

settingsRouter.patch('/', async (req: Request, res: Response) => {
    try {
        const userId = +(req.headers['x-user-id'] as string);
        const settings = await settingsService.updateSettings(userId, req.body);
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : error,
        });
    }
});
