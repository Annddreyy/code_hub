import { Router, Response } from 'express';
import { LeaderboardPodiumRequestDto, LeaderboardRequestDto } from './dto';
import { userService } from '@/internal/domain/user';

export const usersRouter = Router();

usersRouter.post('/', async (req: RequestWithBody<LeaderboardRequestDto>, res: Response) => {
    try {
        const users = await userService.getAllUsers(req.body.page, req.body.period);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : error,
        });
    }
});

usersRouter.post(
    '/podium',
    async (req: RequestWithBody<LeaderboardPodiumRequestDto>, res: Response) => {
        try {
            const users = await userService.getPodiumUsers(req.body.period);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({
                message: error instanceof Error ? error.message : error,
            });
        }
    },
);
