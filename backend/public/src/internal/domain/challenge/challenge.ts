import { Expose, Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    Length,
    IsArray,
    IsNumber,
    IsOptional,
    Min,
    Max,
    IsEnum,
    IsObject,
    ValidateNested,
    IsDate,
} from 'class-validator';

export type ChallengeStatus = 'popular' | 'new' | 'hot' | null;
export type ChallengeDifficulty = 'easy' | 'medium' | 'hard';

export class ChallengeUserMeta {
    @Expose()
    @IsOptional()
    @IsDate({ message: 'solvedAt должен быть датой' })
    solvedAt?: Date;
}

export class Challenge {
    @Expose()
    @IsNotEmpty({ message: 'ID не может быть пустым' })
    @IsString({ message: 'ID должен быть строкой' })
    id: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Title не может быть пустым' })
    @IsString({ message: 'Title должен быть строкой' })
    @Length(1, 200, { message: 'Title должен быть от 1 до 200 символов' })
    title: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Topic не может быть пустым' })
    @IsString({ message: 'Topic должен быть строкой' })
    @Length(1, 100, { message: 'Topic должен быть от 1 до 100 символов' })
    topic: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Difficulty не может быть пустым' })
    @IsEnum(['easy', 'medium', 'hard'], {
        message: 'Difficulty должен быть easy, medium или hard',
    })
    difficulty: ChallengeDifficulty = 'easy';

    @Expose()
    @IsOptional()
    @IsEnum(['popular', 'new', 'hot'], {
        message: 'Status должен быть popular, new или hot',
    })
    status: ChallengeStatus = null;

    @Expose()
    @IsArray({ message: 'Tags должен быть массивом' })
    @IsString({ each: true, message: 'Каждый тег должен быть строкой' })
    @Length(1, 50, { each: true, message: 'Длина каждого тега от 1 до 50 символов' })
    tags: string[] = [];

    @Expose()
    @IsNotEmpty({ message: 'Accept не может быть пустым' })
    @IsNumber({}, { message: 'Accept должен быть числом' })
    @Min(0, { message: 'Accept не может быть меньше 0' })
    accept: number = 0;

    @Expose()
    @IsNotEmpty({ message: 'XpReward не может быть пустым' })
    @IsNumber({}, { message: 'XpReward должен быть числом' })
    @Min(0, { message: 'XpReward не может быть меньше 0' })
    @Max(10000, { message: 'XpReward не может быть больше 10000' })
    xpReward: number = 0;

    @Expose()
    @ValidateNested()
    @Type(() => ChallengeUserMeta)
    @IsObject({ message: 'UserMeta должен быть объектом' })
    userMeta: ChallengeUserMeta = new ChallengeUserMeta();
}
