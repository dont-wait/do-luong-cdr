import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Certificate } from 'crypto';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSubjectDto) {
    return await this.prisma.subject.create({
      data: data,
    });
  }

  async findAll() {
    return await this.prisma.subject.findMany();
  }

  async findOne(subject_id: string) {
    return await this.prisma.subject.findUnique({
      where: { subject_id: subject_id },
    });
  }

  async CreateMany(data: CreateSubjectDto[]) {
    return await this.prisma.subject.createMany(
      {
        data: data,
      }
    )
  }
}
