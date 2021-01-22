import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/decorator/user.decorator';
import { JwtAuthGuard } from 'src/guards/auth-jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    findCurrentUser(@User() user: any) {
        return this.userService.findByUsername(user.username);
    }
}
