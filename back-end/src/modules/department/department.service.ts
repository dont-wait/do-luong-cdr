import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { PrismaService } from '../prisma/Prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}
  
  public async createDeparment(data: CreateDepartmentDto){
    return this.prisma.department.create({ data });
  }

  public async createManyDepartment(data: CreateDepartmentDto[]){
    return this.prisma.department.createMany({ data });
  }

  public async getAllDepartments(){
    return this.prisma.department.findMany();
  }

  public async getDepartmentById(id: string){
    return this.prisma.department.findUnique(
      {
        where: {department_id: id},
      }
    );
  }

  public async updateDepartment(id: string, data: CreateDepartmentDto){
    return this.prisma.department.update(
      {
        where: {department_id: id},
        data
      }
    );
  }

  public async deleteDepartment(id: string){
    return this.prisma.department.delete(
      {
        where: {department_id: id},
      }
    )
  }
}
