import { Module } from '@nestjs/common';
import { ExamDetailService } from './ExamDetail.service';
import { ExamDetailController } from './ExamDetail.controller';

@Module({
  controllers: [ExamDetailController],
  providers: [ExamDetailService],
})
export class ExamDetailModule {}
