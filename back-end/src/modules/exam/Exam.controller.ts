import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamService } from './Exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { ApiOkResponse, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('exams')
@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new exam' })
  @ApiResponse({ status: 201, description: 'Exam has been created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  createExam(@Body() data: CreateExamDto) {
    return this.examService.createExam(data);
  }

  @Post("createMany")
  @ApiOperation({ summary: 'Create multiple exams' })
  @ApiResponse({ status: 201, description: 'Exams have been created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  createManyExam(@Body() data: CreateExamDto[]) {
    return this.examService.createManyExam(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exams' })
  @ApiOkResponse({ description: 'List of all exams retrieved successfully' })
  getAllExams() {
    return this.examService.getAllExams();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exam by ID' })
  @ApiOkResponse({ description: 'Exam retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  getExamById(@Param('id') id: string) {
    return this.examService.getExamById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update exam by ID' })
  @ApiOkResponse({ description: 'Exam updated successfully' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  updateExam(@Param('id') id: string, @Body() data: CreateExamDto) {
    return this.examService.updateExam(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete exam by ID' })
  @ApiOkResponse({ description: 'Exam deleted successfully' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  deleteExam(@Param('id') id: string) {
    return this.examService.deleteExam(id);
  }
}