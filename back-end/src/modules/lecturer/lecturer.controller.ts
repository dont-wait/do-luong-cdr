import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LecturerService } from './lecturer.service';
import { CreateLecturerDto } from './dto/create-lecturer.dto';

@Controller('lecturer')
export class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

  @Post()
  create(@Body() data: CreateLecturerDto) {
    return this.lecturerService.create(data);
  }

  @Get()
  findAll() {
    return this.lecturerService.findAll();
  }
}
