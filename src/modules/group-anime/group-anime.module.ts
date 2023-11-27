import { Module } from '@nestjs/common';
import { GroupAnimeService } from './group-anime.service';
import { GroupAnimeController } from './group-anime.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupAnimeSchema } from './group-anime.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'GroupAnime', schema: GroupAnimeSchema }])],
  providers: [GroupAnimeService],
  controllers: [GroupAnimeController]
})
export class GroupAnimeModule { }
