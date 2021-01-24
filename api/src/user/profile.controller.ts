import { Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorator/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/auth-jwt.guard';
import { UserService } from './user.service';

@Controller('profile')
export class ProfileController {
    constructor(private userService: UserService) {}

    @Get('/:username')
    async findProfile(@Param('username') username: string) {
        const profile = await this.userService.findByUsername(username);
        if(!profile) throw new NotFoundException();
        return { profile };
    }

    @Post('/:username/follow')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async followUser(@User() user: UserEntity, @Param('username') username: string) {
        const profile = await this.userService.followUser(user, username);
        return { profile };
    }

    @Delete('/:username/follow')
    @UseGuards(JwtAuthGuard)
    async unfollowUser(@User() user: UserEntity, @Param('username') username: string) {
        const profile = await this.userService.unfollowUser(user, username);
        return { profile };
    }

    @Get('')
    @UseGuards(JwtAuthGuard)
    async getFollowers(@User() user: UserEntity) {
        return this.userService.getFollowers(user);
    }
}
