import { ConflictException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}

    async register(credentials: RegisterDTO) {
        try {
            const user = this.userRepository.create(credentials);
            await user.save();
            // create token
            const payload = { username: user.username };
            const token = this.jwtService.sign(payload);
            return  { user: { ...user.toJSON(), token } };
        }
        catch(err) {
            if(err.code === '23505')
                throw new ConflictException('Username has already been taken');
            throw new InternalServerErrorException();
        }
    }

    async login(credentials: LoginDTO) {
        try {
            const user = await this.userRepository.findOne({ where: { email: credentials.email } });
            if(!user || !(await user.comparePassword(credentials.password))) 
                throw new UnauthorizedException('Invalid credentials');

            // create token
            const payload = { username: user.username };
            const token = this.jwtService.sign(payload);
            return { user: { ...user.toJSON(), token } };
        }
            catch(err) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
