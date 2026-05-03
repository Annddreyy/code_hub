import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Lesson } from '../lesson/lesson';

export class Module {
    @Expose()
    @IsNotEmpty({ message: 'ID не может быть пустым' })
    @IsString({ message: 'ID должен быть строкой' })
    id: string = '';

    @Expose()
    @IsNotEmpty({ message: 'Title не может быть пустым' })
    @IsString({ message: 'Title должен быть строкой' })
    title: string = '';

    @Expose()
    @ValidateNested({ each: true })
    @Type(() => Lesson)
    @IsArray({ message: 'Lessons должен быть массивом' })
    lessons: Lesson[] = [];
}
