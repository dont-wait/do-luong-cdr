import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CloService } from './clo.service';
import { CreateCloDto } from './dto/create-clo.dto';
import { UpdateCloDto } from './dto/update-clo.dto';

@Controller('clo')
export class CloController {
  constructor(private readonly cloService: CloService) {}

  @Post()
  create(@Body() createCloDto: CreateCloDto) {
    return this.cloService.create(createCloDto);
  }

  @Get()
  findAll() {
    return this.cloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCloDto: UpdateCloDto) {
    return this.cloService.update(+id, updateCloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cloService.remove(+id);
  }
}
