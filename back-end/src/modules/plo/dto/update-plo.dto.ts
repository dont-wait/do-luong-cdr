import { PartialType } from '@nestjs/mapped-types';
import { CreatePloDto } from './create-plo.dto';

export class UpdatePloDto extends PartialType(CreatePloDto) {}
