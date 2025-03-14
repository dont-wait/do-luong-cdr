import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-departman.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  fineOne(@Param("id") id: string){
    return this.departmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param("id") id: string, @Body() newData: CreateDepartmentDto){
    return this.departmentService.update(id, newData);
  }

  @Post('createMany')
  createMany(@Body() data: CreateDepartmentDto[]){
    return this.departmentService.createMany(data);
  }

}
