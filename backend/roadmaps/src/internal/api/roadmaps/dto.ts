import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class GetRoadmapsDto {
    @Expose()
    @IsOptional()
    @IsString({ message: 'Title должен быть строкой' })
    title?: string;
}
