// src/posts/post.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: string): Promise<Post> {
    return this.postRepository.findOne({ where: { _id : id }, relations: ['user'] });
  }

  async update(id: string, updatePostDto: Partial<CreatePostDto>): Promise<Post> {
    const postToUpdate = await this.postRepository.findOne({ where: { _id : id }, relations: ['user'] });
    if (!postToUpdate) {
      throw new Error(`Post with ID ${id} not found.`);
    }

    const updatedPost = Object.assign(postToUpdate, updatePostDto);
    return this.postRepository.save(updatedPost);
  }

  async remove(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }
}
