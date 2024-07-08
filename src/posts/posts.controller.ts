import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  UnauthorizedException,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Users } from 'src/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Response } from 'express';
import * as path from 'path'; // Import path module
import * as fs from 'fs';

// @UseGuards(JwtAuthGuard)
@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('postImages', 10, {
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif|mp4|avi|mov|wmv)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Only image files are allowed!'), false);
        }
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads/posts');
        },
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}-${file.originalname}`);
        },
      }),
    }),
  )
  async create(
    @Body() createPostDto: CreatePostDto,
    @Users() user: { _id: any },
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!user) {
      throw new UnauthorizedException('User information not available.');
    }

    const images = files.map((file) => file.filename);
    const userId = user._id;
    return this.postsService.create(createPostDto, userId, images);
  }



  // get all posts by userId
  @Get('posts/:postId')
  async findAllByUserId(@Param('postId') postId: string, @Res() res: Response) {
    const imagePath = await this.postsService.findAllPostPathsByPostId(postId);
    if (!imagePath) {
      throw new NotFoundException('Posts not found');
    }

    res.sendFile(imagePath, { root: './uploads/posts' });
  }

  





  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
