import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { PostComment } from './entities/post-comment.entity';

@Injectable()
export class PostCommentService {
  constructor(
    @InjectRepository(PostComment)
    private postCommentRepository: Repository<PostComment>,
  ) {}

  create(createPostCommentDto: CreatePostCommentDto): Promise<PostComment> {
    const postComment = this.postCommentRepository.create(createPostCommentDto);
    return this.postCommentRepository.save(postComment);
  }

  async findAll(page: number, limit: number): Promise<PostComment[]> {
    const skip = (page - 1) * limit;
    return this.postCommentRepository.find({
      skip,
      take: limit,
    });
  }


  findOne(id: string): Promise<PostComment> {
    return this.postCommentRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.postCommentRepository.delete(id);
  }
}
