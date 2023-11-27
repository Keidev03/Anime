import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';

import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {

    constructor(private readonly categorySerice: CategoryService) { }

    @Post()
    async PostCategory(@Body('category') category: string) {
        try {
            if (!category) {
                throw new NotFoundException('No category entered')
            }
            const result = await this.categorySerice.CreateCategory(category);
            const response: Record<string, any> = {
                "data": {
                    id: result.id,
                    category: result.name
                }
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    async DeleteCategory(@Param('id') id: string) {
        try {
            console.log(id);
        } catch (error) {
            throw error;
        }
    }

    @Get()
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
