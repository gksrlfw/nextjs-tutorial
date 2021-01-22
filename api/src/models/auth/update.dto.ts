import { IsEmail, IsOptional } from "class-validator";

export class UpdateUserDTO {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsOptional()
    image: string;

    @IsOptional()
    bio: string;
}