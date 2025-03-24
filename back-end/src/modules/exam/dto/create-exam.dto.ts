import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsUUID,
    ValidateIf,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateExamDto {
      @IsNotEmpty()
      @IsString()
      @ApiProperty({
      description: 'The name of the exam',
          example: "Final Exam"
      })
      exam_name: string;
  
      @IsOptional()
      @ValidateIf((obj) => obj.date_exam !== null) 
      @ApiProperty({
      description:
        'The date of the exam (ISO 8601 format). Defaults to today if not provided.',
          example: "2025-03-30T14:00:00.000Z",
          nullable: true
      })
      date_exam?: string | null; 
  
      @IsNotEmpty()
      @ApiProperty({
      description: 'The unique identifier of the class',
          example: "010100347315_01001051_ST2"
      })
      class_id: string;
  }