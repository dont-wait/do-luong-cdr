import { IsNotEmpty, IsString, IsUUID, IsNumber, IsOptional } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  question_name: string;

  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsNumber()
  @IsNotEmpty()
  max_score: number;

  @IsUUID()
  @IsNotEmpty()
  exam_id: string;

  @IsUUID()
  @IsNotEmpty()
  clo_id: string;
}