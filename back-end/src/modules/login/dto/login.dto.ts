import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: 'Your Admin | Lecturer id', example: 'AD003'})
    id: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: 'Your password', example: 'password123'})
    password: string;
}