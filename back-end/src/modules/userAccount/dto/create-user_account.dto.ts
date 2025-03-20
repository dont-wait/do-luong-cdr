import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateUserAccountDto {
    @IsString()
    admin_id: string | null;

    @IsString()
    student_id: string | null;

    @IsString()
    lecturer_id: string | null;

    @IsNotEmpty()
    @IsNumber()
    role_id: number;
}