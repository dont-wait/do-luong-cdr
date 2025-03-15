import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcademicService } from './academic.service';
import { CreateAcademicDto } from './dto/create-academic.dto';

@Controller('academic')
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}
  
  @Post()
  create(@Body() Data: CreateAcademicDto){
    return this.academicService.create(Data)
  }

  @Post("createMany")
  createMany(@Body() Data: CreateAcademicDto[]){
    return this.academicService.createMany(Data)
  }

  @Get()
  findMany(){
    return this.academicService.findMany();
  }

  @Get("id")
  findOne(@Param("id") id: string){
    return this.academicService.findOne(id)
  }

  @Patch("id")
  update(@Param("id") id: string, Data: CreateAcademicDto){
    return this.academicService.update(id,Data)
  }

  @Delete("id")
  remove(@Param("id") id: string){
    return this.academicService.remove(id)
  }
}
