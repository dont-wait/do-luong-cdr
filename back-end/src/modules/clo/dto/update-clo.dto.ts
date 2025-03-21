import { PartialType } from '@nestjs/mapped-types';
import { CreateCloDto } from './create-clo.dto';

export class UpdateCloDto extends PartialType(CreateCloDto) {}
