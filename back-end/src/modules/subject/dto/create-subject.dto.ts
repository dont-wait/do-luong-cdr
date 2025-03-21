import { IsNotEmpty, IsString } from "class-validator";

export class CreateSubjectDto {
    @IsString()
    @IsNotEmpty()
    subject_name: string;

    @IsNotEmpty()
    practical_credits: number;

    @IsNotEmpty()
    theoretical_credits: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    lecturer_id: string;

}
