import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsArray } from "class-validator";

export class CreateCloDto {
  @ApiProperty({
    description: 'CLO name',
    type: String,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  clo_name: string;

  @ApiProperty({
    description: 'CLO content',
    type: String,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  clo_content: string;

  @ApiProperty({
    description: 'CLO parent ID',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  clo_parent_id?: string;

  @ApiProperty({
    description: 'Subject ID',
    type: String,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  subject_id: string;

  @ApiProperty({
    description: 'Array of Plo IDs',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ploIds: string[];
}