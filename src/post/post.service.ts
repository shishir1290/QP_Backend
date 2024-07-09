import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const user_id = createPostDto.user_id;

    const user = await this.userRepository.findOne({ where: { _id: user_id } });
    const post = this.postRepository.create(createPostDto);
    post.user = user;
    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postRepository.find({
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });
    return posts;
  }

  async findOne(id: string): Promise<Post> {
    try {
      const post = await this.postRepository.findOneOrFail({ where: { _id: id }, relations: ['user'] });
      return post;
    } catch (error) {
      throw new Error(`Post with ID ${id} not found.`);
    }
  }

  async update(id: string, updatePostDto: Partial<CreatePostDto>): Promise<Post> {
    const postToUpdate = await this.postRepository.findOne({ where: { _id: id }, relations: ['user'] });
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
