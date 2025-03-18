import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

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
  email: string;

  @IsString()
  @Length(10, 10)
  phone: string;

  @IsNotEmpty()
  @IsString()
  academic_id: string;
}
