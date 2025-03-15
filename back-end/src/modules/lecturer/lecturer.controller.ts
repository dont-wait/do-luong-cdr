import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LecturerService } from './lecturer.service';
import { CreateLecturerDto } from './dto/create-lecturer.dto';

@Controller('lecturer')
export class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

}
