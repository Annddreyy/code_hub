import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export type EmailConfirmation = {
    confirmationCode: string;
    expirationDate: number;
    isConfirmed: boolean;
};

export type JwtData = {
    passwordHash: string;
    passwordSalt: string;
};

export class User {
    @Expose()
    @IsUUID()
    id: string = '';

    @Expose()
    @IsString()
    @IsNotEmpty()
    name: string = '';

    @Expose()
    @IsEmail()
    email: string = '';

    @Expose()
    @IsEnum(UserRole)
    role: UserRole = UserRole.USER;

    @Expose()
    avatarUrl: string = '';

    @Expose()
    bio: string = '';

    @Expose()
    location: string = '';

    @Expose()
    createdAt: number = 0;

    @Expose()
    updatedAt: number = 0;

    emailConfirmation: EmailConfirmation = {
        confirmationCode: '',
        expirationDate: 0,
        isConfirmed: false,
    };

    jwtData: JwtData = {
        passwordHash: '',
        passwordSalt: '',
    };

    refreshToken?: string;
}
