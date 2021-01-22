import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/decorator/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/auth-jwt.guard';
import { UpdateUserDTO } from 'src/models/auth/update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    findCurrentUser(@User() user: UserEntity) {
        return this.userService.findByUsername(user.username);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    updateUser(@User() { username }: UserEntity, @Body() data: UpdateUserDTO) {
        return this.userService.updateUser(username, data);
    }
}
