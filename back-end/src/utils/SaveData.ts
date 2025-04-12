import { CreateResultDto } from "src/modules/result/dto/create-result.dto"
import { ResultService } from "src/modules/result/Result.service"
import { CreateQuestionDto } from "src/modules/question/dto/create-question.dto"
import { QuestionService } from "src/modules/question/Question.service"
import { CloService } from "src/modules/clo/Clo.service"
import { ApproveDataDto} from "./saveApproveData.dto"
function normalizeQuestionName(raw: string): string {
  return raw.replace(/\s*\(.*?\)\s*/g, '').trim(); // "Câu 1 (5.0)" => "Câu 1"
}

export class SaveData {
  constructor(
    private readonly resultService: ResultService,
    private readonly questionService: QuestionService,
    private readonly cloService: CloService,
  ) {}

  private parseMaxScoreMap(headers: any[]): Record<string, Record<string, number>> {
    const maxScoreMap: Record<string, Record<string, number>> = {};
    for (const item of headers) {
      console.log("==> Parsing item:", item);
      console.log("==> Item type:", typeof item);
      if (typeof item === 'object') {
        console.log("Đã vào đây");
        const questionName = Object.keys(item)[0];
        console.log("==> Question Name:", questionName);
        const cloMap = item[questionName];

        const cloScores: Record<string, number> = {};
        for (const clo in cloMap) {
          cloScores[clo] = parseFloat(cloMap[clo][0]); // từ ["3"] => 3
        }

        maxScoreMap[questionName] = cloScores;
      }
    }
    console.log("==> Max Score Mapping:", maxScoreMap);
    return maxScoreMap;
  }

  public async saveApprovedData(approvedData: ApproveDataDto) {
    const headers = approvedData.header.slice(1);
     // Bỏ dòng tiêu đề ['STT', 'Mã sinh viên', ...]
    const exams = approvedData.Body;
    
    const maxScoreMap = this.parseMaxScoreMap(headers);

    console.log("Exams:", exams);
    for (const exam of exams) {
      const examId = exam.id_exam;
      const students: Record<string, any>[] = exam.Data;

      // === Tạo câu hỏi song song ===
      await Promise.all(
        headers.map(async (item) => {
          console.log("==> Headers:", item);
          console.log("==> Headers type:", typeof item);
          if (typeof item === "object") {
            console.log("==> Creating question:", item);
            const questionName = Object.keys(item)[0];
            const dto: CreateQuestionDto = { question_name: questionName, exam_id: examId };
            await this.questionService.createQuestion(dto);
          }
        }),
      );

      const listQuestion = await this.questionService.getAllQuestionsByExamId(examId);
      const cloIdCache: Record<string, string> = {};

      for (const student of students) {
        console.log("==> Raw student:", student);
        console.log("==> Processing student:", student["Mã sinh viên"]);
        const studentId = String(student["Mã sinh viên"]);

        const resultPromises: Promise<any>[] = [];

        for (const key in student) {
          if (!key.startsWith("Câu")) continue;

          const cloScores = student[key];
          
          const normalizedName = normalizeQuestionName(key);
          console.log("==> Processing question:", normalizedName);
          console.log("==> CLO Scores:", cloScores);
          const question = listQuestion.find(q => q.question_name === normalizedName);

          if (!question?.id) {
            console.warn(`⚠️ Không tìm thấy question_id cho: ${normalizedName}`);
            continue;
          }

          for (const cloName in cloScores) {
            const score = Number(cloScores[cloName]);

            // Cache clo_id
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

            const resultDto: CreateResultDto = {
              student_id: studentId,
              score,
              question_id: question.id,
              clo_id,
              max_score,
            };

            console.log("==> Creating result:", resultDto);

            resultPromises.push(this.resultService.createResult(resultDto));
          }
        }

        // Gửi song song kết quả cho từng sinh viên
        await Promise.all(resultPromises);
      }
    }
  }
}
