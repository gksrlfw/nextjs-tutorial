import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/auth-jwt.guard';
import { LocalAuthGuard } from 'src/guards/auth-local.guard';
import { LoginDTO } from 'src/models/auth/login.dto';
import { RegisterDTO } from 'src/models/auth/register.dto';
import { AuthService } from './auth.service';
import { User } from '../decorator/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { ResponseObject } from 'src/models/response.dto';
import { AuthResponse } from 'src/models/auth/response.dto';

@Controller('users')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async register(@Body() credentials: { user: RegisterDTO }) {
        const user = await this.authService.register(credentials.user);
        return { user };
    }

    //@UseGuards(AuthGuard('local'))  // selected localstrategy
    // It is exactly same with upon. It executed local strategy's validation and that inserted user in request.
    @UseGuards(LocalAuthGuard)        
    @Post('/login')
    async login(@Body() credentials: { user: LoginDTO }, @User() users: UserEntity, @Request() req)
    : Promise<ResponseObject<'user', AuthResponse>> {
        // @Request req를 매개변수로 하여, req.user로 받아도 되지만 여기서는 decorator를 만들어서 사용했다
        const user = await this.authService.login(users);
        return { user };
    }

    // 로그인이 필요한 작업은 JwtGuard를 통과해야 한다!
    @UseGuards(JwtAuthGuard)        
    @Get('/test')
    calll(@User() user: UserEntity) {
        console.log(user);
        
        return this.authService.calll(user);
    }
}
