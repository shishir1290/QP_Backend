import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, Res } from '@nestjs/common';
import { StoryService } from './story.service';
import { Story } from './entities/story.entity';
import { CreateStoryImageDto } from './dto/create-story.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './images/story',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  create(@Body() createStoryImageDto: CreateStoryImageDto): Promise<Story> {
    return this.storyService.create(createStoryImageDto);
  }


  @Get('stories/:filename')
  async serveProfilePic(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './images/profile-pics' });
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
