import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateLecturerDto {
    @IsString()
    @IsNotEmpty()
    lecturer_id: string;

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(5)
    password: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    academic_id: string;

    @IsNotEmpty()
    @IsNumber()
    degree_id: number;
}
