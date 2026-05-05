import { Expose, Type } from 'class-transformer';
import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
    Length,
    MaxLength,
    Min,
    ValidateNested,
} from 'class-validator';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export class EmailConfirmationValidator {
    @IsString({ message: 'Код подтверждения должен быть строкой' })
    confirmationCode: string = '';

    @IsNumber({}, { message: 'Дата истечения должна быть числом' })
    @Min(0, { message: 'Дата истечения не может быть отрицательной' })
    expirationDate: number = 0;

    @IsBoolean({ message: 'Статус подтверждения должен быть булевым значением' })
    isConfirmed: boolean = false;
}

export class JwtDataValidator {
    @IsString({ message: 'Хеш пароля должен быть строкой' })
    passwordHash: string = '';

    @IsString({ message: 'Соль пароля должна быть строкой' })
    passwordSalt: string = '';
}

export class User {
    @Expose()
    @IsNotEmpty({ message: 'ID не может быть пустым' })
    @IsUUID('all', { message: 'ID должен быть валидным UUID' })
    @IsString({ message: 'ID должен быть строкой' })
    id: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Имя не может быть пустым' })
    @IsString({ message: 'Имя должно быть строкой' })
    @Length(2, 50, { message: 'Имя должно быть от 2 до 50 символов' })
    name: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Email не может быть пустым' })
    @IsEmail({}, { message: 'Введите корректный email адрес' })
    @IsString({ message: 'Email должен быть строкой' })
    email: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Роль не может быть пустой' })
    @IsEnum(UserRole, { message: 'Роль должна быть одним из значений: user, admin, moderator' })
    role: UserRole = UserRole.USER;

    @Expose()
    @IsOptional()
    @IsUrl({}, { message: 'Avatar URL должен быть валидным URL' })
    @IsString({ message: 'Avatar URL должен быть строкой' })
    avatarUrl: string = '';

    @Expose()
    @IsOptional()
    @IsString({ message: 'Bio должен быть строкой' })
    @MaxLength(500, { message: 'Bio не может превышать 500 символов' })
    bio: string = '';

    @Expose()
    @IsOptional()
    @IsString({ message: 'Location должна быть строкой' })
    @MaxLength(100, { message: 'Location не может превышать 100 символов' })
    location: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Дата создания не может быть пустой' })
    @IsNumber({}, { message: 'Дата создания должна быть числом (timestamp)' })
    @Min(0, { message: 'Дата создания не может быть отрицательной' })
    createdAt: number = 0;

    @Expose()
    @IsNotEmpty({ message: 'Дата обновления не может быть пустой' })
    @IsNumber({}, { message: 'Дата обновления должна быть числом (timestamp)' })
    @Min(0, { message: 'Дата обновления не может быть отрицательной' })
    updatedAt: number = 0;

    @Expose()
    @IsNotEmpty({ message: 'Самый длинный стрик не может быть пустым' })
    @IsNumber({}, { message: 'Самый длинный стрик должен быть числом' })
    @Min(0, { message: 'Самый длинный стрик не может быть отрицательным' })
    longestStreak: number = 0;

    @Expose()
    @IsNotEmpty({ message: 'Общее количество XP не может быть пустым' })
    @IsNumber({}, { message: 'Общее количество XP должно быть числом' })
    @Min(0, { message: 'Общее количество XP не может быть отрицательным' })
    totalXpEarned: number = 0;

    @Expose()
    @IsOptional()
    @IsNumber({}, { message: 'XP за сегодня должен быть числом' })
    @Min(0, { message: 'XP за сегодня не может быть отрицательным' })
    todayXp?: number;

    @ValidateNested({ message: 'Неверная структура emailConfirmation' })
    @Type(() => EmailConfirmationValidator)
    emailConfirmation: EmailConfirmationValidator = new EmailConfirmationValidator();

    @ValidateNested({ message: 'Неверная структура jwtData' })
    @Type(() => JwtDataValidator)
    jwtData: JwtDataValidator = new JwtDataValidator();

    @IsOptional()
    @IsString({ message: 'Refresh token должен быть строкой' })
    refreshToken?: string;
}
