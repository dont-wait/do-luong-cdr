import { CreateResultDto } from 'src/modules/result/dto/create-result.dto';
import { ResultService } from 'src/modules/result/Result.service';
import { CreateQuestionDto } from 'src/modules/question/dto/create-question.dto';
import { QuestionService } from 'src/modules/question/Question.service';
import { CloService } from 'src/modules/clo/Clo.service';
import { StudentService } from 'src/modules/student/Student.service';
import { ExamService } from 'src/modules/exam/Exam.service';
import { BadRequestException } from '@nestjs/common';
import { CreateStudentDto } from 'src/modules/student/dto/create-student.dto';
import { MultiExamDto, FullExamDto } from './SaveDataExam.dto';

function normalizeQuestionName(raw: string): string {
  return raw.replace(/\s*\(.*?\)\s*/g, '').trim();
}

export class SaveData {
  constructor(
    private readonly resultService: ResultService,
    private readonly questionService: QuestionService,
    private readonly cloService: CloService,
    private readonly studentService: StudentService,
    private readonly examService: ExamService,
  ) {}

  private parseMaxScoreMap(headers: any[]): Record<string, Record<string, number>> {
    const maxScoreMap: Record<string, Record<string, number>> = {};

    for (const item of headers) {
      if (typeof item === 'object') {
        const questionName = Object.keys(item)[0];
        const cloMap = item[questionName];

        const cloScores: Record<string, number> = {};
        for (const clo in cloMap) {
          const scores = cloMap[clo].map(Number);
          cloScores[clo] = Math.max(...scores);
        }

        maxScoreMap[questionName] = cloScores;
      }
    }

    return maxScoreMap;
  }

  public async saveMultiExamData(multiExamData: MultiExamDto): Promise<void> {
    for (const exam of multiExamData) {
      const examId = exam.body.exam_id;

      const existingExam = await this.examService.getExamById(examId);
      if (!existingExam) {
        throw new BadRequestException(`Không tìm thấy Exam với ID: ${examId}`);
      }

      const headers = exam.header;
      const data = exam.body.data;

      const metaHeaders = headers.slice(1); 
      const maxScoreMap = this.parseMaxScoreMap(metaHeaders);

      await Promise.all(
        metaHeaders.map(async (item) => {
          if (typeof item === 'object') {
            const questionName = Object.keys(item)[0];
            const dto: CreateQuestionDto = {
              question_name: questionName,
              exam_id: examId,
            };
            await this.questionService.createQuestion(dto);
          }
        }),
      );

      const listQuestion = await this.questionService.getAllQuestionsByExamId(examId);
      const cloIdCache: Record<string, string> = {};

      for (const student of data) {
        const studentId = String(student['Mã sinh viên']);
        const lastName = student['Họ đệm'];
        const firstName = student['Tên'];

        const studentDto: CreateStudentDto = {
          id: studentId,
          last_name: lastName,
          first_name: firstName,
        };

        await this.studentService.createStudent(studentDto);
        const existingStudent = await this.studentService.getStudent(studentId);
        if (!existingStudent) {
          throw new BadRequestException(`Không tìm thấy sinh viên với ID: ${studentId}`);
        }

        const resultPromises: Promise<any>[] = [];

        for (const key in student) {
          if (!key.startsWith('Câu')) continue;

          const cloScores = student[key];
          const normalizedName = normalizeQuestionName(key);

          const question = listQuestion.find(q => q.question_name === normalizedName);
          if (!question?.id) {
            throw new BadRequestException(`Không tìm thấy câu hỏi "${normalizedName}"`);
          }

          for (const cloName in cloScores) {
            const score = Number(cloScores[cloName]);


            if (!cloIdCache[cloName]) {
              try {
                cloIdCache[cloName] = await this.cloService.getCloIdByName(cloName);
              } catch (err) {
                throw new BadRequestException(`Không tìm thấy CLO "${cloName}"`);
              }
            }

            const clo_id = cloIdCache[cloName];
            const max_score = maxScoreMap[normalizedName]?.[cloName] ?? 0;

            if (score > max_score) {
              throw new BadRequestException(`Điểm không hợp lệ cho SV ${studentId}, câu "${normalizedName}", CLO "${cloName}"`);
            }

            const resultDto: CreateResultDto = {
              student_id: studentId,
              score,
              question_id: question.id,
              clo_id,
              max_score,
            };

            resultPromises.push(this.resultService.createResult(resultDto));
          }
        }

        await Promise.all(resultPromises);
      }
    }
  }
}
