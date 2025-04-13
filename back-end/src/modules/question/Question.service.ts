import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/Prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ExamService } from '../exam/Exam.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService,
    private readonly exam: ExamService
  ) {}

  public getAllQuestions() {
    return this.prisma.question.findMany();
  }

  public async getQuestion(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return question;
  }

  public async getAllQuestionsByExamId(examId: String) {
    const exam = await this.prisma.exam.findUnique({
      where: {id: examId.toString()}
    });
    if(!examId)
      throw new BadRequestException(`Exam with ID ${examId} not found`);

    return this.prisma.question.findMany({
      where: {exam_id: examId.toString()}
    });
  }

    public async createQuestion(data: CreateQuestionDto) {
      const exam = await this.exam.getExamById(data.exam_id);
      if (!exam) {
          throw new BadRequestException(`Kỳ thi với ID ${data.exam_id} không tồn tại`);
      }
  
      const existingQuestion = await this.prisma.question.findFirst({
          where: {
              exam_id: data.exam_id,
              question_name: data.question_name,
          },
      });
  
      if (existingQuestion) {
          throw new BadRequestException(
              `Câu hỏi "${data.question_name}" đã tồn tại trong kỳ thi với ID ${data.exam_id}`,
          );
      }
  
      // Tạo câu hỏi mới
      const newQuestion = await this.prisma.question.create({
          data: {
              exam_id: data.exam_id,
              question_name: data.question_name,
          },
      });
  
      return {
          statusCode: 201,
          message: 'Tạo câu hỏi thành công',
          data: newQuestion,
      };
  }



  public async updateQuestion(id: string, data: UpdateQuestionDto) {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    try {
      return await this.prisma.question.update({
        where: { id },
        data,
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  public async deleteQuestion(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    try {
      return await this.prisma.question.delete({
        where: { id },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  public async getQuestionIdsByExamIds(examIds: string[]) {
    const questions = await this.prisma.question.findMany({
      where: {
        exam_id: {
          in: examIds,
        },
      },
      select: {
        id: true,
      },
    });

    return questions.map((question) => question.id);
  }
}