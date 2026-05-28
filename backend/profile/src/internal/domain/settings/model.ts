import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class Settings {
    @Expose()
    @IsOptional()
    @IsString({ message: 'EditorTheme должен быть строкой' })
    editorTheme?: string;

    @Expose()
    @IsOptional()
    @IsNumber({}, { message: 'FontSize должен быть числом' })
    editorFontSize?: number;

    @Expose()
    @IsOptional()
    @IsString({ message: 'DefaultLanguage должен быть строкой' })
    defaultLanguage?: string;

    @Expose()
    @IsOptional()
    @IsNumber({}, { message: 'DayGoal должна быть числом' })
    dailyGoal?: number;

    @Expose()
    @IsOptional()
    @IsBoolean({ message: 'enableAnimations должно быть логическим значением' })
    enableAnimations?: boolean;
}
