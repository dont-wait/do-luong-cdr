import { CreateResultDto } from "src/modules/result/dto/create-result.dto"
import { ResultService } from "src/modules/result/Result.service"
import { CreateQuestionDto } from "src/modules/question/dto/create-question.dto"
import { QuestionService } from "src/modules/question/Question.service"
import { CloService } from "src/modules/clo/Clo.service"
import { ApproveDataDto} from "./saveApproveData.dto"
import { StudentService } from "src/modules/student/Student.service"
import { ExamService } from "src/modules/exam/Exam.service"

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
    console.log(`Max Score Map: ${JSON.stringify(maxScoreMap)}`);
    for (const exam of exams) {

      const examId = exam.id_exam;
      console.log(`Exam ID: ${examId}`);
      const existingExam = await this.examService.getExamById(examId);
      console.log(`Existing Exam: ${existingExam}`);
      if (!existingExam) {
        console.log(`⚠️ Không tìm thấy exam với ID: ${examId}`);
        continue;
      }
      const students: Record<string, any>[] = exam.Data;

      console.log(`Tao cau hoi cho exam ID: ${examId}`);
      
      await Promise.all(
        headers.map(async (item) => {
          if (typeof item === "object") {
            const questionName = Object.keys(item)[0];
            const dto: CreateQuestionDto = { question_name: questionName, exam_id: examId };
            await this.questionService.createQuestion(dto);
            console.log(`Tạo câu hỏi: ${questionName} cho exam ID: ${examId}`);
          }
        }),
      );

      const listQuestion = await this.questionService.getAllQuestionsByExamId(examId);
      const cloIdCache: Record<string, string> = {};

      for (const student of students) {
        const studentId = String(student["Mã sinh viên"]);
        const existingStudent = await this.studentService.getStudent(studentId);
        if (!existingStudent) {
          console.warn(`⚠️ Không tìm thấy sinh viên với ID: ${studentId}`);
          continue;
        }
        const resultPromises: Promise<any>[] = [];

        for (const key in student) {
          if (!key.startsWith("Câu")) continue;

          const cloScores = student[key];
          
          const normalizedName = normalizeQuestionName(key);
          const question = listQuestion.find(q => q.question_name === normalizedName);

          if (!question?.id) {
            console.warn(`⚠️ Không tìm thấy question_id cho: ${normalizedName}`);
            continue;
          }

          for (const cloName in cloScores) {
            const score = Number(cloScores[cloName]);

            if (!cloIdCache[cloName]) {
              try {
                cloIdCache[cloName] = await this.cloService.getCloIdByName(cloName);
              } catch (err) {
                console.warn(`⚠️ Lỗi khi lấy CLO ID cho '${cloName}':`, err);
                continue;
              }
            }

            const clo_id = cloIdCache[cloName];
            const max_score = maxScoreMap[normalizedName]?.[cloName] ?? 0;
            if(score > max_score) {
              console.warn(`⚠️ Điểm ${score} lớn hơn điểm tối đa ${max_score} cho CLO '${cloName}' trong câu hỏi '${normalizedName}'`);
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
