import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/Prisma.service';

@Injectable()
export class AcademicSubjectService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  public async createAcademicSubject(subjectId: string, academicId: string[]) {
    const validAcademics = await this.prisma.academic.findMany({
      where: { id: { in: academicId } },
      select: { id: true },
    });

    const validAcademicIds = validAcademics.map(a => a.id);

    const invalidAcademicIds = academicId.filter(id => !validAcademicIds.includes(id));

    if (invalidAcademicIds.length > 0) {
      throw new BadRequestException(`Invalid academic IDs: ${invalidAcademicIds.join(', ')}`);
    }

    return await this.prisma.academic_subject.createMany({
      data: academicId.map(academic_id => ({
        academic_id,
        subject_id: subjectId,
      })),
    });
  }

  public async getAllAcademicSubject() {
    return await this.prisma.academic_subject.findMany({ include: { academic: true, subject: true } });
  }
}
