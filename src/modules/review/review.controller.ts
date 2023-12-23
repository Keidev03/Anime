import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('review')
export class ReviewController {

    constructor(private readonly reviewService: ReviewService) { }

    @UseGuards(AuthGuard)
    @Post('create/:animeID')
    async PostReview(@Req() req: any, @Param('animeID') animeID: string, @Body('review') review: string) {
        try {
            await this.reviewService.CreateReview(req.user.id, animeID, review);
            const response: Record<string, any> = {
                Message: "Create successfully",
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(AuthGuard)
    @Put('update/:animeID/:reviewID')
    async PutReview(@Req() req: any, @Param('animeID') animeID: string, @Param('reviewID') reviewID: string, @Body('review') review: string) {
        try {
            const result = await this.reviewService.UpdateReview(req.user.id, animeID, reviewID, review);
            const response: Record<string, any> = {
                Message: "Update successfully",
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Get('anime/:animeID')
    async GetReviewAnime(@Param('animeID') animeID: string) {
        try {
            const results = await this.reviewService.FindReviewAnime(animeID)
            const response: Record<string, any> = {
                "count": results.length,
                "data": results.map(result => {
                    return {
                        review: result.review,
                        time: result.reviewTime
                    }
                })
            }
            return response;
        } catch (error) {
            throw error;
        }
    }
    @UseGuards(AuthGuard)
    @Get('user')
    async GetReviewUser(@Req() req: any) {
        try {
            const results = await this.reviewService.FindReviewUser(req.user.id);
            const response: Record<string, any> = {
                "count": results.length,
                "data": results.map(result => {
                    return {
                        review: result.review,
                        time: result.reviewTime
                    }
                })
            }
            return response;
        } catch (error) {
            throw error;
        }
    }
}
