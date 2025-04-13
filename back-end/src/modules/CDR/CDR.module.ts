import { Module } from '@nestjs/common';
import { CDRService } from './CDR.service';
import { CDRController } from './CDR.controller';
import { ExamService } from '../exam/Exam.service';
import { ResultService } from '../result/Result.service';
import { QuestionService } from '../question/Question.service';
import { SaveData } from 'src/utils/SaveData';
import { CloService } from '../clo/Clo.service';
import { StudentService } from '../student/Student.service';
import { PloCloService } from '../ploClo/PloClo.service';
@Module({
    controllers: [CDRController],
    providers: [CDRService, SaveData, ResultService, QuestionService, CloService, ExamService, PloCloService, StudentService],
    exports: [CDRService],
})
export class CDRModule {}