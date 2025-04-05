import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({ example: 'cls001', description: 'ID của lớp học' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'sub001', description: 'ID của môn học' })
  @IsString()
  @IsNotEmpty()
  subject_id: string;

  @ApiProperty({ example: 'lec001', description: 'ID của giảng viên' })
  @IsString()
  @IsNotEmpty()
  lecturer_id: string;
}
