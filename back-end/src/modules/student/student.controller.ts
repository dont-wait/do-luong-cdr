import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentService } from './Student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { } from "@prisma/client";

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  public getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Get(":id")
  public getStundent(@Param('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Post()
  public async createStudent(@Body()data: CreateStudentDto) {
    return await this.studentService.createStudent(data);
  }
}
