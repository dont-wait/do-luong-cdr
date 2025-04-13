import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { PrismaService } from '../prisma/Prisma.service';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}


  async createExam(data: CreateExamDto | CreateExamDto[]) {
    if (Array.isArray(data)) {
      // Lấy tất cả class_id duy nhất
      const classIds = [...new Set(data.map((d) => d.class_id))];

      // Kiểm tra các class_id có tồn tại không
      const existingClasses = await this.prisma.class.findMany({
        where: { id: { in: classIds } },
        select: { id: true },
      });

      const existingClassIds = new Set(existingClasses.map((cls) => cls.id));
      const invalidClassIds = classIds.filter(
        (id) => !existingClassIds.has(id),
      );

      if (invalidClassIds.length > 0) {
        throw new BadRequestException(
          `class_id không hợp lệ: ${invalidClassIds.join(', ')}`,
        );
      }

      return this.prisma.exam.createMany({ data });
    } else {
      const { class_id } = data;

      if (
        !class_id ||
        !(await this.prisma.class.findUnique({ where: { id: class_id } }))
      ) {
        throw new BadRequestException('Class ID không hợp lệ');
      }

      return this.prisma.exam.create({ data });
    }
  }

  async getAllExams() {
    return this.prisma.exam.findMany();
  }

  async getExamById(id: string) {
    return this.prisma.exam.findUnique({ where: { id } });
  }

  async updateExam(id: string, data: CreateExamDto) {
    return this.prisma.exam.update({ where: { id }, data });
  }

  async deleteExam(id: string) {
    return this.prisma.exam.delete({ where: { id } });
  }
  public async getExamsByClassId(class_id: string) {
    return this.prisma.exam.findMany({
      where: { class_id },
    });
  }
}
