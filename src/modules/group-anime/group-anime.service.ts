import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IGroupAnime } from './group-anime.schema';
import { CreateGroupAnimeDTO } from './dto';

@Injectable()
export class GroupAnimeService {

    constructor(@InjectModel('GroupAnime') private readonly groupAnimeModel: Model<IGroupAnime>) { }

    async CreateGroupAnime(data: CreateGroupAnimeDTO) {
        const dataInsert = new this.groupAnimeModel({
            name: data.name,
            animeID: data.animeID,
        })
        const result = await dataInsert.save();
        return result;
    }

    async DeleteGroupAnime(id: string) {
        try {
            const groupanime = await this.groupAnimeModel.findByIdAndDelete(id);
            if (!groupanime) {
                throw new NotFoundException('Group Anime not found');
            }
            return groupanime;
        } catch (error) {
            throw error;
        }
    }

    async AddAnimeGroupAnime(id: string, animeID: string) {
        try {
            const groupanime = await this.groupAnimeModel.findById(id);
            if (!groupanime) {
                throw new NotFoundException('Group Anime not found');
            }
            if (animeID) {
                groupanime.animeID = [...groupanime.animeID, animeID]
            }

            const updatedGroupAnime = await groupanime.save();
            return updatedGroupAnime;
        } catch (error) {
            throw error;
        }
    }

    async DelAnimeGroupAnime(id: string, animeID: string) {
        try {
            const groupanime = await this.groupAnimeModel.findById(id);
            const newArrayAnimeId = groupanime.animeID.filter(value => value.toString() !== animeID);
            const result = await groupanime.updateOne({ animeID: newArrayAnimeId });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async FindAllGroupAnime() {
        try {
            const groupanimes = await this.groupAnimeModel.find().populate({
                path: 'animeID', populate: { path: 'category', select: 'name' }
            });
            if (groupanimes.length < 1) {
                throw new NotFoundException('Group Anime not found')
            }
            return groupanimes;
        } catch (error) {
            throw error;
        }
    }

    async FindAnimeGroupAnime(animeID: string) {
        try {
            const groupanime = await this.groupAnimeModel.findOne({ animeID: animeID }).populate({ path: 'animeID' });
            if (!groupanime) {
                throw new NotFoundException('Anime not found');
            }
            return groupanime;
        } catch (error) {
            throw error;
        }
    }
}
