import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AcademicService } from './Academic.service';
import { CreateAcademicDto } from './dto/create-academic.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('academics')
@Controller('academics')
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create new academic(s)' })
  @ApiResponse({ status: 201, description: 'Academic(s) successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createAcademic(@Body() data: CreateAcademicDto | CreateAcademicDto[]) {
    return this.academicService.createAcademic(data)
  }

  @Get()
  @ApiOperation({ summary: 'Get all academics' })
  @ApiResponse({ status: 200, description: 'Return all academics.' })
  findManyAcademics() {
    return this.academicService.findManyAcademics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get academic by id' })
  @ApiResponse({ status: 200, description: 'Return a academic by id.' })
  @ApiResponse({ status: 404, description: 'Academic not found.' })
  getAcademicById(@Param('id') id: string) {
    return this.academicService.getAcademicById(id);
  }



  @Put(':id')
  @ApiOperation({ summary: 'Update academic by id' })
  @ApiResponse({ status: 200, description: 'Academic successfully updated.' })
  @ApiResponse({ status: 404, description: 'Academic not found.' })
  updateAcademicPut(@Param('id') id: string, @Body() data: CreateAcademicDto) {
    return this.academicService.updateAcademic(id, data)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete academic by id' })
  @ApiResponse({ status: 200, description: 'Academic successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Academic not found.' })
  removeAcademic(@Param('id') id: string) {
    return this.academicService.removeAcademic(id)
  }
}
