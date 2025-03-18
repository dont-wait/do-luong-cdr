import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentService } from './Student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  public getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Post()
  public async createStudent(@Body()data: CreateStudentDto) {
    return await this.studentService.createStudent(data);
  }
}
