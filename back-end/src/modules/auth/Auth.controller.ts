import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { LoginDto } from "./dto/login.dto";
import { Public } from "src/common/decorator/public.decorator";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginService: AuthService
    ) {}

    @Public()
    @Post('login')
    async login(@Body() dataLogin: LoginDto) {
        return this.loginService.login(dataLogin);
    }
}