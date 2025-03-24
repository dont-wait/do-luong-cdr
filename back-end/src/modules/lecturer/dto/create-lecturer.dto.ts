import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLecturerDto {
    @ApiProperty({ description: 'The lecturer ID', example: 'LEC001' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ description: 'First name of the lecturer', example: 'America' })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ description: 'Last name of the lecturer', example: 'Caption' })
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({ description: 'Email address', example: 'America.Caption@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Password (minimum 5 characters)', example: 'password123' })
    @IsNotEmpty()
    @Length(5)
    password: string;

    @ApiProperty({ description: 'Phone number', example: '0123456789' })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ description: 'Academic ID', example: 'AC001', required: false })
    @IsString()
    academic_id: string;

    @ApiProperty({ description: 'Degree ID', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    degree_id: number;
}
