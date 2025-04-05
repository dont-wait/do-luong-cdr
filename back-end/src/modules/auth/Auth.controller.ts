import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginService: AuthService
    ) {}

    @Post('login')
    async login(@Body() dataLogin: LoginDto) {
        return this.loginService.login(dataLogin);
    }
}