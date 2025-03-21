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
        degree_id: +Data.degree_id
      }
     });
  }

  async findAllDegree() {
    return this.prisma.degree.findMany();
  }

  async getDegreeById(id: number) {
    return this.prisma.degree.findUnique({
      where: { degree_id: id },
    });
  }

  async updateDegree(id: number, Data: CreateDegreeDto) {
    return this.prisma.degree.update({
      where: { degree_id: id },
      data: Data,
    });
  }

  async removeDegree(id: number) {
    return this.prisma.degree.delete({
      where: { degree_id: id },
    });
  }

  async createManyDegree(Data: CreateDegreeDto[]) {
    return this.prisma.degree.createMany({
      data: Data.map(d => ({ ...d, degree_id: +d.degree_id })),
    });
  }

}
