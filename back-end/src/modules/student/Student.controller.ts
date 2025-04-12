import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentService } from './Student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import {} from '@prisma/client';

@ApiTags('students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'Return all students.' })
  public getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by id' })
  @ApiResponse({ status: 200, description: 'Return a student.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  public getStundent(@Param('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a student' })
  @ApiResponse({ status: 201, description: 'Student created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateStudentDto })
  public createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }


}
