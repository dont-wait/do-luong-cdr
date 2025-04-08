import { Module } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { AuthController } from './Auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { UserAccountModule } from '../userAccount/UserAccount.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';

@Module({
  imports: [
    UserAccountModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  exports: [AuthService]
})

export class AuthModule {}