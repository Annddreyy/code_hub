import { Expose, Type } from 'class-transformer';
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
    ValidateNested,
} from 'class-validator';

export type LessonStatus = 'completed' | 'active' | 'not-passed';
export type LessonDifficulty = 'easy' | 'medium' | 'hard';

export class Lesson {
    @Expose()
    @IsNotEmpty({ message: 'ID не может быть пустым' })
    @IsString({ message: 'ID должен быть строкой' })
    id: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Title не может быть пустым' })
    @IsString({ message: 'Title должен быть строкой' })
    title: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Slug не может быть пустым' })
    @IsString({ message: 'Slug должен быть строкой' })
    slug: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Description не может быть пустым' })
    @IsString({ message: 'Description должен быть строкой' })
    description: string = '';

    @Expose()
    @IsOptional()
    status: LessonStatus = 'not-passed';

    @Expose()
    @IsArray({ message: 'Tags должен быть массивом' })
    @IsString({ each: true, message: 'Каждый тег должен быть строкой' })
    tags: string[] = [];

    @Expose()
    @IsNotEmpty({ message: 'Difficulty не может быть пустым' })
    @IsEnum(['easy', 'medium', 'hard'], { message: 'Difficulty должен быть easy, medium или hard' })
    difficulty: LessonDifficulty = 'easy';

    @Expose()
    @IsNotEmpty({ message: 'DurationInMinutes не может быть пустым' })
    @IsNumber({}, { message: 'DurationInMinutes должен быть числом' })
    @Min(0, { message: 'DurationInMinutes не может быть меньше 0' })
    durationInMinutes: number = 0;

    @Expose()
    @IsNotEmpty({ message: 'XpReward не может быть пустым' })
    @IsNumber({}, { message: 'XpReward должен быть числом' })
    @Min(0, { message: 'XpReward не может быть меньше 0' })
    xpReward: number = 0;

    @Expose()
    @IsNotEmpty({ message: 'MdContent не может быть пустым' })
    @IsString({ message: 'MdContent должен быть строкой' })
    mdContent: string = '';

    @Expose()
    @ValidateNested({ each: true })
    @Type(() => Task)
    @IsArray({ message: 'Tasks должен быть массивом' })
    tasks: Task[] = [];
}

export class Task {
    @Expose()
    @IsNotEmpty({ message: 'ID не может быть пустым' })
    @IsString({ message: 'ID должен быть строкой' })
    id: string = '';

    @Expose()
    @ValidateNested({ each: true })
    @Type(() => TaskVariant)
    @IsArray({ message: 'Variants должен быть массивом' })
    variants: TaskVariant[] = [];
}

export class TaskVariant {
    @Expose()
    @IsNotEmpty({ message: 'ID не может быть пустым' })
    @IsString({ message: 'ID должен быть строкой' })
    id: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Title не может быть пустым' })
    @IsString({ message: 'Title должен быть строкой' })
    title: string = '';

    @Expose()
    @IsOptional()
    isAnswer?: boolean;
}
