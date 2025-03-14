import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-departman.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createDepartmentDto: CreateDepartmentDto) {
    return await this.prisma.department.create({
      data: createDepartmentDto,
    });
  }

  async findAll() {
    return await this.prisma.department.findMany();
  }

  async findOne(parment_id: string) {
    return await this.prisma.department.findUnique({
      where: { department_id: parment_id },
    });
  }

  async update(id: string, updateDepartmanDto: CreateDepartmentDto) {
    return await this.prisma.department.update({
      where: { department_id: id },
      data: updateDepartmanDto,
    });
  }
  async createMany(data: CreateDepartmentDto[]) {
    return await this.prisma.department.createMany({
      data,
    });
  }
}
