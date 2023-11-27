import { Module } from '@nestjs/common';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';
import { MongooseModule } from '@nestjs/mongoose';

import { AnimeSchema } from './anime.schema';
import { GoogleDriveService } from '../../service/drive.service';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Anime', schema: AnimeSchema }]), CategoryModule],
  controllers: [AnimeController],
  providers: [AnimeService, GoogleDriveService]
})
export class AnimeModule { }
