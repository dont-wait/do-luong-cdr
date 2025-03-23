import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubjectService } from './Subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  createSubject(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.createSubject(createSubjectDto);
  }

  @Get()
  getAllSubjects() {
    return this.subjectService.getAllSubjects();
  }

  @Get(':id')
  getSubjectById(@Param('id') id: string) {
    return this.subjectService.getSubjectById(id);
  }
}