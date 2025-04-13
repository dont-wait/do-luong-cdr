import { Module } from '@nestjs/common';
import { CDRService } from './CDR.service';
import { CDRController } from './CDR.controller';
import { ExamService } from '../exam/Exam.service';
import { ResultService } from '../result/Result.service';
import { QuestionService } from '../question/Question.service';
@Module({
    controllers: [CDRController],
    providers: [CDRService,ExamService,ResultService,QuestionService],
    exports: [CDRService],
})
export class CDRModule {}