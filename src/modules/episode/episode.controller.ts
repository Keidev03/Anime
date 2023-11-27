import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { CreateEpisodeDTO, UpdateEpisodeDTO } from './dto';

@Controller('episode')
export class EpisodeController {

    constructor(private readonly episodeService: EpisodeService) { }

    @Post()
    async PostEpisode(@Body() data: CreateEpisodeDTO) {
        try {
            const result = await this.episodeService.CreateEpisode(data);
            return result
        } catch (error) {
            throw error;
        }
    }

    @Patch(':id')
    async UpdateEpisode(@Param('id') id: string, @Body() data: UpdateEpisodeDTO) {
        try {
            const result = await this.episodeService.UpdateEpisode(id, data);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    async DeleteEpisode(@Param('id') id: string) {
        try {
            const result = await this.episodeService.DeleteEpisode(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    async GetAllEpisodeAnime(@Param('id') animeID: string) {
        try {
            const result = await this.episodeService.FindAllEpisodeAnime(animeID);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Get('anime/:id')
    async GetOneEpisodeAnime(@Param('id') animeID: string, @Query('episode') episode: string) {
        try {
            const result = await this.episodeService.FindOneEpisodeAnime(animeID, episode);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
