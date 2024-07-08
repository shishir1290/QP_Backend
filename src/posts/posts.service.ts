import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Images } from './entities/images.entity';
import path from 'path';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Images) private readonly imagesRepository: Repository<Images>,
  ) {}


  async create(createPostDto: CreatePostDto, userId: string, images: string[]): Promise<Post> {
    const user = await this.userRepository.findOne({ where: { _id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const post = new Post();
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.postDate = createPostDto.postDate;
    post.postStatus = createPostDto.postStatus;
    post.user = user;

    const savedPost = await this.postRepository.save(post);

    for (const image of images) {
      const postImage = new Images();
      postImage.image = image;
      postImage.post = savedPost;
      await this.imagesRepository.save(postImage);
    }

    const postImages = await this.imagesRepository.find({ where: { post: savedPost } });
    savedPost.postImage = postImages.map(img => img._id);

    await this.postRepository.save(savedPost);

    return this.postRepository.findOne({
      where: { _id: savedPost._id },
      relations: ['user', 'images'],
    });
  }
  


  // find all post by userId
  async findAllPostPathsByPostId(imageId: string): Promise<string> {
    // Fetch posts for a given userId
    const posts = await this.imagesRepository.findOne({
      where: { _id : imageId },
    });

    if (!posts) {
      throw new Error('No posts found');
    }

    return posts.image;
    
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id:  string) {
    return `This action returns a #${id} post`;
  }

  update(id:  string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id:  string) {
    return `This action removes a #${id} post`;
  }
}
