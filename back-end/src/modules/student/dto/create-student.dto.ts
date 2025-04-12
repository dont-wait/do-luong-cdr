import { IsEmail, IsNotEmpty, IsString, Length, min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ description: 'Student ID', example: 'ST001' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: 'First name of the student', example: 'Me' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ description: 'Last name of the student', example: 'You' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ description: 'Class ID', example: 'CL001' })
  @IsNotEmpty()
  @IsString()
  class_id: string;
}
