import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IEpisode } from './episode.schema';
import { CreateEpisodeDTO, UpdateEpisodeDTO } from './dto';

@Injectable()
export class EpisodeService {

    constructor(@InjectModel('Episode') private readonly episodeModel: Model<IEpisode>) { }

    async CreateEpisode(data: CreateEpisodeDTO) {
        try {
            const dataInsert = new this.episodeModel({
                animeID: data.animeID,
                episode: data.episode,
                duration: data.duration,
                releaseDate: data.releaseDate,
                serverDrive: data.serverDrive,
                serverHydrax: data.serverHydrax,
                serverHelvid: data.serverHelvid,
                server: data.server,
            });
            const result = await dataInsert.save();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async UpdateEpisode(id: string, data: UpdateEpisodeDTO) {
        try {
            const episode = await this.episodeModel.findById(id);
            if (!episode) {
                throw new NotFoundException('Episode not found');
            }
            const result = episode.updateOne(data);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async DeleteEpisode(id: string) {
        try {
            const result = await this.episodeModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async FindAllEpisodeAnime(animeID: string) {
        try {
            const result = await this.episodeModel.find({ animeID: animeID }).populate({ path: 'animeID', select: 'title' });
            if (!result) {
                throw new NotFoundException('The anime has not been shown yet')
            };
            return result;
        } catch (error) {
            throw error;
        }
    }

    async FindOneEpisodeAnime(animeID: string, episode: string) {
        try {
            const result = await this.episodeModel.findOne({ animeID: animeID, episode: episode }).populate({ path: 'animeID', select: 'title' });
            if (!result) {
                throw new NotFoundException('The anime has not been shown yet')
            };
            return result;
        } catch (error) {
            throw error;
        }
    }

}