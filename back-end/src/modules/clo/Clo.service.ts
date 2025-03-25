import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCloDto } from './dto/create-clo.dto';
import { PrismaService } from '../prisma/Prisma.service';
import { SubjectService } from '../subject/Subject.service';

@Injectable()
export class CloService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subjectService: SubjectService,
  ) {}

  public async createClo(data: CreateCloDto | CreateCloDto[]) {
    if (Array.isArray(data)) {
      for (const d of data) {
        const subjectExists = await this.subjectService.getSubjectById(
          d.subject_id,
        );
        if (!subjectExists || !d.subject_id)
          throw new BadRequestException('Subject not found');
      }
      return this.prisma.clo.createMany({ data });
    } else {
      const subjectExists = await this.subjectService.getSubjectById(
        data.subject_id,
      );
      if (!subjectExists || !data.subject_id)
        throw new BadRequestException('Subject not found');
      return this.prisma.clo.create({ data });
    }
  }
  async findManyClos() {
    return this.prisma.clo.findMany();
  }

  async getCloById(id: string) {
    return this.prisma.clo.getById(id);
  }

  async updateClo(id: string, data: UpdateCloDto) {
    return this.prisma.clo.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    
  }
}
