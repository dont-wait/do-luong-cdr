import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcademicService } from './Academic.service';
import { CreateAcademicDto } from './dto/create-academic.dto';

@Controller('academics')
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}
  
  @Post()
  createAcademic(@Body() data: CreateAcademicDto | CreateAcademicDto[]) {
    return this.academicService.createAcademic(data)
  }

  @Get()
  findManyAcademics(){
    return this.academicService.findManyAcademics();
  }

  @Get("id")
  getAcademicById(@Param("id") id: string){
    return this.academicService.getAcademicById(id);
  }

  @Patch("id")
  updateAcademic(@Param("id") id: string, data: CreateAcademicDto){
    return this.academicService.updateAcademic(id, data)
  }

  @Delete("id")
  removeAcademic(@Param("id") id: string){
    return this.academicService.removeAcademic(id)
  }
}
