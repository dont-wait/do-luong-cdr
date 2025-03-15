import { Module } from '@nestjs/common';
import { ExamDetailService } from './exam_detail.service';
import { ExamDetailController } from './exam_detail.controller';

@Module({
  controllers: [ExamDetailController],
  providers: [ExamDetailService],
})
export class ExamDetailModule {}
