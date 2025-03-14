import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcademicService } from './academic.service';
import { CreateAcademicDto } from './dto/create-academic.dto';
import { UpdateAcademicDto } from './dto/update-academic.dto';

@Controller('academic')
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}

  @Post()
  create(@Body() createAcademicDto: CreateAcademicDto) {
    return this.academicService.create(createAcademicDto);
  }

  @Get()
  findAll() {
    return this.academicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcademicDto: UpdateAcademicDto) {
    return this.academicService.update(+id, updateAcademicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicService.remove(+id);
  }
}
