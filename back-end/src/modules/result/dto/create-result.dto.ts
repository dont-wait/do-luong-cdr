import { IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateResultDto {
    @IsNumber()
    @IsNotEmpty()
    score: number;
    
    @IsString()
    @IsNotEmpty()
    student_id: string;

    @IsString()
    @IsNotEmpty()
    question_id: string;
}
