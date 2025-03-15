import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Post()
  create(@Body() Data: CreateDepartmentDto){
    return this.departmentService.create(Data)
  }

  @Post("createMany")
  createMany(@Body() Data: CreateDepartmentDto[]){
    return this.departmentService.createMany(Data)
  }

    @Get()
    findAll() {
      return this.departmentService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.departmentService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() Data: CreateDepartmentDto) {
      return this.departmentService.update(id, Data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.departmentService.remove(id);
    }
}
