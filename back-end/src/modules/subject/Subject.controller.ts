import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SubjectService } from './Subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subject' })
  @ApiResponse({ status: 201, description: 'The subject has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createSubject(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.createSubject(createSubjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subjects' })
  @ApiResponse({ status: 200, description: 'Return all subjects.' })
  getAllSubjects() {
    return this.subjectService.getAllSubjects();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subject by id' })
  @ApiParam({ name: 'id', description: 'Subject ID' })
  @ApiResponse({ status: 200, description: 'Return the subject.' })
  @ApiResponse({ status: 404, description: 'Subject not found.' })
  getSubjectById(@Param('id') id: string) {
    return this.subjectService.getSubjectById(id);
  }
}