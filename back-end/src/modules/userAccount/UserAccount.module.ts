import { Global, Module } from '@nestjs/common';
import { UserAccountService } from './UserAccount.service';
import { UserAccountController } from './UserAccount.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [UserAccountController],
  providers: [
    UserAccountService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [UserAccountService],
})
export class UserAccountModule {}
