import { Controller, Get, Post, Delete, Body, Param, BadRequestException, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PloDetailService } from './PloDetail.service';
import { CreatePloDetailDto } from './dto/create-plo_detail.dto';

@ApiTags('plo-detail')
@Controller('plo-details')
export class PloDetailController {
  constructor(private readonly ploDetailService: PloDetailService) {}

  @ApiBody({ type: CreatePloDetailDto, isArray: true })
  @ApiOperation({ summary: 'Create new PloDetail' })
  @ApiResponse({ status: 201, description: 'PloDetail has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  async create(@Body() data: CreatePloDetailDto | CreatePloDetailDto[]) {
    return this.ploDetailService.createPloDetail(data);
  }

  @ApiOperation({ summary: 'Get PloDetail by ID' })
  @ApiResponse({ status: 200, description: 'PloDetail found' })
  @ApiResponse({ status: 400, description: 'PloDetail not found' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.ploDetailService.getPloDetailByID(id);
  }

  @ApiOperation({ summary: 'Get all PloDetails' })
  @ApiResponse({ status: 200, description: 'List of all PloDetails' })
  @Get()
  async getAll() {
    return this.ploDetailService.getAllPloDetail();
  }
  @ApiOperation({ summary: 'Update PloDetail' })
  @ApiResponse({ status: 200, description: 'PloDetail updated successfully' })
  @ApiResponse({ status: 400, description: 'PloDetail not found' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreatePloDetailDto) {
    return this.ploDetailService.updatePloDeTail(id, data);
  }

  @ApiOperation({ summary: 'Delete PloDetail' })
  @ApiResponse({ status: 200, description: 'PloDetail deleted successfully' })
  @ApiResponse({ status: 400, description: 'PloDetail not found' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ploDetailService.deletePloDetail(id);
  }
}
