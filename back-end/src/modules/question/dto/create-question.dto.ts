import { IsString, IsNotEmpty, IsNumber, IsUUID, isUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({
    example: 'Câu hỏi 1:',
    description: 'Tên hoặc nội dung của câu hỏi',
  })  
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  question_name: string;

  @ApiProperty({
    example: '6d3c4d2e-1234-4a5b-88e1-27ff9eaf0a9b',
    description: 'ID của đề thi (UUID)',
  })
  @IsUUID()
  @IsNotEmpty()
  exam_id: string;
}
