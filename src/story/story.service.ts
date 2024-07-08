import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from './entities/story.entity';
import { CreateStoryImageDto } from './dto/create-story.dto';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
  ) {}

  create(createStoryImageDto: CreateStoryImageDto): Promise<Story> {
    const story = this.storyRepository.create(createStoryImageDto);
    return this.storyRepository.save(story);
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
