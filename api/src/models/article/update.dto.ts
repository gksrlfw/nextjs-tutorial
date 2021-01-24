import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateArticleDTO {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    body: string;

    @IsString()
    @IsOptional()
    description: string;

    // TODO: each: true
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tagList: string[];
}