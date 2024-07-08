import { Controller, Get, Post, Body, Put, Param, Delete, UploadedFile, UseInterceptors, Res, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@Controller('api')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('save-post')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './images/posts',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async create(@Body() createPostDto: CreatePostDto, @UploadedFile() image: Express.Multer.File): Promise<PostEntity> {
    if (image) {
      createPostDto.link_image = image.path;
    }
    return this.postService.create(createPostDto);
  }

  @Get('get-all-users-posts')
  async findAll(@Query('pageNo') pageNo: number = 1, @Query('pageSize') pageSize: number = 10): Promise<{ status: number, posts: PostEntity[], pageNo: number, pageSize: number, totalPosts: number, pageCount: number, isRetry: boolean }> {
    const [posts, totalPosts] = await this.postService.findAll(pageNo, pageSize);
    const pageCount = Math.ceil(Number(totalPosts) / Number(pageSize));

    return {
      status: 200,
      posts,
      pageNo,
      pageSize,
      totalPosts,
      pageCount,
      isRetry: false,
    };
  }

  @Get('post-pics/:filename')
  async serveProfilePic(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './images/posts' });
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
