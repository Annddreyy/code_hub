import { Expose, Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    Length,
    IsArray,
    ValidateNested,
    IsNumber,
    IsOptional,
    Min,
    Max,
    IsEnum,
    IsObject,
} from 'class-validator';
import { Module } from '../module';

export type Status = 'popular' | 'new' | 'hot' | null;
export type Difficulty = 'beginner' | 'intermediate' | 'hard';

export class CourseCategory {
    @Expose()
    @IsNotEmpty({ message: 'ID не может быть пустым' })
    @IsString({ message: 'ID должен быть строкой' })
    id: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Title не может быть пустым' })
    @IsString({ message: 'Title должен быть строкой' })
    @Length(1, 100, { message: 'Title должен быть от 1 до 100 символов' })
    title: string = '';
}

export class CourseLanguage {
    @Expose()
    @IsNotEmpty({ message: 'ID не может быть пустым' })
    @IsString({ message: 'ID должен быть строкой' })
    id: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Title не может быть пустым' })
    @IsString({ message: 'Title должен быть строкой' })
    @Length(1, 100, { message: 'Title должен быть от 1 до 100 символов' })
    title: string = '';
}

export class Course {
    @Expose()
    @IsNotEmpty({ message: 'ID не может быть пустым' })
    @IsString({ message: 'ID должен быть строкой' })
    id: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Title не может быть пустым' })
    @IsString({ message: 'Title должен быть строкой' })
    title: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Description не может быть пустым' })
    @IsString({ message: 'Description должен быть строкой' })
    description: string = '';

    @Expose()
    @IsOptional()
    status: Status = null;

    @Expose()
    @IsNotEmpty({ message: 'Category не может быть пустой' })
    @IsString({ message: 'Category должна быть строкой' })
    category: string = '';

    @Expose()
    @IsOptional()
    @IsString({ message: 'SubCategory должен быть строкой' })
    subCategory?: string;

    @Expose()
    @IsArray({ message: 'Tags должен быть массивом' })
    @IsString({ each: true, message: 'Каждый тег должен быть строкой' })
    tags: string[] = [];

    @Expose()
    @IsNotEmpty({ message: 'Icon не может быть пустым' })
    @IsString({ message: 'Icon должен быть строкой' })
    icon: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Difficulty не может быть пустым' })
    @IsEnum(['beginner', 'intermediate', 'hard'], {
        message: 'Difficulty должен быть beginner, intermediate или hard',
    })
    difficulty: Difficulty = 'beginner';

    @Expose()
    @IsNotEmpty({ message: 'XpReward не может быть пустым' })
    @IsNumber({}, { message: 'XpReward должен быть числом' })
    @Min(0, { message: 'XpReward не может быть меньше 0' })
    xpReward: number = 0;

    @Expose()
    @ValidateNested({ each: true })
    @Type(() => Module)
    @IsArray({ message: 'Modules должен быть массивом' })
    modules: Module[] = [];

    @Expose()
    @IsNotEmpty({ message: 'EstimatedHours не может быть пустым' })
    @IsNumber({}, { message: 'EstimatedHours должен быть числом' })
    @Min(0, { message: 'EstimatedHours не может быть меньше 0' })
    @Max(1000, { message: 'EstimatedHours не может быть больше 1000' })
    estimatedHours: number = 0;

    @Expose()
    @ValidateNested()
    @Type(() => UserMeta)
    @IsObject({ message: 'UserMeta должен быть объектом' })
    userMeta: UserMeta = new UserMeta();
}

export class UserMeta {
    @Expose()
    startCourse: boolean = false;

    @Expose()
    @IsOptional()
    @IsNumber({}, { message: 'CurrentLesson должен быть числом' })
    @Min(0, { message: 'CurrentLesson не может быть меньше 0' })
    currentLesson?: number;

    @Expose()
    @IsOptional()
    @IsNumber({}, { message: 'CurrentModule должен быть числом' })
    @Min(0, { message: 'CurrentModule не может быть меньше 0' })
    currentModule?: number;
}
