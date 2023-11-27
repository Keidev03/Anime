import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICategory } from './category.schema';

@Injectable()
export class CategoryService {
    constructor(@InjectModel('Category') private readonly categoryModel: Model<ICategory>) { }

    async CreateCategory(category: string) {
        try {
            const checkCategory = await this.categoryModel.findOne({ name: category });
            if (checkCategory) {
                throw new ConflictException("This genre already exists")
            }
            const dataInsert = new this.categoryModel({ name: category });
            const result = await dataInsert.save();
            return result;
        } catch (error) {
            throw error
        }
    }

    async DeleteCategory(id: string) {
        try {
            const category = await this.categoryModel.findByIdAndDelete(id);
            return category;
        } catch (error) {
            throw error;
        }
    }

    async FindAllCategory() {
        try {
            const categories = await this.categoryModel.find();
            if (categories.length < 1) {
                throw new NotFoundException("Categories not found");
            }
            return categories;
        } catch (error) {
            throw error;
        }
    }

    async FindOneCategory(id: string) {
        try {
            const category = await this.categoryModel.findById(id);
            if (!category) {
                throw new NotFoundException("Categories not found");
            }
            return category;
        } catch (error) {
            throw error;
        }
    }

    async CheckAllCategoryById(ids: string[]) {
        try {
            const legnth = ids.length;
            const categories = await this.categoryModel.find({ _id: { $in: ids } });
            if (categories.length < legnth) {
                return false;
            }
            return true;
        } catch (error) {
            throw error;
        }
    }
}
