import { Module } from '@nestjs/common';
import { QuestionController } from './Question.controller';
import { QuestionService } from './Question.service';
import { PrismaService } from '../prisma/Prisma.service';
import { ExamModule } from '../exam/Exam.module';

@Module({
  imports: [ExamModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
