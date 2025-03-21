import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAccountDto {
    @ApiProperty({ 
        description: 'Admin ID',
        type: String,
        nullable: true 
    })
    @IsString()
    admin_id: string | null;

    @ApiProperty({ 
        description: 'Student ID',
        type: String,
        nullable: true 
    })
    @IsString()
    student_id: string | null;

    @ApiProperty({ 
        description: 'Lecturer ID',
        type: String,
        nullable: true 
    })
    @IsString()
    lecturer_id: string | null;

    @ApiProperty({ 
        description: 'Role ID',
        type: Number,
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    role_id: number;
}