import { PartialType } from '@nestjs/mapped-types';
import { CreateLecturerDto } from './create-lecturer.dto';

export class UpdateLecturerDto extends PartialType(CreateLecturerDto) {}
