import { Expose } from "class-transformer";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class Roadmap {
    @Expose()
    @IsNotEmpty({ message: 'ID не может быть пустым' })
    @IsString({ message: 'ID должен быть строкой' })
    id: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Slug не может быть пустым' })
    @IsString({ message: 'Slug должен быть строкой' })
    @Length(1, 100, { message: 'Slug должен быть от 1 до 100 символов' })
    slug: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Title не может быть пустым' })
    @IsString({ message: 'Title должен быть строкой' })
    @Length(1, 100, { message: 'Title должен быть от 1 до 100 символов' })
    title: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Icon не может быть пустым' })
    @IsString({ message: 'Icon должен быть строкой' })
    icon: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Description не может быть пустым' })
    @IsString({ message: 'Description должна быть строкой' })
    @Length(1, 500, { message: 'Description должна быть от 1 до 500 символов' })
    description: string = '';

    @Expose()
    @IsNotEmpty({ message: 'CreatedAt не может быть пустым' })
    @IsDateString({}, { message: 'CreatedAt должно быть строковой датой' })
    createdAt: string = '';

    @Expose()
    @IsNotEmpty({ message: 'XP не может быть пустым' })
    @IsNumber({}, { message: 'XP должен быть числом' })
    xp: number = 0;

    @Expose()
    @IsBoolean({ message: 'IsPublished должен быть логическим значением' })
    isPublished: boolean = true;
}