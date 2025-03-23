import { IsNotEmpty, IsNumber, IsString, IsArray } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto {
    @ApiProperty({ description: 'Subject ID', example: 'SUB001' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ description: 'Name of the subject', example: 'Mathematics' })
    @IsString()
    @IsNotEmpty()
    subject_name: string;

    @ApiProperty({ description: 'Number of practical credits', example: 2 })
    @IsNotEmpty()
    @IsNumber()
    practical_credits: number;

    @ApiProperty({ description: 'Number of theoretical credits', example: 3 })
    @IsNotEmpty()
    @IsNumber()
    theoretical_credits: number;

    @ApiProperty({ description: 'Subject description', nullable: true, example: 'Introduction to basic mathematics' })
    @IsString()
    description: string | null;

    @ApiProperty({ description: 'Lecturer ID', example: 'LEC001' })
    @IsString()
    @IsNotEmpty()
    lecturer_id: string;

    @ApiProperty({ description: 'Academic IDs', type: [String], example: ['AC001', 'AC002'] })
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    academic_id: string[];
}
