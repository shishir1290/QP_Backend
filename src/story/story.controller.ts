import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, Res, UploadedFile } from '@nestjs/common';
import { StoryService } from './story.service';
import { Story } from './entities/story.entity';
import { CreateStoryImageDto } from './dto/create-story.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { validate as isUuid } from 'uuid';

@Controller('api/story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('create-story-image/:user_id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './images/story',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  create(@Body() createStoryImageDto: CreateStoryImageDto, @Param('user_id') user_id: string,  @UploadedFile() file: Express.Multer.File,): Promise<Story> {
    
    createStoryImageDto.image = file.filename;
    createStoryImageDto.user_id = user_id;
    return this.storyService.create(createStoryImageDto);
  }


  @Post('create-story-text/:user_id')
  createText(@Body() createStoryImageDto: CreateStoryImageDto, @Param('user_id') user_id: string): Promise<Story> {
    console.log(user_id);
    createStoryImageDto.user_id = user_id;
    console.log(createStoryImageDto);
    return this.storyService.create(createStoryImageDto);
  }


  @Get('stories/:filename')
  async serveProfilePic(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './images/story' });
  }


  // get story by user id
  @Get('user/:user_id')
  async findAllByUser(@Param('user_id') user_id: string): Promise<Story[]> {
    const story = await this.storyService.findAllByUser(user_id);
    return story;
  }
  
  // get all users story without 1 user by user id
  @Get('all-user/:user_id')
  async findAllByAllUser(@Param('user_id') user_id: string): Promise<Story[]> {
    const firstStories = await this.storyService.findAllByAllUser(user_id);
    return firstStories;
  }


  @Get()
  findAll(): Promise<Story[]> {
    return this.storyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Story> {
    return this.storyService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.storyService.remove(id);
  }
}
