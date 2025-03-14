import { PartialType } from '@nestjs/mapped-types';
import { CreateAcademicDto } from './create-academic.dto';

export class UpdateAcademicDto extends PartialType(CreateAcademicDto) {}
