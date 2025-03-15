import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateLecturerDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    academic_id: string;

    degree_id: number;

}
