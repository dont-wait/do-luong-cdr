import { Injectable } from '@nestjs/common';
import { CreateAcademicDto } from './dto/create-academic.dto';
import { PrismaService } from '../prisma/Prisma.service';

@Injectable()
export class AcademicService {
  constructor(private readonly prisma: PrismaService) {}
  async createAcademic(Data: CreateAcademicDto){
    return this.prisma.academic.create({data: Data})
  }

  async createManyAcademic(Data: CreateAcademicDto[]){
    return this.prisma.academic.createMany({
      data: Data.map(d => ({...d, academic_level: +d.academic_level, academic_type: +d.academic_type}))
    })
  }

  async findManyAcademic(){
    return this.prisma.academic.findMany();
  }

  async findOneAcademic(id: string){
    return this.prisma.academic.findUnique({
      where: {academic_id: id}
    })
  }

  async updateAcademic(id: string, Data: CreateAcademicDto){
    return this.prisma.academic.update({
      where: {academic_id: id},
      data: Data,
    })
  }

  async removeAcademic(id: string){
    return this.prisma.academic.delete({
      where: {academic_id: id},
    })
  }
}
