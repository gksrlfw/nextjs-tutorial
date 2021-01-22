import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    // need to user repository
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),   // Authenticate: Token <token>
            secretOrKey: process.env.SECRET,
            ignoreExpiration: false         // jwt가 만료되지 않았음을 보증 -> 만료되었으면 401 response
        });
    }

    async validate(payload: any) {
        return { email: payload.email, id: payload.id, username: payload.username };
    }
}