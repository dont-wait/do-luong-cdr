import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Put } from '@nestjs/common';
import { CloService } from './Clo.service';
import { CreateCloDto } from './dto/create-clo.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('CLO')
@Controller('clo')
export class CloController {
  constructor(private readonly cloService: CloService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Tạo CLO thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @ApiBody({ type: [CreateCloDto] })
  async create(@Body() createCloDto: CreateCloDto | CreateCloDto[]) {
    return this.cloService.createClo(createCloDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Danh sách CLO' })
  async findAll() {
    return this.cloService.findManyClos();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Chi tiết CLO' })
  @ApiResponse({ status: 400, description: 'ID không hợp lệ' })
  @ApiResponse({status: 404, description: 'ID NOT FOUND'})
  async findOne(@Param('id') id: string) {
    return this.cloService.getCloById(id);
  }



  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Xóa CLO thành công' })
  @ApiResponse({ status: 400, description: 'ID không hợp lệ' })
  async remove(@Param('id') id: string) {
    return this.cloService.remove(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: CreateCloDto })
  @ApiResponse({ status: 200, description: 'Cập nhật CLO thành công' })
  @ApiResponse({ status: 400, description: 'ID không hợp lệ' })
  async update(@Param('id') id: string, @Body() data: CreateCloDto) {
    return this.cloService.updateClo(id, data);
  }


  async deleteCloById(@Param('id') id: string) {
    return this.cloService.remove(id);
  }
}
