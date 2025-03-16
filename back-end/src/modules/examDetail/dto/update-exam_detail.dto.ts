import { PartialType } from '@nestjs/mapped-types';
import { CreateExamDetailDto } from './create-exam_detail.dto';

export class UpdateExamDetailDto extends PartialType(CreateExamDetailDto) {}
