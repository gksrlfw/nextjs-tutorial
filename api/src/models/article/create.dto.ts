import { IsArray, IsString } from "class-validator";

export class CreateArticleDTO {
    @IsString()
    title: string;

    @IsString()
    body: string;

    @IsString()
    description: string;

    // TODO: each: true
    @IsArray()
    @IsString({ each: true })
    tagList: string[];
}