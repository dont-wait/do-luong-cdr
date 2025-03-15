import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DegreeService } from './degree.service';
import { CreateDegreeDto } from './dto/create-degree.dto';

@Controller('degree')
export class DegreeController {
  constructor(private readonly degreeService: DegreeService) {}

  @Post()
  create(@Body() createDegreeDto: CreateDegreeDto) {
    return this.degreeService.create(createDegreeDto);
  }

  @Post('createMany')
  createMany(@Body() createDegreeDto: CreateDegreeDto[]) {
    return this.degreeService.createMany(createDegreeDto);
  }

  @Get()
  findAll() {
    return this.degreeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.degreeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() Data: CreateDegreeDto) {
    return this.degreeService.update(+id, Data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.degreeService.remove(+id);
  }
}
