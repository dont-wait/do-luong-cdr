import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PloService } from './plo.service';
import { CreatePloDto } from './dto/create-plo.dto';
import { UpdatePloDto } from './dto/update-plo.dto';

@Controller('plo')
export class PloController {
  constructor(private readonly ploService: PloService) {}

  @Post()
  create(@Body() createPloDto: CreatePloDto) {
    return this.ploService.create(createPloDto);
  }

  @Get()
  findAll() {
    return this.ploService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ploService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePloDto: UpdatePloDto) {
    return this.ploService.update(+id, updatePloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ploService.remove(+id);
  }
}
