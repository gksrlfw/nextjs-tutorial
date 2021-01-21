import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exception } from 'console';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

    async showAllUsers(): Promise<UserDTO[]> {
        Logger.log(this.userRepository.find());
        return await this.userRepository.find();
    }

    async create(user: UserDTO): Promise<UserDTO> {
        return await this.userRepository.save(user);
    }

    async findOne(id: number): Promise<UserDTO> {
        return await this.userRepository.findOne(id);
    }

    async update(id: number, user: Partial<UserDTO>): Promise<UserDTO> {
        let fUser: UserDTO = await this.findOne(id);
        if(!fUser) throw new HttpException(`User not found: ${id}`, HttpStatus.NOT_FOUND);
        await this.userRepository.update({ id }, user);
        return fUser;
    }

    async remove(id: number): Promise<Object> {
        await this.userRepository.delete(id);
        return { message: 'success' };
    }
}
