import { Module } from '@nestjs/common';
import { PostReactionService } from './post-reaction.service';
import { PostReactionController } from './post-reaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostReaction } from './entities/post-reaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostReaction])],
  controllers: [PostReactionController],
  providers: [PostReactionService],
})
export class PostReactionModule {}
