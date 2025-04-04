import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DegreeService } from './Degree.service';
import { CreateDegreeDto } from './dto/create-degree.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('degree')
export class DegreeController {
  constructor(private readonly degreeService: DegreeService) {}

  @Post()
  @ApiBody({ type: CreateDegreeDto, isArray: true })
  createDegree(@Body() createDegreeDto: CreateDegreeDto | CreateDegreeDto[]) {
    return this.degreeService.createDegreeOrMany(createDegreeDto);
  }

  @Get()
  findAllDegree() {
    return this.degreeService.findAllDegree();
  }

  @Get(':id')
  findOneDegree(@Param('id') id: string) {
    return this.degreeService.getDegreeById(+id);
  }



  @Delete(':id')
  removeDegree(@Param('id') id: string) {
    return this.degreeService.removeDegree(+id);
  }
  @Put(':id')
  updateDegree(@Param('id') id: string, @Body() data: CreateDegreeDto) {
    return this.degreeService.updateDegree(+id, data);
  }
}
