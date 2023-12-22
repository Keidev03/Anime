import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IReview } from './review.schema';

@Injectable()
export class ReviewService {
    constructor(@InjectModel('Review') private readonly reviewModel: Model<IReview>) { }
    async CreateReview(userID: string, animeID: string, review: string) {
        try {
            const dataInsert = new this.reviewModel({
                userID: userID,
                animeID: animeID,
                review: review
            });
            const result = await dataInsert.save();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async UpdateReview(userID: string, animeID: string, review: string, time: Date) {
        try {
            const updatedReview = await this.reviewModel.findOneAndUpdate(
                { userID: userID, animeID: animeID, reviewTime: time },
                { $set: { review: review } },
                { new: true }
            );
            if (!updatedReview) {
                throw new NotFoundException('Review not found');
            }
            return updatedReview;
        } catch (error) {
            throw error;
        }
    }

    async FindReviewAnime(animeID: string) {
        try {
            const result = await this.reviewModel.find({ animeID: animeID });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async FindReviewUser(userID: string) {
        try {
            const result = await this.reviewModel.find({ userID: userID });
            return result;
        } catch (error) {
            throw error;
        }
    }
}
