import { PartialType } from '@nestjs/mapped-types';
import { CreateDegreeDto } from './create-degree.dto';

export class UpdateDegreeDto extends PartialType(CreateDegreeDto) {}
