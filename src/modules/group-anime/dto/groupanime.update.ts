import { ArrayNotEmpty, IsArray, IsOptional, IsString } from "class-validator";

export class UpdateGroupAnimeDTO {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    animeID: string[]
}