import { Injectable } from '@nestjs/common';
import { CreateDegreeDto } from './dto/create-degree.dto';
import { PrismaService } from '../prisma/Prisma.service';

@Injectable()
export class DegreeService {
  constructor(private readonly prisma: PrismaService) {}
  async createDegree(Data: CreateDegreeDto) {
    return this.prisma.degree.create({ 
      data: {
        ...Data,
        id: +Data.degree_id,
      }
     });
  }

  async findAllDegree() {
    return this.prisma.degree.findMany();
  }

  async getDegreeById(id: number) {
    return this.prisma.degree.findUnique({
      where: { id: id },
    });
  }

  async updateDegree(id: number, Data: CreateDegreeDto) {
    return this.prisma.degree.update({
      where: { id: id },
      data: Data,
    });
  }

  async removeDegree(id: number) {
    return this.prisma.degree.delete({
      where: { id: id },
    });
  }

  async createManyDegree(Data: CreateDegreeDto[]) {
    return this.prisma.degree.createMany({
      data: Data.map(d => ({ ...d, degree_id: +d.degree_id })),
    });
  }

}
