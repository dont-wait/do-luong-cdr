import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateDegreeDto {
  @ApiProperty({
    example: 1,
    description: 'Mã ID của học vị',
  })    
  @IsNotEmpty()
  @IsNumber()
  degree_id: number;

  @ApiProperty({
    example: 'Tiến sĩ',
    description: 'Tên học vị',
  })
  @IsNotEmpty()
  @IsString()
  degree_name: string;
}

