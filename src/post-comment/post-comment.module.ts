import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCommentService } from './post-comment.service';
import { PostCommentController } from './post-comment.controller';
import { PostComment } from './entities/post-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostComment])],
  controllers: [PostCommentController],
  providers: [PostCommentService],
})
export class PostCommentModule {}
