import { Expose, Transform, Type } from 'class-transformer';
import {
    IsOptional,
    IsArray,
    IsString,
    IsBoolean,
    IsEnum,
    IsNumber,
    Min,
    Max,
    IsNotEmpty,
    ArrayUnique,
    ValidateNested,
} from 'class-validator';

export enum DifficultyLevel {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export enum SortByField {
    EASY = 'easy-hard',
    HARD = 'hard-easy',
    NEWEST = 'newest',
    OLDEST = 'oldest',
}

export enum DurationRange {
    SHORT = 'short',
    MEDIUM = 'medium',
    LONG = 'long',
    ALL = 'all',
}

export class CoursesFiltersDto {
    @Expose()
    @IsOptional()
    @IsArray({ message: 'categories должен быть массивом' })
    @IsString({ each: true, message: 'Каждый элемент categories должен быть строкой' })
    @Transform(({ value }) => {
        if (typeof value === 'string') return value.split(',').map((v) => v.trim());
        if (Array.isArray(value)) return value;
        return value;
    })
    categories?: string[];

    @Expose()
    @IsOptional()
    @IsArray({ message: 'difficulties должен быть массивом' })
    @IsEnum(DifficultyLevel, {
        each: true,
        message: 'Каждый элемент difficulties должен быть: easy, medium или hard',
    })
    @ArrayUnique({ message: 'Значения в difficulties не должны повторяться' })
    difficulties?: DifficultyLevel[];

    @Expose()
    @IsNotEmpty({ message: 'page не может быть пустым' })
    @IsNumber({}, { message: 'page должен быть числом' })
    @Min(1, { message: 'page должен быть не менее 1' })
    @Max(100000, { message: 'page не может превышать 100000' })
    page: number = 1;

    @Expose()
    @IsOptional()
    @IsString({ message: 'searchString должен быть строкой' })
    @IsNotEmpty({ message: 'searchString не может быть пустой строкой' })
    searchString?: string;

    @Expose()
    @IsOptional()
    @IsArray({ message: 'technologies должен быть массивом' })
    @ValidateNested({
        each: true,
        message: 'Каждый элемент technologies должен быть валидным объектом TechologieDto',
    })
    @Type(() => TechologieDto)
    technologies?: TechologieDto[];

    @Expose()
    @IsOptional()
    @IsEnum(SortByField, {
        message: 'sortBy должен быть одним из: title, createdAt, updatedAt, popularity, rating',
    })
    sortBy?: SortByField;

    @Expose()
    @IsOptional()
    @IsEnum(DurationRange, { message: 'duration должен быть одним из: short, medium, long' })
    duration?: DurationRange;

    @Expose()
    @IsOptional()
    @IsBoolean({ message: 'inProgress должен быть булевым значением' })
    @Transform(({ value }) => {
        if (value === 'true' || value === 1 || value === '1') return true;
        if (value === 'false' || value === 0 || value === '0') return false;
        return value;
    })
    inProgress?: boolean;

    @Expose()
    @IsOptional()
    @IsArray({ message: 'tags должен быть массивом' })
    @ValidateNested({
        each: true,
        message: 'Каждый элемент tags должен быть валидным объектом TagDto',
    })
    @Type(() => TagDto)
    tags: TagDto[] = [];
}

export class TagDto {
    @Expose()
    @IsNotEmpty({ message: 'title тега не может быть пустым' })
    @IsString({ message: 'title тега должен быть строкой' })
    title: string = '';

    @Expose()
    @IsNotEmpty({ message: 'count тега не может быть пустым' })
    @IsNumber({}, { message: 'count тега должен быть числом' })
    @Min(1, { message: 'count тега должен быть не менее 1' })
    @Max(10000, { message: 'count тега не может превышать 10000' })
    count: number = 0;
}

export class TechologieDto {
    @Expose()
    @IsNotEmpty({ message: 'title технологии не может быть пустым' })
    @IsString({ message: 'title технологии должен быть строкой' })
    title: string = '';

    @Expose()
    @IsNotEmpty({ message: 'count технологии не может быть пустым' })
    @IsNumber({}, { message: 'count технологии должен быть числом' })
    @Min(1, { message: 'count технологии должен быть не менее 1' })
    @Max(10000, { message: 'count технологии не может превышать 10000' })
    count: number = 0;
}

export class TagsResponseDto {
    @Expose()
    @IsArray({ message: 'items должен быть массивом' })
    @ValidateNested({
        each: true,
        message: 'Каждый элемент items должен быть валидным объектом TagDto',
    })
    @Type(() => TagDto)
    items: TagDto[] = [];
}

export class TechnologiesResponseDto {
    @Expose()
    @IsArray({ message: 'items должен быть массивом' })
    @ValidateNested({
        each: true,
        message: 'Каждый элемент items должен быть валидным объектом TechologieDto',
    })
    @Type(() => TechologieDto)
    items: TechologieDto[] = [];
}
