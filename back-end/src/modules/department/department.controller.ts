import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentService } from './Department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  createDepartment(@Body() data: CreateDepartmentDto){
    return this.departmentService.createDeparment(data)
  }

  @Post("createMany")
  createManyDepartment(@Body() data: CreateDepartmentDto[]){
    return this.departmentService.createManyDepartment(data)
  }

  @Get()
  getAllDeparment() {
    return this.departmentService.getAllDepartments();
  }

  @Get(':id')
  getDepartmentById(@Param('id') id: string) {
    return this.departmentService.getDepartmentById(id);
  }

  @Patch(':id')
  updateDepartment(@Param('id') id: string, @Body() data: CreateDepartmentDto) {
    return this.departmentService.updateDepartment(id, data);
  }

  @Delete(':id')
  deleteDepartment(@Param('id') id: string) {
    return this.departmentService.deleteDepartment(id);
  }
}
