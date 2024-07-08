import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GenderModule } from './gender/gender.module';
import { ReligionModule } from './religion/religion.module';
import { PostModule } from './post/post.module';
import { PostReactionModule } from './post-reaction/post-reaction.module';
import { PostCommentModule } from './post-comment/post-comment.module';
import { StoryModule } from './story/story.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      url: process.env.DATABASE_URL, // Comment this out if using individual fields
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true, // Should be set to false in production
      retryAttempts: 3,
      retryDelay: 3000,
      logging: true,
    }),
    AuthModule,
    UserModule,
    GenderModule,
    ReligionModule,
    PostModule,
    PostReactionModule,
    PostCommentModule,
    StoryModule,
    // Other modules and providers
  ],
})
export class AppModule {}
