import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) { }
    @Post(':id')
    async PostRating(@Req() req: any, @Param('id') animeID: string, @Body('rating') rating: number) {
        const result = await this.ratingService.CreateRating(req.user.id, animeID, rating);
        return result;
    }
    @Delete()
    async DeleteRating(@Req() req: any, @Param('id') animeID: string) {
        const result = await this.ratingService.DeleteRating(req.user.id, animeID);
        return result;
    }
    @Get(':id')
    async GetRatingAnime(@Param('id') animeID: string) {
        const result = await this.ratingService.FindRatingAnime(animeID);
        return result;
    }
}
