import { Expose, Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    Length,
    IsNumber,
    Min,
    Max,
    IsOptional,
    IsDate,
    IsEnum,
} from 'class-validator';

export enum Category {
    COMMON = 'common',
    RARE = 'rare',
    EPIC = 'epic',
    LEGENDARY = 'legendary',
}

export class UserMeta {
    @Expose()
    @IsOptional()
    @IsDate({ message: 'earnedDate должен быть датой' })
    earnedDate?: Date;
}

export class Achievement {
    @Expose()
    @IsNotEmpty({ message: 'ID не может быть пустым' })
    @IsString({ message: 'ID должен быть строкой' })
    @Length(1, 100, { message: 'ID должен быть от 1 до 100 символов' })
    id: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Title не может быть пустым' })
    @IsString({ message: 'Title должен быть строкой' })
    @Length(1, 200, { message: 'Title должен быть от 1 до 200 символов' })
    title: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Description не может быть пустой' })
    @IsString({ message: 'Description должна быть строкой' })
    @Length(1, 500, { message: 'Description должна быть от 1 до 500 символов' })
    description: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Icon не может быть пустым' })
    @IsString({ message: 'Icon должен быть строкой' })
    @Length(1, 255, { message: 'Icon должен быть от 1 до 255 символов' })
    icon: string = '';

    @Expose()
    @IsNotEmpty({ message: 'XP Reward не может быть пустым' })
    @IsNumber({}, { message: 'XP Reward должен быть числом' })
    @Min(1, { message: 'XP Reward не может быть меньше 1' })
    @Max(1000000, { message: 'XP Reward не может быть больше 1000000' })
    xpReward: number = 0;

    @Expose()
    @IsNotEmpty({ message: 'Category не может быть пустой' })
    @IsEnum(Category, {
        message: 'Category должна быть одним из значений: common, rare, epic, legendary',
    })
    category: Category = Category.COMMON;

    @Expose()
    @Type(() => UserMeta)
    userMeta: UserMeta = new UserMeta();
}
