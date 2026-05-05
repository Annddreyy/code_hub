import { Expose } from 'class-transformer';
import {
    ArrayUnique,
    IsArray,
    IsEnum,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';

export enum STATUS {
    TODO = 'todo',
    INPROGRESS = 'in-progress',
    DONE = 'done',
}

export class ChallengeFiltersDto {
    @Expose()
    @IsOptional()
    @IsArray({ message: 'topics должен быть массивом строк' })
    @IsString({ each: true, message: 'Каждый элемент topics должен быть строкой' })
    @ArrayUnique({ message: 'Значения в topics не должны повторяться' })
    @MaxLength(50, { each: true, message: 'Каждый topic не может превышать 50 символов' })
    @MinLength(1, { each: true, message: 'Каждый topic должен содержать минимум 1 символ' })
    topics?: string[];

    @Expose()
    @IsOptional()
    @IsArray({ message: 'statuses должен быть массивом' })
    @IsEnum(STATUS, {
        each: true,
        message: 'Каждый элемент statuses должен быть одним из значений: todo, in-progress, done',
    })
    @ArrayUnique({ message: 'Значения в statuses не должны повторяться' })
    @MaxLength(3, { each: true, message: 'Недопустимое значение в statuses' })
    statuses?: STATUS[];

    @Expose()
    @IsOptional()
    @IsString({ message: 'title должен быть строкой' })
    @MinLength(1, { message: 'title должен содержать минимум 1 символ' })
    @MaxLength(100, { message: 'title не может превышать 100 символов' })
    @IsNotEmpty({ message: 'title не может быть пустой строкой' })
    title?: string;

    @Expose()
    @IsOptional()
    @IsString({ message: 'difficulty должен быть строкой' })
    @IsIn(['easy', 'medium', 'hard'], {
        message: 'difficulty должна быть одной из: easy, medium, hard',
    })
    @IsNotEmpty({ message: 'difficulty не может быть пустой строкой' })
    difficulty?: string;

    @Expose()
    @IsNotEmpty({ message: 'page не может быть пустым' })
    @IsNumber({}, { message: 'page должен быть числом' })
    @Min(1, { message: 'page должен быть не менее 1' })
    @Max(100000, { message: 'page не может превышать 100000' })
    page: number = 1;
}

export class ChallengeStatsResponseDto {
    @Expose()
    @IsNumber({}, { message: 'completedCount должен быть числом' })
    @Min(0, { message: 'completedCount не может быть отрицательным' })
    completedCount: number = 0;

    @Expose()
    @IsNumber({}, { message: 'pendingCount должен быть числом' })
    @Min(0, { message: 'pendingCount не может быть отрицательным' })
    pendingCount: number = 0;

    @Expose()
    @IsNumber({}, { message: 'hardCount должен быть числом' })
    @Min(0, { message: 'hardCount не может быть отрицательным' })
    hardCount: number = 0;

    @Expose()
    @IsNumber({}, { message: 'mediumCount должен быть числом' })
    @Min(0, { message: 'mediumCount не может быть отрицательным' })
    mediumCount: number = 0;

    @Expose()
    @IsNumber({}, { message: 'easyCount должен быть числом' })
    @Min(0, { message: 'easyCount не может быть отрицательным' })
    easyCount: number = 0;

    @Expose()
    @IsNumber({}, { message: 'totalCount должен быть числом' })
    @Min(0, { message: 'totalCount не может быть отрицательным' })
    totalCount: number = 0;

    @Expose()
    @IsNumber({}, { message: 'completionPercentage должен быть числом' })
    @Min(0, { message: 'completionPercentage не может быть меньше 0' })
    @Max(100, { message: 'completionPercentage не может быть больше 100' })
    completionPercentage: number = 0;
}
