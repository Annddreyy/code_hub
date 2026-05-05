import { User } from '@/internal/domain/user';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from 'class-validator';

export class LeaderboardRequestDto {
    @Expose()
    @IsNumber({}, { message: 'page должен быть числом' })
    @Min(1, { message: 'page должен быть натуральным числом' })
    page: number = 1;

    @Expose()
    @IsNotEmpty({ message: 'period не должен быть пустым ' })
    @IsString({ message: 'period должен быть строкой ' })
    period: string = 'all';
}

export class LeaderboardPodiumRequestDto {
    @Expose()
    @IsNotEmpty({ message: 'period не должен быть пустым ' })
    @IsString({ message: 'period должен быть строкой ' })
    period: string = 'all';
}

export class LeaderboardResponseDto {
    @Expose()
    @IsArray({ message: 'users должен быть массивом' })
    @ValidateNested({ each: true })
    @Type(() => User)
    users: User[] = [];

    @Expose()
    @IsNumber({}, { message: 'totalCount должен быть числом' })
    @Min(1, { message: 'totalCount должен быть натуральным числом' })
    totalCount: number = 1;

    @Expose()
    @IsNumber({}, { message: 'pageSize должен быть числом' })
    @Min(1, { message: 'pageSize должен быть натуральным числом' })
    pageSize: number = 1;
}

export class LeaderboardPodiumResponseDto {
    @Expose()
    @IsArray({ message: 'users должен быть массивом' })
    @ValidateNested({ each: true })
    @Type(() => User)
    users: User[] = [];
}
