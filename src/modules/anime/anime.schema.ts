import mongoose from "mongoose"

export interface IAnime {
    id: string,
    title: string
    anotherName: string[],
    description: string,
    category: string[],
    totalEpisode: string,
    namePart: string,
    releaseDate: Date,
    updateAt: Date,
    imagePoster: string,
    imageBackground: string
}

export const AnimeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    anotherName: { type: [String], required: true },
    description: { type: String, required: true },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],
    namePart: { type: String, required: true },
    releaseDate: { type: Date, required: true, timezone: 'Asia/Ho_Chi_Minh' },
    imagePoster: { type: String, required: true },
    imageBackground: { type: String, required: true },

    // Optional--------------------------

    totalEpisode: { type: String },
    updateAt: { type: Date },
})