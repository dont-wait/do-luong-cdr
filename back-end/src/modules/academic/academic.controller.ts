import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcademicService } from './Academic.service';
import { CreateAcademicDto } from './dto/create-academic.dto';

@Controller('academic')
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}
  
  @Post()
  createAcademic(@Body() Data: CreateAcademicDto){
    return this.academicService.createAcademic(Data)
  }

  @Post("createMany")
  createManyAcademic(@Body() Data: CreateAcademicDto[]){
    return this.academicService.createManyAcademic(Data)
  }

  @Get()
  findManyAcademic(){
    return this.academicService.findManyAcademic();
  }

  @Get("id")
  findOneAcademic(@Param("id") id: string){
    return this.academicService.findOneAcademic(id)
  }

  @Patch("id")
  updateAcademic(@Param("id") id: string, Data: CreateAcademicDto){
    return this.academicService.updateAcademic(id,Data)
  }

  @Delete("id")
  removeAcademic(@Param("id") id: string){
    return this.academicService.removeAcademic(id)
  }
}
