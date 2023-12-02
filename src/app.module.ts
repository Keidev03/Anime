import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AnimeModule } from './modules/anime/anime.module';
import { CategoryModule } from './modules/category/category.module';
import { GroupAnimeModule } from './modules/group-anime/group-anime.module';
import { EpisodeModule } from './modules/episode/episode.module';
import { RatingModule } from './modules/rating/rating.module';
import { ReviewModule } from './modules/review/review.module';
import { FavouriteModule } from './modules/favourite/favourite.module';

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
    EpisodeModule,
    RatingModule,
    ReviewModule,
    FavouriteModule
  ],
})
export class AppModule { }
