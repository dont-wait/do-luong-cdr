import { Module } from '@nestjs/common';
import { UserAccountService } from './UseAccount.service';
import { UserAccountController } from './UserAccount.controller';

@Module({
  controllers: [UserAccountController],
  providers: [UserAccountService],
})
export class UserAccountModule {}
