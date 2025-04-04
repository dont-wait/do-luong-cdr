import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PloService } from './Plo.service';
import { CreatePloDto } from './dto/create-plo.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('plos')
@Controller('plos')
export class PloController {
  constructor(private readonly ploService: PloService) {}

  @Post()
    @ApiOperation({ summary: 'Create new plo(s)' })
    @ApiResponse({ status: 201, description: 'Plo(s) successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    createAcademic(@Body() data: CreatePloDto | CreatePloDto[]) {
      return this.ploService.createPlo(data)
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all plos' })
    @ApiResponse({ status: 200, description: 'Return all plos.' })
    findManyAcademics() {
      return this.ploService.findManyPlos();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get plo by id' })
    @ApiResponse({ status: 200, description: 'Return a plo by id.' })
    @ApiResponse({ status: 404, description: 'Plo not found.' })
    getAcademicById(@Param('id') id: string) {
      return this.ploService.getPloById(id);
    }
  

  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete plo by id' })
    @ApiResponse({ status: 200, description: 'Plo successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Plo not found.' })
    removeAcademic(@Param('id') id: string) {
      return this.ploService.removePlo(id)
    }
}
