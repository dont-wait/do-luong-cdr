import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmanDto } from './create-departman.dto';

export class UpdateDepartmanDto extends PartialType(CreateDepartmanDto) {}
