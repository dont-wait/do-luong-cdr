import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LecturerService } from './Lecturer.service';
import { CreateLecturerDto } from './dto/create-lecturer.dto';

@Controller('lecturers')
export class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

  @Post()
  async createLecturer(@Body() createLecturerDto: CreateLecturerDto) {
    return this.lecturerService.createLecturer(createLecturerDto);
  }

  @Get()
  async getAllLecturer() {
    return this.lecturerService.getAllLecturer();
  }

  @Get(':id')
  async getLecturerById(@Param('id') id: string) {
    return this.lecturerService.getLecturerById(id);
  }
}
