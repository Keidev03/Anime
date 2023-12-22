import mongoose from "mongoose"

export interface IReview {
    userID: string,
    animeID: string,
    review: string,
    reviewTime: Date
}

export const ReviewSchema = new mongoose.Schema({
    userID: { type: mongoose.Types.ObjectId, require: true },
    animeID: { type: mongoose.Types.ObjectId, require: true },
    review: { type: String, require: true },
    reviewTime: { type: Date, default: new Date(), timezone: 'Asia/Ho_Chi_Minh' }
})
ReviewSchema.index({ userID: 1, animeID: 1, reviewTime: 1 });