import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    @UsePipes(ValidationPipe)
    register(@Body() credentials: RegisterDTO) {
        return this.authService.register(credentials);
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() credentials: LoginDTO) {
        return this.authService.login(credentials);
    }
}
