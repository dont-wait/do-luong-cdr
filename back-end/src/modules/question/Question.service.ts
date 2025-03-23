import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/Prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

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

  public async createQuestion(data: CreateQuestionDto) {
    try {
      return await this.prisma.question.create({
        data,
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
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
}