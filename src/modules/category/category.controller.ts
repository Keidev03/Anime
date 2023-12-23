import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';

import { CategoryService } from './category.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('category')
export class CategoryController {

    constructor(private readonly categorySerice: CategoryService) { }

    @Post('create')
    @UseGuards(AuthGuard, AdminGuard)
    async PostCategory(@Body('category') category: string) {
        try {
            if (!category) {
                throw new NotFoundException('No category entered')
            }
            const result = await this.categorySerice.CreateCategory(category);
            const response: Record<string, any> = {
                Message: `Create category ${result.name} successfully`,
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard, AdminGuard)
    async DeleteCategory(@Param('id') id: string) {
        try {
            console.log(id);
        } catch (error) {
            throw error;
        }
    }

    @Get('getall')
    async GetAllCategory() {
        try {
            const categories = await this.categorySerice.FindAllCategory();
            const response: Record<string, any> = {
                "Count": categories.length,
                "data": categories.map(category => {
                    return {
                        id: category.id,
                        category: category.name
                    }
                })

            }
            return response;
        } catch (error) {
            throw error;
        }
    }
}
