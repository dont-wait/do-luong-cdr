import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PloService } from './Plo.service';
import { CreatePloDto } from './dto/create-plo.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('plos')
@Controller('plos')
export class PloController {
  constructor(private readonly ploService: PloService) {}

  @Post()
  @ApiBody({ type: CreatePloDto, isArray: true })
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
    @Put(':id')
    @ApiOperation({ summary: 'Update plo by id' })
    @ApiResponse({ status: 200, description: 'Plo successfully updated.' })
    @ApiResponse({ status: 404, description: 'Plo not found.' })
    updateAcademic(@Param('id') id: string, @Body() data: CreatePloDto) {
      return this.ploService.updatePlo(id, data)
    }
}
