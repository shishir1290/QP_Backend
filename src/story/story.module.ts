import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Story]), UserModule],
  controllers: [StoryController],
  providers: [StoryService],
  exports: [StoryService, TypeOrmModule],
})
export class StoryModule {}
