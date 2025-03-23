import { Module } from '@nestjs/common';
import { QuestionController } from './Question.controller';
import { QuestionService } from './Question.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
