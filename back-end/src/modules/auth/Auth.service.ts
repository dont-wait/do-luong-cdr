import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserAccountService } from '../userAccount/UserAccount.service';
import { PrismaService } from '../prisma/Prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService extends UserAccountService {
  constructor(
    prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    super(prisma);
  }

  public async login(dataLogin: LoginDto) {
    const { id, password } = dataLogin;

    const user = await this.getUserAccountById(id, password);

    return user;
  }
}
