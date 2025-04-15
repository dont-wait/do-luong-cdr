import { Global, Module, Res } from '@nestjs/common';
import { ApproveController } from './Approve.controller';
import { ApproveService } from './Approve.service';
import { SaveData } from 'src/utils/SaveData';
import { ResultService } from '../result/Result.service';
import { QuestionService } from '../question/Question.service';
import { CloService } from '../clo/Clo.service';
import { ExamService } from '../exam/Exam.service';
import { PloCloService } from '../ploClo/PloClo.service';
import { StudentService } from '../student/Student.service';

@Module({
  controllers: [ApproveController],
  providers: [ApproveService, SaveData, ResultService, QuestionService, CloService, ExamService, PloCloService, StudentService],
  exports: [ApproveService],
})
export class ApproveModule {}
