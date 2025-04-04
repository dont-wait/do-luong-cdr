import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { LecturerService } from './Lecturer.service';
import { CreateLecturerDto } from './dto/create-lecturer.dto';

@ApiTags('lecturers')
@Controller('lecturers')
export class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

  @Post()
  @ApiBody({ type: CreateLecturerDto })
  @ApiOperation({ summary: 'Create a new lecturer' })
  @ApiResponse({ status: 201, description: 'The lecturer has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createLecturer(@Body() createLecturerDto: CreateLecturerDto ) {
    return this.lecturerService.createLecturer(createLecturerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all lecturers' })
  @ApiResponse({ status: 200, description: 'Return all lecturers.' })
  async getAllLecturer() {
    return this.lecturerService.getAllLecturer();
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Get a lecturer by id' })
  @ApiParam({ name: 'id', description: 'Lecturer ID' })
  @ApiResponse({ status: 200, description: 'Return the lecturer.' })
  @ApiResponse({ status: 404, description: 'Lecturer not found.' })
  async getLecturerById(@Param('id') id: string) {
    return this.lecturerService.getLecturerById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lecturer by id' })
  @ApiParam({ name: 'id', description: 'Lecturer ID' })
  @ApiResponse({ status: 200, description: 'Lecturer successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Lecturer not found.' })
  async deleteLecturer(@Param('id') id: string) {
    return this.lecturerService.removeLecturer(id);
  }
  
  @Put(':id')
  @ApiOperation({ summary: 'Update a lecturer by id' })
  @ApiParam({ name: 'id', description: 'Lecturer ID' })
  @ApiBody({ type: CreateLecturerDto })
  @ApiResponse({ status: 200, description: 'Lecturer successfully updated.' })
  @ApiResponse({ status: 404, description: 'Lecturer not found.' })
  async updateLecturer(@Param('id') id: string, @Body() data: CreateLecturerDto) {
    return this.lecturerService.updateLecturer(id, data);
  }
}
