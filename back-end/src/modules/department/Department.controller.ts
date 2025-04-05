import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DepartmentService } from './Department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { ApiOkResponse, ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('departments')
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @ApiBody({ type: CreateDepartmentDto })
  @ApiOperation({ summary: 'Create a new department(s)' })
  @ApiResponse({ status: 201, description: 'Department has been created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  createDepartment(@Body() data: CreateDepartmentDto | CreateDepartmentDto[]) {
    return this.departmentService.createDepartment(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all departments' })
  @ApiOkResponse({ description: 'List of all departments retrieved successfully' })
  getAllDeparment() {
    return this.departmentService.getAllDepartments();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get department by ID' })
  @ApiOkResponse({ description: 'Department retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  getDepartmentById(@Param('id') id: string) {
    return this.departmentService.getDepartmentById(id);
  }



  @Delete(':id')
  @ApiOperation({ summary: 'Delete department by ID' })
  @ApiOkResponse({ description: 'Department deleted successfully' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  deleteDepartment(@Param('id') id: string) {
    return this.departmentService.deleteDepartment(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update department by ID' })
  @ApiOkResponse({ description: 'Department updated successfully' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  
  updateDepartmentById(@Param('id') id: string, @Body() data: CreateDepartmentDto) {
    return this.departmentService.updateDepartment(id, data);
  }
}
