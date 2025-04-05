import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserAccountService } from '../userAccount/UserAccount.service';
import { PrismaService } from '../prisma/Prisma.service';

@Injectable()
export class AuthService extends UserAccountService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  public async login(dataLogin: LoginDto) {
    const { id, password } = dataLogin;

    const user = await this.getUserAccountById(id, password);

    return user;
  }
}
