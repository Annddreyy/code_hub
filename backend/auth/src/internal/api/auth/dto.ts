import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class RegisterDto {
    @Expose()
    @IsString({ message: 'Имя пользователя должно быть строкой' })
    @IsNotEmpty({ message: 'Имя пользователя не должно быть пустым' })
    @MinLength(1, { message: 'Имя пользователя должно содержать хотя бы одну букву' })
    name: string = '';

    @Expose()
    @IsEmail()
    @IsNotEmpty({ message: 'Email не должен быть пустым' })
    email: string = '';

    @Expose()
    @IsString({ message: 'Пароль должен быть строкой' })
    @Length(6, 64, { message: 'Длина пароля должны быть от 6 до 64 символов' })
    password: string = '';
}

export class LoginDto {
    @Expose()
    @IsEmail()
    @IsNotEmpty({ message: 'Email не должен быть пустым' })
    email: string = '';

    @Expose()
    @IsString()
    @IsNotEmpty({ message: 'Пароль не должен быть пустым' })
    password: string = '';
}

export class ConfirmEmailDto {
    @Expose()
    @IsEmail()
    @IsNotEmpty({ message: 'Email не должен быть пустым' })
    email: string = '';

    @Expose()
    @IsString()
    @IsNotEmpty({ message: 'Код не должен быть пустым' })
    code: string = '';
}

export class RequestPasswordResetDto {
    @Expose()
    @IsEmail()
    @IsNotEmpty({ message: 'Email не должен быть пустым' })
    email: string = '';
}

export class ResetPasswordDto {
    @Expose()
    @IsEmail()
    @IsNotEmpty({ message: 'Email не должен быть пустым' })
    email: string = '';

    @Expose()
    @IsString()
    @IsNotEmpty({ message: 'Код не должен быть пустым' })
    code: string = '';

    @Expose()
    @IsString({ message: 'Пароль должен быть строкой' })
    @Length(6, 64, { message: 'Длина пароля должны быть от 6 до 64 символов' })
    newPassword: string = '';
}
