import { Global, Module } from '@nestjs/common';
import { UserAccountService } from './UserAccount.service';
import { UserAccountController } from './UserAccount.controller';

@Global()
@Module({
  controllers: [UserAccountController],
  providers: [UserAccountService],
  exports: [UserAccountService]
})
export class UserAccountModule {}
