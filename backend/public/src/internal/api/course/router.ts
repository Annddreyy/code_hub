import { Router, Response, Request } from 'express';
import { coursesService } from '@/internal/domain/course/service';
import { CoursesFiltersDto } from './dto';
import { coursesRepository } from '@/internal/domain/course/repository';

export const coursesRouter = Router();

coursesRouter.post('/', async (req: RequestWithBody<CoursesFiltersDto>, res: Response) => {
    try {
        const userId = req.headers['x-user-id'] as string;
        const courses = await coursesService.getCourses(req.body, userId);
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : error,
        });
    }
});

coursesRouter.get('/tags', async (_req: Request, res: Response) => {
    try {
        const tags = await coursesRepository.getAllTags();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Ошибка при загрузке курсов',
        });
    }
});

coursesRouter.get('/technologies', async (_req: Request, res: Response) => {
    try {
        const technologies = await coursesRepository.getAllTechnologies();
        res.status(200).json(technologies);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Ошибка при загрузке курсов',
        });
    }
});
