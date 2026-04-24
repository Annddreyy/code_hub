import { Router, Request, Response } from 'express';
import { userService } from '@/internal/domain/user';
import { authMiddleware } from '@/internal/api/middleware/auth.middleware';
import { validateBody } from '@/internal/api/middleware/validate.middleware';
import {
    RegisterDto,
    LoginDto,
    ConfirmEmailDto,
    RequestPasswordResetDto,
    ResetPasswordDto,
} from './dto';

export const authRouter = Router();

authRouter.post(
    '/register',
    validateBody(RegisterDto),
    async (req: RequestWithBody<RegisterDto>, res: Response) => {
        const dto = req.body;

        const userId = await userService.register(dto);

        if (!userId) {
            res.status(400).json({
                message: 'Пользователь с таким email уже существует',
            });
            return;
        }

        res.status(201).json({
            message: 'Регистрация прошла успешно. Проверьте свою почту.',
        });
    },
);

authRouter.post(
    '/confirm-email',
    validateBody(ConfirmEmailDto),
    async (req: RequestWithBody<ConfirmEmailDto>, res: Response) => {
        const ok = await userService.confirmEmail(req.body);

        if (!ok) {
            res.status(400).json({
                message: 'Неправильный или просроченный код подтверждения',
            });
            return;
        }

        res.status(200).json({ message: 'Email успешно подтвержден' });
    },
);

authRouter.get('/confirm-email', async (req: RequestWithQuery<ConfirmEmailDto>, res: Response) => {
    const email = req.query.email ?? '';
    const code = req.query.code ?? '';

    const ok = await userService.confirmEmail({ email, code });

    if (!ok) {
        res.status(400).json({
            message: 'Неправильная или просроченная ссылка подтверждентя',
        });
        return;
    }

    res.status(200).json({
        message: 'Email подтвержден. Вы можете авторизоваться.',
    });
});

authRouter.post(
    '/login',
    validateBody(LoginDto),
    async (req: RequestWithBody<LoginDto>, res: Response) => {
        const tokens = await userService.login(req.body);

        if (!tokens) {
            res.status(401).json({
                message: 'Email не подтвержден',
            });
            return;
        }

        res.status(200).json({ 
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });
    },
);

authRouter.post('/refresh', async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken || req.headers['x-refresh-token'];

    if (!refreshToken) {
        res.status(401).json({ message: 'Нет refresh токена' });
        return;
    }

    const tokens = await userService.refresh(refreshToken);

    if (!tokens) {
        res.status(401).json({
            message: 'Невалидный или просроченный refresh token',
        });
        return;
    }

    res.status(200).json({ 
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
    });
});

authRouter.post('/logout', authMiddleware, async (req: Request, _res: Response) => {
    await userService.logout(req.user!.userId);
});

authRouter.get('/me', authMiddleware, async (req: Request, res: Response) => {
    const user = await userService.findById(req.user!.userId);

    if (!user) {
        res.status(404).json({ message: 'Пользователь не найден' });
        return;
    }

    res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        isConfirmed: user.emailConfirmation.isConfirmed,
    });
});

authRouter.post(
    '/request-password-reset',
    validateBody(RequestPasswordResetDto),
    async (req: RequestWithBody<RequestPasswordResetDto>, res: Response) => {
        const { email } = req.body;
        await userService.requestPasswordReset(email);
        res.status(200).json({
            message: 'Если email зарегистрирован, то ссылка была отправлена на него.',
        });
    },
);

authRouter.post(
    '/reset-password',
    validateBody(ResetPasswordDto),
    async (req: RequestWithBody<ResetPasswordDto>, res: Response) => {
        const ok = await userService.resetPassword(req.body);

        if (!ok) {
            res.status(400).json({ message: 'Невалидный или просроченный код обновления' });
            return;
        }

        res.status(200).json({ message: 'Пароль успешно обновлен' });
    },
);