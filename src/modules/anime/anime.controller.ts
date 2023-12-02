import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { CreateAnimeDTO, PaginationAnimeDTO, UpdateAnimeDTO } from './dto';
import { AnimeService } from './anime.service';
import { IAnime } from './anime.schema';
import { AuthGuard } from '../../authentication/auth.guard';

@Controller('anime')
export class AnimeController {

    private readonly url: string;

    constructor(private readonly animeService: AnimeService) {
        this.url = process.env.URL
    };

    @HttpCode(HttpStatus.CREATED)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'poster', maxCount: 1 },
        { name: 'background', maxCount: 1 },
    ]))
    async PostAnime(@UploadedFiles() files: { poster: Express.Multer.File, background: Express.Multer.File }, @Body() data: CreateAnimeDTO) {
        try {
            let poster = null;
            let background = null;
            if (files?.poster) {
                poster = files.poster[0];
            }
            if (files?.background) {
                background = files?.background[0];
            }
            const result: IAnime = await this.animeService.CreateAnime(data, poster, background);
            const response: Record<string, any> = {
                Message: "Create successfully",
                Request: {
                    Type: "GET",
                    URL: `${this.url}/anime/` + result.id
                }
            }

            return response;
        }
        catch (error) {
            throw error
        }
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Patch(':id')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'poster', maxCount: 1 },
        { name: 'background', maxCount: 1 },
    ]))
    async PatchAnime(@Param('id') id: string, @UploadedFiles() files: { poster?: Express.Multer.File[], background?: Express.Multer.File[] }, @Body() data?: UpdateAnimeDTO) {
        try {
            let poster = null;
            let background = null;
            if (files?.poster) {
                poster = files.poster[0];
            }
            if (files?.background) {
                background = files?.background[0];
            }
            const result: IAnime = await this.animeService.UpdateAnime(id, data, poster, background);
            const response: Record<string, any> = {
                Message: "Patch successfully",
                Request: {
                    Type: "GET",
                    URL: `${this.url}/anime/` + result.id
                }
            }
            return response;
        } catch (error) {
            throw error
        }
    };

    @HttpCode(HttpStatus.ACCEPTED)
    @Delete(':id')
    async DeleteAnime(@Param('id') id: string) {
        try {
            const result: IAnime = await this.animeService.DeleteAnime(id);
            const response: Record<string, any> = {
                Message: "Delete successfully"
            }
            return response;
        } catch (error) {
            throw error
        }
    }

    // @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    async GetAllAnime(@Query() query: PaginationAnimeDTO, @Request() request: any) {
        try {
            console.log(request.user);
            const page = query.page || 1;
            const limit = query.limit || 20;
            const movies = await this.animeService.FindAllAnime(page, limit);
            const respone: Record<string, any> = {
                "Count": movies.length,
                "data": movies.map(movie => {
                    return {
                        id: movie.id,
                        title: movie.title,
                        anotherName: movie.anotherName,
                        description: movie.description,
                        category: movie.category,
                        totalEpisode: movie.totalEpisode,
                        namePart: movie.namePart,
                        releaseDate: movie.releaseDate,
                        updateAt: movie.updateAt,
                        imagePoster: `https://drive.google.com/uc?export=view&id=${movie.imagePoster}`,
                        imageBackground: movie.imageBackground,
                        Request: {
                            Type: "GET",
                            URL: `${this.url}/anime/` + movie.id
                        }
                    }
                })
            }
            return respone
        } catch (error) {
            throw error
        }
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async GetOneAnime(@Param('id') id: string) {
        try {
            const result: IAnime = await this.animeService.FindOneAnime(id);
            const response: Record<string, any> = {
                "data": {
                    id: result.id,
                    title: result.title,
                    anotherName: result.anotherName,
                    description: result.description,
                    category: result.category,
                    totalEpisode: result.totalEpisode,
                    namePart: result.namePart,
                    releaseDate: result.releaseDate,
                    updateAt: result.updateAt,
                    imagePoster: `https://drive.google.com/uc?export=view&id=${result.imagePoster}`,
                    imageBackground: result.imageBackground
                }
            }
            return response;
        } catch (error) {
            throw error;
        }
    }
}