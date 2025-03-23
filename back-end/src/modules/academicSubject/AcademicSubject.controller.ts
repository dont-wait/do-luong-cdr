import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcademicSubjectService } from './AcademicSubject.service';

@Controller('academic-subject')
export class AcademicSubjectController {
  constructor(private readonly academicSubjectService: AcademicSubjectService) {}

  @Get()
  getAllAcademicSubject() {
    return this.academicSubjectService.getAllAcademicSubject();
  }
}
