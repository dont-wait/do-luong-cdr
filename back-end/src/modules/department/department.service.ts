import { Injectable } from '@nestjs/common';
import { CreateDepartmanDto } from './dto/create-departman.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createDepartmanDto: CreateDepartmanDto) {
    return await this.prisma.department.create({
      data: createDepartmanDto,
    });
  }
}
