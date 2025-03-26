import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';
import { UserAccountService } from "../userAccount/UseAccount.service";
import { PrismaService } from "../prisma/Prisma.service";

@Injectable()
export class LoginService extends UserAccountService {
    constructor(  
        prisma: PrismaService
    ) {
        super(prisma);
    }

    public async login(dataLogin: LoginDto) {
        const { id, password } = dataLogin;

        const user = await this.getUserAccountById(id, password);
        
        return user;
    }
}