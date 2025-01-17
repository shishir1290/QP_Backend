import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, Res, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Response } from 'express';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }


  @Post('upload-profile-pic/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/profile-pics',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => (Math.round(Math.random() * 16)).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadProfilePic(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUserDto: Partial<CreateUserDto>,
    @Param('id') id: string,
  ): Promise<string> {
    updateUserDto._id = id;

    const filename = file.filename;
    console.log('filename', filename);

    // Update user profile_pic in the database
    updateUserDto.profile_pic = filename;
    await this.userService.update(updateUserDto._id, updateUserDto);

    return filename;
  }

  @Get('profile-pics/:filename')
  async serveProfilePic(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './images/profile-pics' });
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
