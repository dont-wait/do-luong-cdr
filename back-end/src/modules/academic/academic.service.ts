import { Injectable } from '@nestjs/common';
import { CreateAcademicDto } from './dto/create-academic.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AcademicService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAcademicDto: CreateAcademicDto) {
    return await this.prisma.academic.create({
      data: createAcademicDto,
    });
  }

  async findAll() {
    return await this.prisma.academic.findMany();
  }

  async findOne(academic_id: string) {
    return await this.prisma.academic.findUnique({
      where: { academic_id: academic_id },
    });
  }

  async update(id: string, updateAcademicDto: CreateAcademicDto) {
    return await this.prisma.academic.update({
      where: { academic_id: id },
      data: updateAcademicDto,
    });
  }

  async createMany(data: CreateAcademicDto[]) {
    return await this.prisma.academic.createMany({
      data,
    });
  }

}
