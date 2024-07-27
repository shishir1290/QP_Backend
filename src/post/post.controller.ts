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
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 5,
  ): Promise<{ status: number, posts: PostEntity[], total: number }> {
    const pageNumber = page > 0 ? page : 1;
    const pageSizeNumber = pageSize > 0 ? pageSize : 5;

    const { posts, total } = await this.postService.findAll(pageNumber, pageSizeNumber);

    return {
      status: 200,
      posts,
      total
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
