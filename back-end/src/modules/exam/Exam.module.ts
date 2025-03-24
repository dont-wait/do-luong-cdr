import { Module } from '@nestjs/common';
import { ExamService } from './Exam.service';
import { ExamController } from './Exam.controller';

@Module({
  controllers: [ExamController],
  providers: [ExamService],
  exports: [ExamService],
})
export class ExamModule {}
