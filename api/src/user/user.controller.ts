import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    showAllUsers() {
        Logger.log('hello');
        return this.userService.showAllUsers();
    }

    @Get(':id')
    findOne(@Param() id: number) {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() user: UserDTO) {
        return this.userService.create(user);
    }

    @Put(':id')
    update(@Param() id: number, @Body() user: Partial<UserDTO>) {
        return this.userService.update(id, user);
    }

    @Delete(':id')
    remove(@Param() id: number) {
        return this.userService.remove(id);
    }
}
