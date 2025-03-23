import { IsNotEmpty, IsNumber, IsString, IsArray } from "class-validator";

export class CreateSubjectDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    subject_name: string;

    @IsNotEmpty()
    @IsNumber()
    practical_credits: number;

    @IsNotEmpty()
    @IsNumber()
    theoretical_credits: number;

    @IsString()
    description: string | null;

    @IsString()
    @IsNotEmpty()
    lecturer_id: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    academic_id: string[];
}
