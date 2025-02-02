import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup') // POST /auth/signup
    signup() {
        return this.authService.signup();
    }

    @Post('signin') // POST /auth/signup
    signin() {
        return this.authService.signin();
    }
}
