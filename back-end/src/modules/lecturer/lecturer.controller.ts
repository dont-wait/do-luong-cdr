import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LecturerService } from './Lecturer.service';
import { CreateLecturerDto } from './dto/create-lecturer.dto';

@ApiTags('lecturers')
@Controller('lecturers')
export class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lecturer' })
  @ApiResponse({ status: 201, description: 'The lecturer has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createLecturer(@Body() createLecturerDto: CreateLecturerDto) {
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
}
