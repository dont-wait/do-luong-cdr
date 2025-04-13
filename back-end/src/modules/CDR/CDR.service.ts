import { Injectable } from "@nestjs/common";
import { ExamService } from "../exam/Exam.service";
import { QuestionService } from "../question/Question.service";
import { ResultService } from "../result/Result.service";
import { PrismaService } from "../prisma/Prisma.service";

@Injectable()
export class CDRService {

  constructor(
    private readonly examService: ExamService,
    private readonly questionService: QuestionService,
    private readonly resultService: ResultService,
    private readonly prisma: PrismaService) {}
    
  public async gradingForStudents(id_class: string){

    const exams = await this.examService.getExamsByClassId(id_class);
    const id_exams = exams.map((exam) => exam.id);

    const id_questions = await this.questionService.getQuestionIdsByExamIds(id_exams);

    const results = await this.resultService.getResultByQuestionIds(id_questions);

    const allClos = await this.prisma.clo.findMany();

  const cloMap = new Map<string, { id: string; name: string; parentId: string | null }>(
    allClos.map(clo => [
      clo.id,
      { id: clo.id, name: clo.clo_name, parentId: clo.clo_parent_id }
    ])
  );

  const resultMap = new Map<string, {
    student_id: string;
    clos: Record<string, { score: number; max_score: number }>;
  }>();


  for (const result of results) {
    const { student_id, score, max_score, clo } = result;

    if (!clo?.id || !student_id || score == null || max_score == null) {
      console.warn(`Bỏ qua kết quả không hợp lệ: student_id=${student_id}, clo_id=${clo?.id}`);
      continue;
    }

    if (score < 0 || max_score <= 0 || score > max_score) {
      console.warn(`Điểm không hợp lệ: student_id=${student_id}, score=${score}, max_score=${max_score}`);
      continue;
    }

    const currentClo = cloMap.get(clo.id);
    if (!currentClo?.name) {
      console.warn(`CLO không tồn tại trong cloMap: clo_id=${clo.id}`);
      continue;
    }

    let parentCloName: string;
    if (currentClo.parentId == null) {
      parentCloName = currentClo.name;
    } else {
      const parentClo = cloMap.get(currentClo.parentId);
      if (!parentClo?.name) {
        continue;
      }
      parentCloName = parentClo.name;
    }
    if (!resultMap.has(student_id)) {
      resultMap.set(student_id, {
        student_id,
        clos: {}
      });
    }

    const studentData = resultMap.get(student_id)!;
    if (!studentData.clos[parentCloName]) {
      studentData.clos[parentCloName] = {
        score: 0,
        max_score: 0
      };
    }
    const cloData = studentData.clos[parentCloName];
    cloData.score += score;
    cloData.max_score += max_score;

  }
  const formattedResults = Array.from(resultMap.values()).map(student => {
    const { student_id, clos } = student;

    let allClosPassed = true;
    let totalScore = 0;
    let cloCount = 0;

    for (const cloName of Object.keys(clos)) {
      const clo = clos[cloName];
      const percentage = (clo.score / clo.max_score) * 100;
      if (percentage <= 40) {
        allClosPassed = false;
      }
      totalScore += clo.score;
      cloCount += 1;
    }
    const gpa = cloCount > 0 ? Number((totalScore / cloCount).toFixed(2)) : 0;

    const isGpaPassed = gpa >= 4;
    const classification = isGpaPassed && allClosPassed ? "Đạt" : "Không Đạt";
    return {
      student_id,
      ...clos,
      classification,
      GPA: gpa,
    };
  });

  return {
    statusCode: 200,
    message: "Success",
    data: formattedResults
  };
}
}
