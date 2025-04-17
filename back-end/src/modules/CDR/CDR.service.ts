import { BadRequestException, Injectable } from '@nestjs/common';
import { ExamService } from '../exam/Exam.service';
import { QuestionService } from '../question/Question.service';
import { ResultService } from '../result/Result.service';
import { PrismaService } from '../prisma/Prisma.service';
import { SaveData } from 'src/utils/SaveData';
import { MultiExamDto } from 'src/utils/SaveDataExam.dto';
import { CloService } from '../clo/Clo.service';
import { StudentService } from '../student/Student.service';

export interface StudentResult {
  id: string;
  first_name: string;
  last_name: string;
  examList: Record<string, number>;
  cloList: Record<string, number>;
  GPA: { score: number; result: string };
  CDR: { score: number; result: string };
  result: string;
}

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class CDRService {
  private readonly saveDataUtil: SaveData;

  constructor(
    private readonly examService: ExamService,
    private readonly questionService: QuestionService,
    private readonly resultService: ResultService,
    private readonly prisma: PrismaService,
    private readonly cloService: CloService,
    private readonly studentService: StudentService,
  ) {
    this.saveDataUtil = new SaveData(
      this.resultService,
      this.questionService,
      this.cloService,
      this.studentService,
      this.examService,
    );
  }

  public async gradingForStudents(
    id_class: string,
  ): Promise<ApiResponse<StudentResult[]>> {
    const [exams, students, parentClos] = await Promise.all([
      this.examService.getExamsByClassId(id_class),
      this.studentService.getAllStudents(),
      this.resultService.getRootClosInClassResults(id_class),
    ]);

    if (!exams.length) {
      throw new BadRequestException(
        `Không tìm thấy bài kiểm tra nào trong lớp ID ${id_class}`,
      );
    }
    if (!students.length) {
      throw new BadRequestException(
        `Không có sinh viên nào trong hệ thống để tính điểm.`,
      );
    }
    if (!parentClos.length) {
      throw new BadRequestException(
        `Không tìm thấy CLO gốc nào trong lớp ID ${id_class}`,
      );
    }

    const data: StudentResult[] = [];

    for (const student of students) {
      const examList: Record<string, number> = {};
      let gpaTotal = 0;

      for (const exam of exams) {
        const result = await this.resultService.getTotalScoreByStudentAndExam(
          student.id,
          exam.id,
        );
        const score = Number(result.total_score.toFixed(2));
        examList[exam.exam_name] = score;
        gpaTotal += score;
      }

      const GPA = Number((gpaTotal / exams.length).toFixed(2));
      const GPAResult = GPA >= 4 ? 'Đạt' : 'Không đạt';

      const cloList: Record<string, any> = {};
      let cdrTotal = 0;
      const passFlags: boolean[] = [];

      for (const clo of parentClos) {
        const result = await this.resultService.getTotalScoreByCLOAndStudent(
          student.id,
          clo.id,
        );
        const percentage =
          result.total_max_score === 0
            ? 0
            : (result.total_score * 10) / result.total_max_score;
        const score = Number(percentage.toFixed(2));

        cloList[clo.clo_name] = {
          score,
          result:
            result.total_score >= 0.4 * result.total_max_score
              ? 'đạt'
              : 'Không đạt',
        };
        cdrTotal += score;
        passFlags.push(result.total_score >= 0.4 * result.total_max_score);
      }

      const CDRScore = Number((cdrTotal / parentClos.length).toFixed(2));
      const CDRResult = passFlags.includes(false) ? 'Không đạt' : 'Đạt';

      const finalResult =
        GPAResult === 'Đạt' && CDRResult === 'Đạt' ? 'Đạt' : 'Không đạt';

      const studentResult: StudentResult = {
        id: student.id,
        first_name: student.first_name,
        last_name: student.last_name,
        examList,
        cloList,
        GPA: { score: GPA, result: GPAResult },
        CDR: { score: CDRScore, result: CDRResult },
        result: finalResult,
      };

      data.push(studentResult);
    }

    return {
      statusCode: 200,
      message: 'Success',
      data,
    };
  }

  public async SaveDataForStudent(DataExam: MultiExamDto) {
    if (!DataExam) {
      throw new Error('Không có dữ liệu approve');
    }
    return await this.saveDataUtil.saveMultiExamData(DataExam);
  }
}
