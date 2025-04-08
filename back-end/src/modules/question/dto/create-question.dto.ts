import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({
    example: 'Câu hỏi 1:',
    description: 'Tên hoặc nội dung của câu hỏi',
  })
  @IsString()
  @IsNotEmpty()
  question_name: string;

  // @ApiProperty({
  //   example: '...',
  //   description: 'Câu trả lời mẫu hoặc đáp án tham khảo',
  // })
  // @IsString()
  // @IsNotEmpty()
  // answer: string;

  @ApiProperty({
    example: 5,
    description: 'Điểm tối đa cho câu hỏi',
  })
  @IsNumber()
  @IsNotEmpty()
  max_score: number;

  @ApiProperty({
    example: '6d3c4d2e-1234-4a5b-88e1-27ff9eaf0a9b',
    description: 'ID của đề thi (UUID)',
  })
  @IsUUID()
  @IsNotEmpty()
  exam_id: string;

  @ApiProperty({
    example: '2a4b8c7e-bf90-4d5a-ae19-f2f7d20ac3a0',
    description: 'ID của chuẩn đầu ra chi tiết (CLO) liên kết',
  })
  @IsUUID()
  @IsNotEmpty()
  clo_id: string;
}
