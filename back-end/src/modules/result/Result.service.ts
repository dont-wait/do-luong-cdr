import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/Prisma.service';
import { CreateResultDto } from './dto/create-result.dto';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}

  async createResult(data: CreateResultDto | CreateResultDto[]) {
    if (Array.isArray(data)) {
      for (const r of data) {
        if (!r.student_id || !r.question_id || !r.clo_id) {
          throw new BadRequestException(
            'Student ID, Question ID, and CLO ID are required',
          );
        }

        const studentExists = await this.prisma.student.findUnique({
          where: { id: r.student_id },
        });
        if (!studentExists) {
          throw new BadRequestException(`Student ID ${r.student_id} not found`);
        }

        const questionExists = await this.prisma.question.findUnique({
          where: { id: r.question_id },
        });
        if (!questionExists) {
          throw new BadRequestException(
            `Question ID ${r.question_id} not found`,
          );
        }

        const cloExists = await this.prisma.clo.findUnique({
          where: { id: r.clo_id },
        });
        if (!cloExists) {
          throw new BadRequestException(`CLO ID ${r.clo_id} not found`);
        }

        if (r.score > r.max_score) {
          throw new BadRequestException(
            `Score ${r.score} exceeds max score ${r.max_score}`,
          );
        }
      }

      return this.prisma.result.createMany({
        data: data,
      });
    } else {
      const studentExists = await this.prisma.student.findUnique({
        where: { id: data.student_id },
      });
      if (!studentExists) {
        throw new BadRequestException(
          `Student ID ${data.student_id} not found`,
        );
      }

      const questionExists = await this.prisma.question.findUnique({
        where: { id: data.question_id },
      });
      if (!questionExists) {
        throw new BadRequestException(
          `Question ID ${data.question_id} not found`,
        );
      }

      return this.prisma.result.create({ data });
    }
  }

  async getResultById(id: string) {
    const result = await this.prisma.result.findUnique({ where: { id } });
    return result;
  }

  async findAllResult() {
    return this.prisma.result.findMany();
  }

  async updateResult(id: string, data: CreateResultDto) {
    const studentExists = await this.prisma.student.findUnique({
      where: { id: data.student_id },
    });
    if (!studentExists) {
      throw new BadRequestException(`Student ID ${data.student_id} not found`);
    }
    const questionExists = await this.prisma.question.findUnique({
      where: { id: data.question_id },
    });
    if (!questionExists) {
      throw new BadRequestException(
        `Question ID ${data.question_id} not found`,
      );
    }
    return await this.prisma.result.update({
      where: { id },
      data,
    });
  }

  async removeResult(id: string) {
    return await this.prisma.result.delete({ where: { id } });
  }

  getResultByQuestionIds(questionIds: string[]) {
    return this.prisma.result.findMany({
      where: {
        question_id: {
          in: questionIds,
        },
      },
      include: {
        clo: {
          select: {
            id: true,
            clo_name: true,
            clo_parent_id: true,
          },
        },
      },
    });
  }

  async findResultsByStudentAndExam(studentId: string, examId: string) {
    return this.prisma.result.findMany({
      where: {
        student_id: studentId,
        question: {
          exam_id: examId,
        },
      },
      include: {
        question: {
          select: {
            question_name: true,
            exam_id: true,
          },
        },
        clo: {
          select: {
            clo_name: true,
            clo_parent_id: true,
          },
        },
      },
    });
  }

  async getTotalScoreByStudentAndExam(studentId: string, examId: string) {
    const { _sum } = await this.prisma.result.aggregate({
      where: {
        student_id: studentId,
        question: {
          exam_id: examId,
        },
      },
      _sum: {
        score: true,
      },
    });

    return {
      student_id: studentId,
      exam_id: examId,
      total_score: Number(_sum.score ?? 0),
    };
  }

  async getTotalScoreByCLOAndStudent(studentId: string, cloId: string) {
    // 1. Lấy danh sách clo (clo cha + clo con)
    const cloList = await this.prisma.clo.findMany({
      where: {
        OR: [{ id: cloId }, { clo_parent_id: cloId }],
      },
      select: { id: true },
    });

    const cloIds = cloList.map((c) => c.id);
    if (cloIds.length === 0) {
      return {
        student_id: studentId,
        clo_id: cloId,
        total_score: 0,
        total_max_score: 0,
      };
    }

    // 2. Dùng Prisma aggregate để tính trực tiếp trong DB
    const { _sum } = await this.prisma.result.aggregate({
      where: {
        student_id: studentId,
        clo_id: { in: cloIds },
      },
      _sum: {
        score: true,
        max_score: true,
      },
    });

    return {
      student_id: studentId,
      clo_id: cloId,
      total_score: Number(_sum.score ?? 0),
      total_max_score: Number(_sum.max_score ?? 0),
    };
  }

  async getRootClosInClassResults(classId: string) {
    // Truy vấn tất cả clo_id từ kết quả của các bài kiểm tra trong lớp
    const results = await this.prisma.result.findMany({
      where: {
        question: {
          exam: {
            class_id: classId,
          },
        },
      },
      select: {
        clo_id: true,
      },
    });

    const cloIds = [...new Set(results.map((r) => r.clo_id))];
    if (cloIds.length === 0) return [];

    // Truy vấn CLO gốc (clo_parent_id IS NULL)
    const rootClos = await this.prisma.clo.findMany({
      where: {
        id: { in: cloIds },
        clo_parent_id: 'null',
      },
      select: {
        id: true,
        clo_name: true,
      },
    });

    return rootClos;
  }
}
