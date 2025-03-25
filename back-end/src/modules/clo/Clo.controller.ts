import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { CloService } from './Clo.service';
import { CreateCloDto } from './dto/create-clo.dto';
import { UpdateCloDto } from './dto/update-clo.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('CLO') // Gắn tag cho Swagger
@Controller('clo')
export class CloController {
  constructor(private readonly cloService: CloService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Tạo CLO thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @ApiBody({ type: [CreateCloDto] }) // Hỗ trợ tạo nhiều CLO cùng lúc
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
  async findOne(@Param('id') id: string) {
    const cloId = parseInt(id, 10);
    if (isNaN(cloId)) throw new BadRequestException('ID không hợp lệ');
    return this.cloService.getCloById(cloId);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Cập nhật CLO thành công' })
  @ApiResponse({ status: 400, description: 'ID không hợp lệ' })
  async update(@Param('id') id: string, @Body() updateCloDto: UpdateCloDto) {
    const cloId = parseInt(id, 10);
    if (isNaN(cloId)) throw new BadRequestException('ID không hợp lệ');
    return this.cloService.updateClo(cloId, updateCloDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Xóa CLO thành công' })
  @ApiResponse({ status: 400, description: 'ID không hợp lệ' })
  async remove(@Param('id') id: string) {
    const cloId = parseInt(id, 10);
    if (isNaN(cloId)) throw new BadRequestException('ID không hợp lệ');
    return this.cloService.remove(cloId);
  }
}
