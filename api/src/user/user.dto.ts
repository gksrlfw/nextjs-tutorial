import { IsString } from "class-validator";

export class UserDTO {
    @IsString()
    readonly email: string;

    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;
}