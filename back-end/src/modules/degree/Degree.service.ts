import { Injectable } from '@nestjs/common';
import { CreateDegreeDto } from './dto/create-degree.dto';
import { PrismaService } from '../prisma/Prisma.service';

@Injectable()
export class DegreeService {
  constructor(private readonly prisma: PrismaService) {}
  async createDegreeOrMany(data: CreateDegreeDto | CreateDegreeDto[]) {
    if (Array.isArray(data)) {
      return this.prisma.degree.createMany({
        data: data.map(d => ({
          ...d,
          id: +d.degree_id,
        })),
      });
    } else {
      return this.prisma.degree.create({
        data: {
          ...data,
          id: +data.degree_id,
        },
      });
    }
  }
  

  async findAllDegree() {
    return this.prisma.degree.findMany();
  }

  async getDegreeById(id: number) {
    return this.prisma.degree.findUnique({
      where: { id },
    });
  }

  async updateDegree(id: number, Data: CreateDegreeDto) {
    return this.prisma.degree.update({
      where: { id },
      data: Data,
    });
  }

  async removeDegree(id: number) {
    return this.prisma.degree.delete({
      where: { id },
    });
  }



}
