import { Module } from '@nestjs/common';
import { UserAccountService } from './user_account.service';
import { UserAccountController } from './user_account.controller';

@Module({
  controllers: [UserAccountController],
  providers: [UserAccountService],
})
export class UserAccountModule {}
