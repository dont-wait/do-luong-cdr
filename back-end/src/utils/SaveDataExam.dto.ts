interface CloMapping {
  [clo: string]: string[]; // ví dụ: "CLO3.1": ["2"]
}

type QuestionHeader = {
  [question: string]: CloMapping; // ví dụ: "Câu 1": { CLO3.1: ["2"] }
};

type ExamHeaderDto = Array<
  string[] | QuestionHeader // dòng đầu là array ["STT", "Mã sinh viên", ...], các dòng sau là map câu hỏi
>;

interface StudentAnswerDto {
  STT: number;
  'Mã sinh viên': number;
  'Họ đệm': string;
  'Tên': string;
  'Máy'?: string | null;
  [questionKey: string]: any; // để bắt các key như "Câu 1 (2)", "Câu 2 (3)"...
}

interface ExamBodyDto {
  exam_id: string;
  data: StudentAnswerDto[];
}

export interface FullExamDto {
  header: ExamHeaderDto;
  body: ExamBodyDto;
}

export type MultiExamDto = FullExamDto[];

