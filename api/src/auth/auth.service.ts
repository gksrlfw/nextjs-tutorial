import { ConflictException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { LoginDTO } from 'src/models/auth/login.dto';
import { RegisterDTO } from 'src/models/auth/register.dto';
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

    // passport로부터 주입된 req.user를 활용한다
    async login(user: UserEntity) {
        const payload = { email: user.email, id: user.id, username: user.username };
        const token = this.jwtService.sign(payload);
        console.log(payload);
        return { user: { ...user.toJSON(), token } };
    }


    async login2(credentials: LoginDTO) {
        try {
            const user = await this.userRepository.findOne({ where: { email: credentials.email } });
            if(!user || !(await user.comparePassword(credentials.password))) 
                throw new UnauthorizedException('Invalid credentials in find user or compare password');

            // create token
            const payload = { username: user.username };
            const token = this.jwtService.sign(payload);
            return { user: { ...user.toJSON(), token } };
        }
        catch(err) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
    async calll(credentials) {
        const user = await this.userRepository.findOne({ where: { email: credentials.email }});
        console.log(user);
        const a = user.toJSON();
        console.log(a);
        console.log(user.toProfile());
        
    }
}
