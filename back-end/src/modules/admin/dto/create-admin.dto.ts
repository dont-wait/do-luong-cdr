import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAdminDto {
    @IsNotEmpty()
    @IsString()
    admin_id: string; 

    @IsNotEmpty()
    @IsString()
    first_name: string;
    
    @IsNotEmpty()
    @IsString()
    last_name: string; 

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string; 

    @IsNotEmpty()
    @IsString()
    @Length(10, 10)
    phone: string; 
}
