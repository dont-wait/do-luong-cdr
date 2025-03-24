import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AcademicSubjectService } from './AcademicSubject.service';

@ApiTags('academic-subject')
@Controller('academic-subject')
export class AcademicSubjectController {
  constructor(private readonly academicSubjectService: AcademicSubjectService) {}

  @ApiOperation({ summary: 'Get all academic subjects' })
  @Get()
  getAllAcademicSubject() {
    return this.academicSubjectService.getAllAcademicSubject();
  }
}
