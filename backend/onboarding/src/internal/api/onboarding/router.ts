import { Router, Request, Response } from 'express';
import { onboardingService, OnboardingData } from '@/internal/domain/onboarding';
import { authMiddleware } from '@/internal/api/middleware/auth.middleware';
import { validateBody } from '@/internal/api/middleware/validate.middleware';

export const onboardingRouter = Router();

onboardingRouter.get('/goals', async (_req: Request, res: Response) => {
    try {
        const goals = await onboardingService.getAvailableGoals();
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Ошибка при загрузке целей',
        });
    }
});

onboardingRouter.get('/languages', async (_req: Request, res: Response) => {
    try {
        const languages = await onboardingService.getAvailableLanguages();
        res.status(200).json(languages);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Ошибка при загрузке языков',
        });
    }
});

onboardingRouter.get('/experience-levels', async (_req: Request, res: Response) => {
    try {
        const experienceLevels = await onboardingService.getAvailableExperienceLevels();
        res.status(200).json(experienceLevels);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Ошибка при загрузке уровней опыта',
        });
    }
});

onboardingRouter.post(
    '/submit',
    validateBody(OnboardingData),
    async (req: RequestWithBody<OnboardingData>, res: Response) => {
        try {
            const roadmaps = await onboardingService.submitOnboardingData(req.body);

            res.status(200).json({
                message: 'Данные онбординга успешно сохранены',
                roadmaps: roadmaps,
            });
        } catch (error) {
            const status = error instanceof Error && error.message.includes('выбрать') ? 400 : 500;
            res.status(status).json({
                message:
                    error instanceof Error
                        ? error.message
                        : 'Ошибка при сохранении данных онбординга',
            });
        }
    },
);
