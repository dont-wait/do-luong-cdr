import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DegreeService } from './Degree.service';
import { CreateDegreeDto } from './dto/create-degree.dto';

@Controller('degree')
export class DegreeController {
  constructor(private readonly degreeService: DegreeService) {}

  @Post()
  createDegree(@Body() createDegreeDto: CreateDegreeDto) {
    return this.degreeService.createDegree(createDegreeDto);
  }

  @Post('createMany')
  createManyDegree(@Body() createDegreeDto: CreateDegreeDto[]) {
    return this.degreeService.createManyDegree(createDegreeDto);
  }

  @Get()
  findAllDegree() {
    return this.degreeService.findAllDegree();
  }

  @Get(':id')
  findOneDegree(@Param('id') id: string) {
    return this.degreeService.getDegreeById(+id);
  }

  @Patch(':id')
  updateDegree(@Param('id') id: string, @Body() Data: CreateDegreeDto) {
    return this.degreeService.updateDegree(+id, Data);
  }

  @Delete(':id')
  removeDegree(@Param('id') id: string) {
    return this.degreeService.removeDegree(+id);
  }
}
