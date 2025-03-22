import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAcademicDto } from './dto/create-academic.dto';
import { PrismaService } from '../prisma/Prisma.service';
import { DepartmentService } from '../department/Department.service';

@Injectable()
export class AcademicService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly department: DepartmentService
  ) {}

  async createAcademic(data: CreateAcademicDto | CreateAcademicDto[]){
    if (Array.isArray(data)) {
      for (const d of data) {
        if (!d.department_id || !await this.department.getDepartmentById(d.department_id))
          throw new BadRequestException("Department ID không hợp lệ");
      }

      return this.prisma.academic.createMany({
        data: data.map(d => ({
          ...d,
          academic_level: +d.academic_level,
          academic_type: +d.academic_type
        }))
      });
    } 
    else {
      const { department_id } = data;

      if (!department_id || !await this.department.getDepartmentById(department_id))
        throw new BadRequestException("Department ID không hợp lệ");

      return this.prisma.academic.create({ data });
    }
  }

  async findManyAcademics(){
    return this.prisma.academic.findMany();
  }

  async getAcademicById(id: string){
    return this.prisma.academic.findUnique({
      where: {academic_id: id}
    })
  }

  async updateAcademic(id: string, data: CreateAcademicDto){
    return this.prisma.academic.update({
      where: {academic_id: id},
      data
    })
  }

  async removeAcademic(id: string){
    return this.prisma.academic.delete({
      where: {academic_id: id},
    })
  }
}
