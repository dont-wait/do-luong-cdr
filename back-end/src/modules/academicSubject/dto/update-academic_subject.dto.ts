import { PartialType } from '@nestjs/mapped-types';
import { CreateAcademicSubjectDto } from './create-academic_subject.dto';

export class UpdateAcademicSubjectDto extends PartialType(CreateAcademicSubjectDto) {}
