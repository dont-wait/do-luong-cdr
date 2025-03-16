import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PloDetailService } from './PloDetail.service';
import { CreatePloDetailDto } from './dto/create-plo_detail.dto';
import { UpdatePloDetailDto } from './dto/update-plo_detail.dto';

@Controller('plo-detail')
export class PloDetailController {
  constructor(private readonly ploDetailService: PloDetailService) {}

  @Post()
  create(@Body() createPloDetailDto: CreatePloDetailDto) {
    return this.ploDetailService.create(createPloDetailDto);
  }

  @Get()
  findAll() {
    return this.ploDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ploDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePloDetailDto: UpdatePloDetailDto) {
    return this.ploDetailService.update(+id, updatePloDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ploDetailService.remove(+id);
  }
}
