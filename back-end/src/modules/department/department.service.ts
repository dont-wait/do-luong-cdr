import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { PrismaService } from '../prisma/Prisma.service';



@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(Data: CreateDepartmentDto){
    return this.prisma.department.create({data: Data});
  }

  async createMany(Data: CreateDepartmentDto[]){
    return this.prisma.department.createMany({data: Data});
  }

  async findAll(){
    return this.prisma.department.findMany();
  }

  async findOne(id: string){
    return this.prisma.department.findUnique(
      {
        where: {department_id: id},
      }
    );
  }

  async update(id: string, Data: CreateDepartmentDto){
    return this.prisma.department.update(
      {
        where: {department_id: id},
        data: Data,
      }
    );
  }

  async remove(id: string){
    return this.prisma.department.delete(
      {
        where: {department_id: id},
      }
    )
  }
}
