import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryImage } from './entities/story-image.entity';
import { StoryText } from './entities/story-text.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([StoryImage, StoryText]), UserModule],
  controllers: [StoryController],
  providers: [StoryService],
})
export class StoryModule {}
