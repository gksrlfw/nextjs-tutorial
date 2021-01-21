import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport";
import { ExtractJwt } from "passport-jwt";
import { UserEntity } from "src/entities/user.entity";
import { AuthPayload } from "src/models/user.dto";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    // need to user repository
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
            secretOrKey: process.env.SECRET
        });
    }

    async validate(payload: AuthPayload) {
        const { username } = payload;
        const user = this.userRepo.findOne({ where: { username }});
        if(!user) throw new UnauthorizedException();
        return user;
    }
}