import { Injectable } from '@nestjs/common';
import { CreateStoryImageDto } from './dto/create-story-image.dto';
import { UpdateStoryImageDto } from './dto/update-story-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StoryImage } from './entities/story-image.entity';
import { Repository } from 'typeorm';
import { StoryText } from './entities/story-text.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class StoryService {

  constructor(
    @InjectRepository(StoryImage) private readonly storyImageRepository: Repository<StoryImage>,
    @InjectRepository(StoryText) private readonly storyTextRepository: Repository<StoryText>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ){}
  async createImageStory(createStoryImageDto: CreateStoryImageDto, userId: string): Promise<StoryImage> {
    const user = await this.userRepository.findOne({ where: { _id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    console.log('User:', user);
    console.log('Create Story Image DTO:', createStoryImageDto);

    const storyImage = new StoryImage();
    storyImage.image = createStoryImageDto.image;
    storyImage.image_scale = createStoryImageDto.image_scale;
    storyImage.image_position_x = createStoryImageDto.image_position_x;
    storyImage.image_position_y = createStoryImageDto.image_position_y;
    storyImage.post = createStoryImageDto.post;
    storyImage.title = createStoryImageDto.title;
    storyImage.text_color = createStoryImageDto.text_color;
    storyImage.background_color = createStoryImageDto.background_color;
    storyImage.text_size = createStoryImageDto.text_size;
    storyImage.text_position = createStoryImageDto.text_position;
    storyImage.text_padding = createStoryImageDto.text_padding;
    storyImage.text_family = createStoryImageDto.text_family;
    storyImage.text_style = createStoryImageDto.text_style;
    storyImage.text_weight = createStoryImageDto.text_weight;
    storyImage.text_decoration = createStoryImageDto.text_decoration;
    storyImage.text_shadow = createStoryImageDto.text_shadow;
    storyImage.text_outline = createStoryImageDto.text_outline;
    storyImage.text_align = createStoryImageDto.text_align;
    storyImage.createdAt = new Date();
    storyImage.updatedAt = new Date();
    storyImage.user = user;
    const savedStoryImage = this.storyImageRepository.save(storyImage);

    delete (await savedStoryImage).user.password;

    console.log('Saved Story Image:', savedStoryImage);

    return savedStoryImage;
  }

  findAll() {
    return `This action returns all story`;
  }

  findOne(id: string) {
    return `This action returns a #${id} story`;
  }

  async findStoryByUserId(id: string) {
    const user = await this.userRepository.findOne({ where: { _id: id } });
    if (!user) {
      throw new Error('User not found');
    }

    const storyImage = await this.storyImageRepository.find({ where: { user: user } });
    const storyText = await this.storyTextRepository.find({ where: { user: user } });

    const story = { storyImage, storyText };
    return story;
  }

  // find story image by story id
  async findStoryImageByStoryId(id: string) {
    const storyImage = await this.storyImageRepository.findOne({ where: { _id: id } });
    if (!storyImage) {
      throw new Error('Story Image not found');
    }
    console.log('Story Image:', storyImage.image);

    return storyImage.image;
  }

  update(id: string, updateStoryDto: UpdateStoryImageDto) {
    return `This action updates a #${id} story`;
  }

  remove(id: string) {
    return `This action removes a #${id} story`;
  }
}
