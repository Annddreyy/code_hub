import { Expose, Type } from 'class-transformer';
import { 
    IsNotEmpty, 
    IsString, 
    Length, 
    IsArray, 
    ValidateNested, 
    IsNumber, 
    IsOptional,
    ArrayMinSize,
    ArrayMaxSize,
    Min,
    Max
} from 'class-validator';

export class ExperienceLevelDto {
    @Expose()
    @IsNotEmpty({ message: 'ID не может быть пустым' })
    @IsString({ message: 'ID должен быть строкой' })
    id: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Title не может быть пустым' })
    @IsString({ message: 'Title должен быть строкой' })
    @Length(1, 100, { message: 'Title должен быть от 1 до 100 символов' })
    title: string= '';

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
    @IsNotEmpty({ message: 'Difficulty не может быть пустым' })
    @IsNumber({}, { message: 'Difficulty должен быть числом' })
    @Min(1, { message: 'Difficulty должен быть не меньше 1' })
    @Max(10, { message: 'Difficulty должен быть не больше 10' })
    difficulty: number = 1;
}

export class LanguageDto {
    @Expose()
    @IsNotEmpty({ message: 'ID не может быть пустым' })
    @IsString({ message: 'ID должен быть строкой' })
    id: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Title не может быть пустым' })
    @IsString({ message: 'Title должен быть строкой' })
    @Length(1, 100, { message: 'Title должен быть от 1 до 100 символов' })
    title: string =  '';

    @Expose()
    @IsNotEmpty({ message: 'Icon не может быть пустым' })
    @IsString({ message: 'Icon должен быть строкой' })
    icon: string = '';

    @Expose()
    @IsArray({ message: 'Usage areas должен быть массивом' })
    @IsString({ each: true, message: 'Каждая область использования должна быть строкой' })
    usageAreas: string[] = [];
}

export class GoalDto {
    @Expose()
    @IsNotEmpty({ message: 'ID не может быть пустым' })
    @IsString({ message: 'ID должен быть строкой' })
    id: string = '';

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
    @IsOptional()
    @IsString({ message: 'Tag должен быть строкой' })
    tag?: string;
}

export class OnboardingDataDto {
    @Expose()
    @IsArray({ message: 'Goals должен быть массивом' })
    @ValidateNested({ each: true, message: 'Каждый goal должен быть валидным' })
    @Type(() => GoalDto)
    @ArrayMinSize(1, { message: 'Должен быть хотя бы один goal' })
    @ArrayMaxSize(50, { message: 'Не может быть больше 50 goals' })
    goals: GoalDto[] = [];

    @Expose()
    @IsArray({ message: 'Languages должен быть массивом' })
    @ValidateNested({ each: true, message: 'Каждый language должен быть валидным' })
    @Type(() => LanguageDto)
    @ArrayMinSize(1, { message: 'Должен быть хотя бы один language' })
    @ArrayMaxSize(50, { message: 'Не может быть больше 50 languages' })
    languages: LanguageDto[] = [];

    @Expose()
    @IsArray({ message: 'Experience levels должен быть массивом' })
    @ValidateNested({ each: true, message: 'Каждый experience level должен быть валидным' })
    @Type(() => ExperienceLevelDto)
    @ArrayMinSize(1, { message: 'Должен быть хотя бы один experience level' })
    @ArrayMaxSize(20, { message: 'Не может быть больше 20 experience levels' })
    experienceLevels: ExperienceLevelDto[] = [];
}
