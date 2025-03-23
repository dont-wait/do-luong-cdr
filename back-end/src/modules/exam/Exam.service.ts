import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { PrismaService } from '../prisma/Prisma.service';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}

  public async createExam(data: CreateExamDto) {
    return this.prisma.exam.create({ data });
  }

  public async createManyExam(data: CreateExamDto[]) {
    return this.prisma.exam.createMany({ data });
  }

  public async getAllExams() {
    return this.prisma.exam.findMany();
  }

  public async getExamById(id: string) {
    return this.prisma.exam.findUnique({ where: { id } });
  }

  public async updateExam(id: string, data: CreateExamDto) {
    return this.prisma.exam.update({
      where: { id },
      data,
    });
  }

  public async deleteExam(id: string) {
    return this.prisma.exam.delete({ where: { id } });
  }
}