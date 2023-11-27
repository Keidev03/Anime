import mongoose from "mongoose"

export interface IGroupAnime {
    name: string,
    animeID: string[]
}

export const GroupAnimeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    animeID: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Anime' }]
})