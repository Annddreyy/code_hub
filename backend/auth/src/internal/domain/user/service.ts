import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { emailAdapter } from '@/internal/infrastructure/email';
import { ConfirmEmailDto, LoginDto, RegisterDto, ResetPasswordDto } from '@/internal/api/auth/dto';
import { jwtService, JwtPayload } from '@/pkg/jwt';
import { logger } from '@/pkg/logger';
import { User, UserRole } from './user';
import { userRepository } from './repository';

const CONFIRMATION_EXPIRY = { hours: 1, minutes: 30 };
const RESET_EXPIRY = { hours: 1 };
const SALT_ROUNDS = 10;

export const userService = {
    async register(dto: RegisterDto) {
        let user: User | null;

        user = await userRepository.findByEmail(dto.email);
        if (user) {
            return null;
        }

        const passwordSalt = await bcrypt.genSalt(SALT_ROUNDS);
        const passwordHash = await this._generateHash(dto.password, passwordSalt);

        const confirmationCode = uuidv4();
        const expirationDate = add(new Date(), CONFIRMATION_EXPIRY).getTime();

        const userId = await userRepository.createUser({
            name: dto.name,
            email: dto.email,
            role: UserRole.USER,
            createdAt: Date.now(),
            jwtData: { passwordHash, passwordSalt },
            emailConfirmation: {
                confirmationCode,
                expirationDate,
                isConfirmed: false,
            },
        });

        try {
            const info = await emailAdapter.sendEmailConfirmationMessage({
                to: dto.email,
                code: confirmationCode,
            });
            if (!(info.accepted as string[])?.length) {
                logger.error(`Не удалось отправить письмо на: ${dto.email}`);
            } else {
                logger.info(`Письмо с подтверждением отправлено на: ${dto.email}`);
            }
        } catch (err) {
            logger.error('Ошибка при отправке письма подтверждения:', err);
        }

        return userId; 
    },

    async confirmEmail(dto: ConfirmEmailDto) {
        const user = await userRepository.findByEmail(dto.email);
        
        if (!user) {
            return false;
        }

        if (user.emailConfirmation.isConfirmed) {
            return false;
        }

        const { confirmationCode, expirationDate } = user.emailConfirmation;
        if (confirmationCode !== dto.code) {
            return false;
        }
        if (expirationDate < Date.now()) {
            return false;
        }

        return userRepository.updateConfirmation(user.id);
    },

    async login(dto: LoginDto) {
        const user = await this._checkCredentials(dto);

        if (!user) {
            return null;
        }

        if (!user.emailConfirmation.isConfirmed) {
            return null;
        }

        const payload: JwtPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };

        return await this._createTokens(user, payload);
    },

    async refresh(oldRefreshToken: string) {
        const payload = jwtService.verifyRefreshToken(oldRefreshToken);
        if (!payload) {
            return null;
        }

        const user = await userRepository.findById(payload.userId);
        if (!user || user.refreshToken !== oldRefreshToken) {
            return null;
        }

        const newPayload: JwtPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };

        return await this._createTokens(user, newPayload);
    },

    async logout(userId: string) {
        await userRepository.clearRefreshToken(userId);
    },

    async requestPasswordReset(email: string) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            return false;
        }

        const code = uuidv4();
        const expirationDate = add(new Date(), RESET_EXPIRY).getTime();

        await userRepository.savePasswordResetCode(user.id, code, expirationDate);

        try {
            await emailAdapter.sendPasswordResetMessage({ to: email, code });
            logger.info(`Письмо для сброса пароля отправлено на: ${email}`);
        } catch (err) {
            logger.error('Ошибка при отправке письма сброса пароля:', err);
        }

        return true;
    },

    async resetPassword(dto: ResetPasswordDto) {
        const user = await userRepository.findByEmail(dto.email);
        if (!user) {
            return false;
        }

        const { confirmationCode, expirationDate } = user.emailConfirmation;
        if (confirmationCode !== dto.code) {
            return false;
        }

        if (expirationDate < Date.now()) {
            return false;
        }

        const passwordSalt = await bcrypt.genSalt(SALT_ROUNDS);
        const passwordHash = await this._generateHash(dto.newPassword, passwordSalt);

        return userRepository.updatePasswordHash(user.id, passwordHash, passwordSalt);
    },

    async findById(id: string) {
        return userRepository.findById(id);
    },

    async _createTokens(user: User, payload: JwtPayload) {
        const accessToken = jwtService.signAccessToken(payload);
        const refreshToken = jwtService.signRefreshToken(payload);

        await userRepository.saveRefreshToken(user.id, refreshToken);
        return { accessToken, refreshToken };
    },

    async _checkCredentials(dto: LoginDto) {
        const user = await userRepository.findByEmail(dto.email);
        if (!user) {
            return null;
        }

        const hash = await this._generateHash(dto.password, user.jwtData.passwordSalt);
        return user.jwtData.passwordHash === hash ? user : null;
    },

    async _generateHash(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    },
};
