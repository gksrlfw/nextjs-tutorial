import { UserEntity } from "src/entities/user.entity";

export interface AuthResponse extends Partial<UserEntity> {
    token: string
}