import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcademicSubjectService } from './academic_subject.service';
import { CreateAcademicSubjectDto } from './dto/create-academic_subject.dto';
import { UpdateAcademicSubjectDto } from './dto/update-academic_subject.dto';

@Controller('academic-subject')
export class AcademicSubjectController {
  constructor(private readonly academicSubjectService: AcademicSubjectService) {}

  @Post()
  create(@Body() createAcademicSubjectDto: CreateAcademicSubjectDto) {
    return this.academicSubjectService.create(createAcademicSubjectDto);
  }

  @Get()
  findAll() {
    return this.academicSubjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicSubjectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcademicSubjectDto: UpdateAcademicSubjectDto) {
    return this.academicSubjectService.update(+id, updateAcademicSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicSubjectService.remove(+id);
  }
}
