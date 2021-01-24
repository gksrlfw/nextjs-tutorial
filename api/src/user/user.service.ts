import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDTO } from 'src/models/auth/update.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}


    async findByUsername(username: string): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { username }});
    }

    async updateUser(username: string, data: UpdateUserDTO) {
        await this.userRepository.update({ username }, data);
        return this.findByUsername(username);
    }

    async followUser(currentUser: UserEntity, username: string) {
        const user = await this.userRepository.findOne({ where: { username }, relations: ['followers']});
        user.followers.push(currentUser);   // ??... followers.push 하는게 무슨 의미가 잇는거지??.. 디비에 추가될거같지는 않는데..
        await user.save();
        return user.toProfile(currentUser);
    }

    async unfollowUser(currentUser: UserEntity, username: string) {
        const user = await this.userRepository.findOne({ where: { username }, relations: ['followers']});
        user.followers = user.followers.filter(follower => follower !== currentUser);
        await user.save();
        return user.toProfile(currentUser);
    }

    async getFollowers(curUser: UserEntity) {
        const user = await this.userRepository.findOne({ where: { email: curUser.email }, relations: ['followee']});
        console.log(user);
        return user.followee;
    }
}
