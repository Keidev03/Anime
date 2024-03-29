import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AnimeModule } from './modules/anime/anime.module';
import { GenresModule } from './modules/genres/genres.module';
import { EpisodeModule } from './modules/episode/episode.module';
import { RatingModule } from './modules/rating/rating.module';
import { CommentModule } from './modules/comment/comment.module';
import { FavouriteModule } from './modules/favourite/favourite.module';

const uri = process.env.URI;

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    JwtModule.register({
      global: true
    }),
    AnimeModule,
    GenresModule,
    EpisodeModule,
    RatingModule,
    CommentModule,
    FavouriteModule
  ],
})
export class AppModule { }
