import { IsEmail, IsNotEmpty, IsString, Length, min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ description: 'Student ID', example: 'ST001' })
  @IsNotEmpty()
  @IsString()
  student_id: string;

  @ApiProperty({ description: 'First name of the student', example: 'Me' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ description: 'Last name of the student', example: 'You' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ description: 'Email address', example: 'You.Me@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Phone number (10 digits)', example: '1234567890' })
  @IsString()
  @Length(10, 10)
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Password (minimum 5 characters)', example: 'password123' })
  @IsString()
  @Length(5)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Academic ID', example: 'AC001' })
  @IsNotEmpty()
  @IsString()
  academic_id: string;
}
