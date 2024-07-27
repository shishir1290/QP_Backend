import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Story } from './entities/story.entity';
import { CreateStoryImageDto } from './dto/create-story.dto';
import { User } from 'src/user/entities/user.entity';
import { validate as isUuid } from 'uuid';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story) private storyRepository: Repository<Story>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createStoryImageDto: CreateStoryImageDto): Promise<Story> {
    const story = this.storyRepository.create(createStoryImageDto);
    return this.storyRepository.save(story);
  }

  // get all stories by user id
  async findAllByUser(user_id: string): Promise<Story[]> {
    const story = await this.storyRepository.find({ where: { user_id } });
    return story;
  }

  // get all users story without 1 user by user id
  async findAllByAllUser(user_id: string): Promise<Story[]> {
    const user = await this.userRepository.findOne({ where: { _id: user_id } });
    
    const story = await this.storyRepository.find({ where: { user_id: Not(user_id) } });
    return story;
  }

  findAll(): Promise<Story[]> {
    return this.storyRepository.find();
  }

  findOne(id: string): Promise<Story> {
    return this.storyRepository.findOne({ where: { _id : id } });
  }

  async remove(id: string): Promise<void> {
    await this.storyRepository.delete(id);
  }
}
