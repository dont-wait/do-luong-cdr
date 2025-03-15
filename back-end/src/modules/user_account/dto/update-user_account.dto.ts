import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAccountDto } from './create-user_account.dto';

export class UpdateUserAccountDto extends PartialType(CreateUserAccountDto) {}
