import { Type } from 'class-transformer';
import { IsArray, IsObject, IsString, ValidateNested } from 'class-validator';

// Dạng mapping cho từng CLO của câu hỏi
export type CLOMapping = { [clo: string]: string[] };

// Dạng câu hỏi có CLOs
export type QuestionHeader = { [questionName: string]: CLOMapping };

// Header có thể là chuỗi hoặc object chứa câu hỏi + CLO mapping
export type HeadersFormat = (string[] | QuestionHeader)[];

export class ExamBodyDto {
  @IsString()
  id_exam: string;

  @IsArray()
  @ValidateNested({ each: true })
  Data: Record<string, any>[];
}

export class ApproveDataDto {
  @IsArray()
  header: HeadersFormat;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExamBodyDto)
  Body: ExamBodyDto[];
}
