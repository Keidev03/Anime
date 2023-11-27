import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateGroupAnimeDTO {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    animeID: string[]
}