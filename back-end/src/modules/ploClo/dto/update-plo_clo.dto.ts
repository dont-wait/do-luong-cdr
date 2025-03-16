import { PartialType } from '@nestjs/mapped-types';
import { CreatePloCloDto } from './create-plo_clo.dto';

export class UpdatePloCloDto extends PartialType(CreatePloCloDto) {}
