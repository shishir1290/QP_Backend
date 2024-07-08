import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpException, HttpStatus, UploadedFile, UseGuards, Res } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryImageDto } from './dto/create-story-image.dto';
import { UpdateStoryImageDto } from './dto/update-story-image.dto';
import { Users } from 'src/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Response } from 'express';

@Controller('api/story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('image/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (req, file, cb) => {
        console.log('File:', file.originalname)
        if (file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|avi|mov|wmv)$/)) {
          cb(null, true);
        } else {
          cb(new HttpException('Invalid file format', HttpStatus.BAD_REQUEST), false);
        }
      },
      limits: { fileSize: 1024 * 1024 * 5 },
      storage: diskStorage({
        destination: './uploads/story',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}-${file.originalname}`);
        }
      })
    })
  )
  async create(@Body() createStoryImageDto: CreateStoryImageDto, @Param('id') id : string, @UploadedFile() imagePath: Express.Multer.File) {
    
      const userId = id;
      createStoryImageDto.image = imagePath.filename;
      return await this.storyService.createImageStory(createStoryImageDto, userId);
    
  }

  @Get()
  findAll() {
    return this.storyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storyService.findOne(id);
  }

  // find story by user id
  @Get('user/:id')
  findStoryByUserId(@Param('id') id: string) {
    return this.storyService.findStoryByUserId(id);
  }

  // find story image by story id
  @Get('image/:id')
  async findStoryImageByStoryId(@Param('id') id: string, @Res() res: Response) {
    console.log('Story ID:', id);
    const imagePath = await this.storyService.findStoryImageByStoryId(id);
    if(!imagePath){
      return null;
    }
    console.log('Image Path:', imagePath);
    res.sendFile(imagePath, { root: './uploads/story' });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryImageDto) {
    return this.storyService.update(id, updateStoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storyService.remove(id);
  }
}
