import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
    @ApiProperty({ description: 'Admin ID', example: 'admin123' })
    @IsNotEmpty()
    @IsString()
    admin_id: string; 

    @ApiProperty({ description: 'First name', example: 'Me' })
    @IsNotEmpty()
    @IsString()
    first_name: string;
    
    @ApiProperty({ description: 'Last name', example: 'You' })
    @IsNotEmpty()
    @IsString()
    last_name: string; 

    @ApiProperty({ description: 'Password', example: 'password123' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ description: 'Email address', example: 'You.Me@example.com' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string; 

    @ApiProperty({ description: 'Phone number (10 digits)', example: '0123456789' })
    @IsNotEmpty()
    @IsString()
    @Length(10, 10)
    phone: string; 
}
