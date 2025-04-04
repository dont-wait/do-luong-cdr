import { Controller, Get, Post, Patch, Delete, Body, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ClassService } from './Class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@ApiTags('class')
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @ApiBody({ type: CreateClassDto, isArray: true })
  @ApiOperation({ summary: 'Create new Class' })
  @ApiResponse({ status: 201, description: 'Class successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  async create(@Body() data: CreateClassDto | CreateClassDto[]) {
    return this.classService.createClass(data);
  }

  @ApiOperation({ summary: 'Get Class by ID' })
  @ApiResponse({ status: 200, description: 'Class found' })
  @ApiResponse({ status: 400, description: 'Class not found' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.classService.getClassById(id);
  }

  @ApiOperation({ summary: 'Get all Classes' })
  @ApiResponse({ status: 200, description: 'List of all Classes' })
  @Get()
  async getAll() {
    return this.classService.getAllClasses();
  }


  @ApiOperation({ summary: 'Delete Class' })
  @ApiResponse({ status: 200, description: 'Class deleted successfully' })
  @ApiResponse({ status: 400, description: 'Class not found' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.classService.deleteClass(id);
  }

  @ApiOperation({ summary: 'Update Class' })
  @ApiResponse({ status: 200, description: 'Class updated successfully' })
  @ApiResponse({ status: 400, description: 'Class not found' })
  @ApiBody({ type: CreateClassDto })
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateClassDto) {
    return this.classService.updateClass(id, data);
  }
}
