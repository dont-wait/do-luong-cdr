import { IsEmail, IsNotEmpty, IsString, Length, min } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  student_id: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(10, 10)
  @IsNotEmpty()
  phone: string;

  @IsString()
  @Length(5)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  academic_id: string;
}
