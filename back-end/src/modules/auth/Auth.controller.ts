import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { LoginDto } from "./dto/login.dto";
import { Public } from "src/common/decorator/public.decorator";
import { CookiesInterceptor } from "src/common/interceptors/Cookies.interceptor";
import { HidePasswordInterceptor } from "src/common/interceptors/HidePassword.interceptor";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginService: AuthService
    ) {}

    @Public()
    @Post('login')
    @UseInterceptors(CookiesInterceptor, HidePasswordInterceptor)
    async login(@Body() dataLogin: LoginDto) {
        return await this.loginService.login(dataLogin);
    }
}