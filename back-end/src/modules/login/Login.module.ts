import { Module } from '@nestjs/common';
import { LoginService } from './Login.service';
import { LoginController } from './Login.controller';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService]
})
export class LoginModule {}
