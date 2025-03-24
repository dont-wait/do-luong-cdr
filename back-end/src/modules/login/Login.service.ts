import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';
import { UserAccountService } from "../userAccount/UseAccount.service";

@Injectable()
export class LoginService {
    constructor(
        private readonly userAccount: UserAccountService,
        
    ) {}

    login(dataLogin: LoginDto) {
        const { id, password } = dataLogin;


    }
}