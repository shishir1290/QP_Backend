// src/posts/post.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { diskStorage } from 'multer'
import { extname } from 'path';
import { Response } from 'express';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('upload-profile-pic')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/posts',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async create(@Body() createPostDto: CreatePostDto, @UploadedFile() image: Express.Multer.File): Promise<PostEntity> {
    if (image) {
      // Handle image upload logic here
      createPostDto.link_image = image.path; // Example: Save image path to link_image field
    }
    return this.postService.create(createPostDto);
  }



  @Get('post-pics/:filename')
  async serveProfilePic(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './uploads/posts' });
  }

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: Partial<CreatePostDto>): Promise<PostEntity> {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postService.remove(id);
  }
}
