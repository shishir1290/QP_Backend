import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Res, Query } from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { PostComment } from './entities/post-comment.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid'; // Import the uuidv4 function from the uuid package
import path from 'path';
import { Response } from 'express';

@Controller('api')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  @Post('save-user-comment-by-post')
  @UseInterceptors(FileInterceptor('image_or_video', {
    storage: diskStorage({
      destination: './images/comments',
      filename: (req, file, cb) => {
        const fileName = uuidv4() + path.extname(file.originalname);
        cb(null, fileName);
      },
    }),
  }))
  async create(
    @Body() createPostCommentDto: CreatePostCommentDto,
    @UploadedFile() image_or_video: Express.Multer.File,
  ): Promise<PostComment> {
    if (image_or_video) {
      createPostCommentDto.image_or_video = image_or_video.filename;
    }
    return this.postCommentService.create(createPostCommentDto);
  }

  @Get('comment-pics/:filename')
  async serveProfilePic(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './images/posts' });
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<PostComment[]> {
    const parsedPage = parseInt(page.toString(), 10) || 1;
    const parsedLimit = parseInt(limit.toString(), 10) || 5;
    return this.postCommentService.findAll(parsedPage, parsedLimit);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostComment> {
    return this.postCommentService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postCommentService.remove(id);
  }


  // get comment by post id
  @Get('get-comments-by-post/:id')
  getCommentsByPostId(@Param('id') id: string): Promise<PostComment[]> {
    return this.postCommentService.getCommentsByPostId(id);
  }
}
