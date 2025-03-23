import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAcademicDto {
    @ApiProperty({ description: 'The academic ID', example: 'ACD001' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ description: 'The academic name', example: 'Computer Science' })
    @IsString()
    @IsNotEmpty()
    academic_name: string;

    @ApiProperty({ description: 'The academic level', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    academic_level: number;

    @ApiProperty({ description: 'The academic type', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    academic_type: number;

    @ApiProperty({ description: 'The department ID', example: 'CNTT' })
    @IsString()
    department_id: string;
}
