import { CreateResultDto } from "src/modules/result/dto/create-result.dto"
import { ResultService } from "src/modules/result/Result.service"
import { CreateQuestionDto } from "src/modules/question/dto/create-question.dto"
import { QuestionService } from "src/modules/question/Question.service"
import { CloService } from "src/modules/clo/Clo.service"
import { ApproveDataDto} from "./saveApproveData.dto"
import { StudentService } from "src/modules/student/Student.service"
import { ExamService } from "src/modules/exam/Exam.service"
import { BadRequestException } from "@nestjs/common"
import { CreateStudentDto } from "src/modules/student/dto/create-student.dto"

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
          cloScores[clo] = parseFloat(cloMap[clo][0]);
        }

        maxScoreMap[questionName] = cloScores;
      }
    }
    return maxScoreMap;
  }

  public async saveApprovedData(approvedData: ApproveDataDto) {
    const headers = approvedData.header.slice(1);
    const exams = approvedData.Body;
    
    const maxScoreMap = this.parseMaxScoreMap(headers);
    for (const exam of exams) {

      const examId = exam.id_exam;
      const existingExam = await this.examService.getExamById(examId);
      if (!existingExam) {
        throw new BadRequestException(`Không tìm thấy exam với ID: ${examId}`);
      }
      const students: Record<string, any>[] = exam.Data;

      
      await Promise.all(
        headers.map(async (item) => {
          if (typeof item === "object") {
            const questionName = Object.keys(item)[0];
            const dto: CreateQuestionDto = { question_name: questionName, exam_id: examId };
            await this.questionService.createQuestion(dto);
          }
        }),
      );

      const listQuestion = await this.questionService.getAllQuestionsByExamId(examId);
      const cloIdCache: Record<string, string> = {};
      for (const student of students) {
        const studentId = String(student["Mã sinh viên"]);
        const lastname_sinhvien = student["Họ đệm"];
        const firstname_sinhvien = student["Tên"];
        const studentcreat: CreateStudentDto = {
          id: studentId,
          last_name: lastname_sinhvien,
          first_name: firstname_sinhvien,
        };
        
        const studentExist = await this.studentService.createStudent(studentcreat);
        if (!studentExist) {
          throw new BadRequestException(`Không thể tạo sinh viên với ID: ${studentId}`);
        }
        const existingStudent = await this.studentService.getStudent(studentId);
        if (!existingStudent) {
          throw new BadRequestException(`Không tìm thấy sinh viên với ID: ${studentId}`);
        }
        const resultPromises: Promise<any>[] = [];

        for (const key in student) {

          if (!key.startsWith("Câu")) continue;

          const cloScores = student[key];
          
          const normalizedName = normalizeQuestionName(key);
          const question = listQuestion.find(q => q.question_name === normalizedName);

          if (!question?.id) {
            throw new BadRequestException(`Không tìm thấy câu hỏi với tên: ${normalizedName}`);
          }

          for (const cloName in cloScores) {
            const score = Number(cloScores[cloName]);

            if (!cloIdCache[cloName]) {
              try {
                cloIdCache[cloName] = await this.cloService.getCloIdByName(cloName);
              } catch (err) {
                throw new BadRequestException(`Không tìm thấy CLO với tên: ${cloName}`);
              }
            }

            const clo_id = cloIdCache[cloName];
            const max_score = maxScoreMap[normalizedName]?.[cloName] ?? 0;
            if(score > max_score) {
              throw new BadRequestException(`Điểm không hợp lệ cho sinh viên ${studentId} với câu hỏi ${normalizedName} và CLO ${cloName}`);
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
