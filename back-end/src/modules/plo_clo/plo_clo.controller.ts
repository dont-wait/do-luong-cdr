import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PloCloService } from './plo_clo.service';
import { CreatePloCloDto } from './dto/create-plo_clo.dto';
import { UpdatePloCloDto } from './dto/update-plo_clo.dto';

@Controller('plo-clo')
export class PloCloController {
  constructor(private readonly ploCloService: PloCloService) {}

  @Post()
  create(@Body() createPloCloDto: CreatePloCloDto) {
    return this.ploCloService.create(createPloCloDto);
  }

  @Get()
  findAll() {
    return this.ploCloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ploCloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePloCloDto: UpdatePloCloDto) {
    return this.ploCloService.update(+id, updatePloCloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ploCloService.remove(+id);
  }
}
