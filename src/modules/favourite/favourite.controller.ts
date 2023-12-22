import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('favourite')
@UseGuards(AuthGuard)
export class FavouriteController {
    constructor(private readonly favouriteService: FavouriteService) { }

    @Post(':id')
    async PostAnimeFavourite(@Req() req: any, @Param('id') animeID: string) {
        try {
            const result = await this.favouriteService.AddAnimeFavourite(req.user.id, animeID);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    async DeleteAnimeFavourite(@Req() req: any, @Param('id') animeID: string) {
        try {
            const result = await this.favouriteService.DeleteAnimeFavourite(req.user.id, animeID);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Get()
    async GetAllFavourite(@Req() req: any) {
        try {
            const result = await this.favouriteService.FindAllFavourite(req.user.id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
