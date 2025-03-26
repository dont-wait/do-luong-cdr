import { Body, Controller, Post } from "@nestjs/common";
import { LoginService } from "./Login.service";
import { LoginDto } from "./dto/login.dto";

@Controller('login')
export class LoginController {
    constructor(
        private readonly loginService: LoginService
    ) {}

    @Post()
    async login(@Body() dataLogin: LoginDto) {
        return this.loginService.login(dataLogin);
    }
}