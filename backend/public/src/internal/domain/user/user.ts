import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length, IsNumber, Min, Max } from 'class-validator';

export class User {
    @Expose()
    @IsNotEmpty({ message: 'Position не может быть пустой' })
    @IsNumber({}, { message: 'Position должна быть числом' })
    @Min(1, { message: 'Position не может быть меньше 1' })
    @Max(1000000000, { message: 'Position не может быть больше 1000000000' })
    position: number = 0;

    @Expose()
    @IsNotEmpty({ message: 'Name не может быть пустым' })
    @IsString({ message: 'Name должен быть строкой' })
    @Length(1, 100, { message: 'Name должен быть от 1 до 100 символов' })
    name: string = '';

    @Expose()
    @IsNotEmpty({ message: 'XP не может быть пустой' })
    @IsNumber({}, { message: 'XP должна быть числом' })
    @Min(1, { message: 'XP не может быть меньше 1' })
    @Max(1000000000, { message: 'XP не может быть больше 1000000000' })
    xp: number = 0;

    @Expose()
    @IsNotEmpty({ message: 'Solved не может быть пустой' })
    @IsNumber({}, { message: 'Solved должна быть числом' })
    @Min(1, { message: 'Solved не может быть меньше 1' })
    @Max(1000000000, { message: 'Solved не может быть больше 1000000000' })
    solved: number = 0;

    @Expose()
    @IsNotEmpty({ message: 'Streak не может быть пустой' })
    @IsNumber({}, { message: 'Streak должна быть числом' })
    @Min(1, { message: 'Streak не может быть меньше 1' })
    @Max(1000000000, { message: 'Streak не может быть больше 1000000000' })
    streak: number = 0;
}
