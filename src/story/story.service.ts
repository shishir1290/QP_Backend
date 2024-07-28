import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, MoreThan, Not, Repository } from 'typeorm';
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
    // Calculate the timestamp for 24 hours ago
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);

    // Query the repository with the user_id and createdAt condition
    const stories = await this.storyRepository.find({
      where: {
        user_id,
        CreatedAt: MoreThan(twentyFourHoursAgo),
      },
    });

    return stories;
  }

  // get all users story without 1 user by user id
  async findAllByAllUser(user_id: string): Promise<Story[]> {
    // Calculate the timestamp for 24 hours ago
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);

    const stories = await this.storyRepository.find({
      where: { 
        user_id: Not(user_id), 
        CreatedAt: MoreThan(twentyFourHoursAgo) 
      },
    });

    if (stories.length === 0) {
      return [];
    }

    const uniqueUserIds = [...new Set(stories.map((story) => story.user_id))];
    const firstStories = await this.storyRepository.find({
      where: {
        user_id: In(uniqueUserIds),
        CreatedAt: MoreThan(twentyFourHoursAgo),
      },
      order: {
        CreatedAt: 'ASC',
      },
      take: 1, // Get the first story for each user
    });

    return firstStories;
  }

  findAll(): Promise<Story[]> {
    return this.storyRepository.find();
  }

  findOne(id: string): Promise<Story> {
    return this.storyRepository.findOne({ where: { _id: id } });
  }

  async remove(id: string): Promise<void> {
    await this.storyRepository.delete(id);
  }
}
