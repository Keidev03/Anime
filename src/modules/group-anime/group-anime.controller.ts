import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { GroupAnimeService } from './group-anime.service';
import { CreateGroupAnimeDTO } from './dto';

@Controller('group-anime')
export class GroupAnimeController {

    private readonly url: string;

    constructor(private readonly groupAnimeService: GroupAnimeService) {
        this.url = process.env.URL;
    }

    @Post('create')
    async PostGroupAnime(@Body() data: CreateGroupAnimeDTO) {
        try {
            await this.groupAnimeService.CreateGroupAnime(data);
            const response: Record<string, any> = {
                Message: "Create successfully",
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Delete('delete/:id')
    async DeleteGroupAnime(@Param('id') id: string) {
        try {
            await this.groupAnimeService.DeleteGroupAnime(id);
            const response: Record<string, any> = {
                Message: "Delete successfully",
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Get('getall')
    async GetAllGroupAnime() {
        try {
            const results = await this.groupAnimeService.FindAllGroupAnime();
            const response: Record<string, any> = {
                "Count": results.length,
                "data": results.map(groupanime => {
                    return {
                        id: groupanime.id,
                        name: groupanime.name,
                        animeID: groupanime.animeID,
                        Request: {
                            Type: "GET",
                            URL: `/group-anime/` + groupanime.id
                        }
                    }
                })
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Get('getone/:id')
    async GetAnimeGroupAnime(@Param('id') id: string) {
        try {
            const result = await this.groupAnimeService.FindAnimeGroupAnime(id);
            const response: Record<string, any> = {
                "data": {
                    id: result.id,
                    name: result.name,
                    animeID: result.animeID
                }
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Post('updateanime/:id')
    async PatchAnimeGroupAnime(@Param('id') id: string, @Body('animeID') animeID: string) {
        try {
            const result = await this.groupAnimeService.AddAnimeGroupAnime(id, animeID);
            const response: Record<string, any> = {
                Message: "Add Anime GroupAnime successfully",
                "data": {
                    id: result.id,
                    name: result.name,
                    animeID: result.animeID,
                    Request: {
                        Type: "GET",
                        URL: `/group-anime/` + result.id
                    }
                }
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Delete('deleteanime/:id')
    async DeleteAnimeGroupAnime(@Param('id') id: string, @Body('animeID') animeID: string) {
        try {
            await this.groupAnimeService.DelAnimeGroupAnime(id, animeID);
            const response: Record<string, any> = {
                Message: "Delete Anime GroupAnime successfully",
            }
            return response;
        } catch (error) {
            throw error;
        }
    }
}
