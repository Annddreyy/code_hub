import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length, IsNumber, Min, Max, IsDate } from 'class-validator';

export class Activity {
    @Expose()
    @IsNotEmpty({ message: 'Title не может быть пустым' })
    @IsString({ message: 'Title должен быть строкой' })
    @Length(1, 200, { message: 'Title должен быть от 1 до 200 символов' })
    title: string = '';

    @Expose()
    @IsNotEmpty({ message: 'XP не может быть пустым' })
    @IsNumber({}, { message: 'XP должен быть числом' })
    @Min(1, { message: 'XP не может быть меньше 1' })
    @Max(1000000, { message: 'XP не может быть больше 1000000' })
    xp: number = 0;

    @Expose()
    @IsNotEmpty({ message: 'ActivityAt не может быть пустым' })
    @IsDate({ message: 'ActivityAt должен быть датой' })
    activityAt: Date = new Date();
}
