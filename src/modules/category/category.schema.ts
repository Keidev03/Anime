import mongoose from "mongoose"

export interface ICategory {
    name: string
}

export const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
})