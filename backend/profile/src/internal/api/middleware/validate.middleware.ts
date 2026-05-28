import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const validateBody =
    (DtoClass: new () => any) => async (req: Request, res: Response, next: NextFunction) => {
        const instance = plainToInstance(DtoClass, req.body, {
            excludeExtraneousValues: true,
        });

        const errors = await validate(instance, {
            whitelist: true,
            forbidNonWhitelisted: true,
        });

        if (errors.length) {
            const messages = errors.map((error) => ({
                field: error.property,
                messages: Object.values(error.constraints ?? {}),
            }));
            res.status(400).json({ errors: messages });
            return;
        }

        req.body = instance;
        next();
    };
