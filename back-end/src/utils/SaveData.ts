import { CreateResultDto } from 'src/modules/result/dto/create-result.dto';
import { ResultService } from 'src/modules/result/Result.service';
import { CreateQuestionDto } from 'src/modules/question/dto/create-question.dto';
import { QuestionService } from 'src/modules/question/Question.service';
import { CloService } from 'src/modules/clo/Clo.service';
import { StudentService } from 'src/modules/student/Student.service';
import { ExamService } from 'src/modules/exam/Exam.service';
import { BadRequestException } from '@nestjs/common';
import { CreateStudentDto } from 'src/modules/student/dto/create-student.dto';
import { MultiExamDto } from './SaveDataExam.dto';

export class SaveData {
  constructor(
    private readonly resultService: ResultService,
    private readonly questionService: QuestionService,
    private readonly cloService: CloService,
    private readonly studentService: StudentService,
    private readonly examService: ExamService,
  ) {}

  public async saveMultiExamData(multiExamData: MultiExamDto): Promise<void> {
    for (const [idx, exam] of multiExamData.entries()) {
      const { header, body } = exam;
      const [studentInfo, ...questionObjectList] = header;
      const { exam_id, data } = body;

      if (!Array.isArray(studentInfo) || studentInfo.length < 4) {
        throw new BadRequestException('Thông tin sinh viên không hợp lệ.');
      }

      const maSV = studentInfo[1];
      const ho = studentInfo[2];
      const ten = studentInfo[3];

      // Lưu thông tin sinh viên trong vòng lặp đầu tiên
      if (idx === 0) {
        await Promise.all(
          data.map(async (student) => {
            const studentId = String(student[maSV]);
            const lastName = String(student[ho]);
            const firstName = String(student[ten]);

            const studentDto: CreateStudentDto = {
              id: studentId,
              last_name: lastName,
              first_name: firstName,
            };

            // Lưu thông tin sinh viên
            await this.studentService.createStudent(studentDto);
          }),
        );
      }

      // Lưu câu hỏi và điểm của từng sinh viên cho câu hỏi đó
      for (const questionObject of questionObjectList) {
        const questionNames = Object.keys(questionObject);

        for (const questionName of questionNames) {
          const questionDto: CreateQuestionDto = {
            exam_id: exam_id,
            question_name: questionName,
          };

          // Lưu thông tin câu hỏi
          await this.questionService.createQuestion(questionDto);

          // Lấy ra các CLO của câu hỏi hiện tại
          const cloPoints = questionObject[questionName] as {
            [cloName: string]: string[];
          };

          const maxScores: { [cloName: string]: number } = {};
          for (const [cloName, points] of Object.entries(cloPoints)) {
            if (!Array.isArray(points)) {
              throw new BadRequestException(
                `Expected points to be an array for CLO: ${cloName}`,
              );
            }

            const totalPoints = points.reduce(
              (sum, point) => sum + Number(point),
              0,
            );
            maxScores[cloName] = totalPoints;
          }

          // Tính điểm tối đa của câu hỏi hiện tại
          const totalMaxCloScore = Object.values(maxScores).reduce(
            (sum, score) => sum + score,
            0,
          );

          // Lấy CLO IDs
          const cloIds: Record<string, string> = {};
          const cloNames = Object.keys(cloPoints);

          await Promise.all(
            cloNames.map(async (cloName) => {
              if (!cloIds[cloName]) {
                try {
                  cloIds[cloName] =
                    await this.cloService.getCloIdByName(cloName);
                } catch {
                  throw new BadRequestException(
                    `Không tìm thấy CLO "${cloName}"`,
                  );
                }
              }
            }),
          );

          // Lấy danh sách câu hỏi để tìm ID
          const listQuestions =
            await this.questionService.getAllQuestionsByExamId(exam_id);
          const questionId = listQuestions.find(
            (question) => question.question_name === questionName,
          )?.id;

          if (!questionId) {
            throw new BadRequestException(
              `Không tìm thấy câu hỏi "${questionName}"`,
            );
          }

          // Lặp qua các sinh viên và lưu kết quả
          await Promise.all(
            data.map(async (student) => {
              const cloScores = student[
                `${questionName} (${totalMaxCloScore})`
              ] as {
                [cloName: string]: number;
              };

              await Promise.all(
                cloNames.map(async (cloName) => {
                  const resultDto: CreateResultDto = {
                    score: cloScores[cloName],
                    student_id: String(student[maSV]),
                    question_id: questionId,
                    clo_id: cloIds[cloName],
                    max_score: maxScores[cloName],
                  };

                  await this.resultService.createResult(resultDto);
                }),
              );
            }),
          );
        }
      }
    }
  }
}
