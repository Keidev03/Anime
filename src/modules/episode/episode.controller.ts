import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { CreateEpisodeDTO, UpdateEpisodeDTO } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('episode')
export class EpisodeController {

    constructor(private readonly episodeService: EpisodeService) { }

    @Post()
    async PostEpisode(@Body() data: CreateEpisodeDTO) {
        try {
            const result = await this.episodeService.CreateEpisode(data);
            const response: Record<string, any> = {
                Message: 'Create successfully',
                Request: {
                    Type: "GET",
                    URL: `/episode/` + result.animeID
                }

            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Post('csv')
    @UseInterceptors(FileInterceptor('csv'))
    async PostEpisodeCSV(@UploadedFile() file: Express.Multer.File) {
        try {
            const result = await this.episodeService.CreateManyEpisode(file);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Patch(':id')
    async UpdateEpisode(@Param('id') id: string, @Body() data: UpdateEpisodeDTO) {
        try {
            const result = await this.episodeService.UpdateEpisode(id, data);
            const response: Record<string, any> = {
                Message: 'Update successfully',
                Request: {
                    Type: "GET",
                    URL: `/episode/` + result.animeID
                }
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    async DeleteEpisode(@Param('id') id: string) {
        try {
            const result = await this.episodeService.DeleteEpisode(id);
            const response: Record<string, any> = {
                Message: 'Delete successfully',
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    async GetAllEpisodeAnime(@Param('id') animeID: string) {
        try {
            const episodes = await this.episodeService.FindAllEpisodeAnime(animeID);
            const response: Record<string, any> = {
                "Count": episodes.length,
                "data": episodes.map(episode => {
                    return {
                        id: episode.id,
                        animeID: episode.animeID,
                        episode: episode.episode,
                        duration: episode.duration,
                        releaseDate: episode.releaseDate,
                        server: [episode.serverDrive, episode.serverHelvid, episode.serverHydrax, episode.serverDaily],
                        Request: {
                            Type: "GET",
                            URL: `/episode/` + episode.animeID
                        }
                    }
                })
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Get('anime/:id')
    async GetOneEpisodeAnime(@Param('id') animeID: string, @Query('episode') episode: string) {
        try {
            const result = await this.episodeService.FindOneEpisodeAnime(animeID, episode);
            const response: Record<string, any> = {
                "data": {
                    id: result.id,
                    animeID: result.animeID,
                    episode: result.episode,
                    duration: result.duration,
                    releaseDate: result.releaseDate,
                    server: [result.serverDrive, result.serverHelvid, result.serverHydrax, result.serverDaily]
                }
            }
            return response;
        } catch (error) {
            throw error;
        }
    }
}
