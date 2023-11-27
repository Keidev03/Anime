import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AnimeModule } from './modules/anime/anime.module';
import { CategoryModule } from './modules/category/category.module';
import { GroupAnimeModule } from './modules/group-anime/group-anime.module';
import { EpisodeModule } from './modules/episode/episode.module';
import { JwtModule } from '@nestjs/jwt';

const uri = process.env.URI;

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    JwtModule.register({
      global: true
    }),
    AnimeModule,
    CategoryModule,
    GroupAnimeModule,
    EpisodeModule
  ],
})
export class AppModule { }
