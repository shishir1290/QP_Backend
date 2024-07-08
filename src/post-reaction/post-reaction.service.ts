import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostReactionDto } from './dto/create-post-reaction.dto';
import { PostReaction } from './entities/post-reaction.entity';

@Injectable()
export class PostReactionService {
  constructor(
    @InjectRepository(PostReaction)
    private postReactionRepository: Repository<PostReaction>,
  ) {}

  async create(createPostReactionDto: CreatePostReactionDto): Promise<PostReaction | any> {
    const postReaction = this.postReactionRepository.create(createPostReactionDto);
    await this.postReactionRepository.save(postReaction);
    return { status: 201, message: 'Post reaction added successfully' };
  }

  findAll(): Promise<PostReaction[]> {
    return this.postReactionRepository.find();
  }

  findOne(id: string): Promise<PostReaction> {
    return this.postReactionRepository.findOne({ where: { _id : id } });
  }

  async findAllByPost(post_id: string): Promise<PostReaction[]> {
    return this.postReactionRepository.find({ where: { post_id } });
  }


  async update(id: string, updatePostReactionDto: CreatePostReactionDto): Promise<PostReaction | any> {
    const postReactionToUpdate = await this.postReactionRepository.findOne({ where: { _id : id } });
    if (!postReactionToUpdate) {
      throw new Error(`PostReaction with ID ${id} not found.`);
    }

    // Check if the reaction type is already the same
    if (postReactionToUpdate.reaction_type === updatePostReactionDto.reaction_type) {
      // No change needed if the reaction type is the same
      await this.postReactionRepository.delete(id);
      return { status: 200, message: 'Post reaction removed successfully' };
    } else {
      // Update to a new reaction type
      postReactionToUpdate.reaction_type = updatePostReactionDto.reaction_type;
      await this.postReactionRepository.save(postReactionToUpdate);
      return { status: 200, message: 'Post reaction updated successfully' };
    }
  }

  async remove(id: string): Promise<void> {
    await this.postReactionRepository.delete(id);
  }
}
