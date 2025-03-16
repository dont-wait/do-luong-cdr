import { PartialType } from '@nestjs/mapped-types';
import { CreatePloDetailDto } from './create-plo_detail.dto';

export class UpdatePloDetailDto extends PartialType(CreatePloDetailDto) {}
