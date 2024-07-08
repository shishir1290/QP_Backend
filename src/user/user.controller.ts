import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from 'src/user.decorator';
import { Response } from 'express';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  // get profile picture by id
  @Get('profile-picture')
  async getProfilePicture(@Users() user, @Res() res: Response) {
    try{
      const imagePath = await this.userService.getProfilePicture(user._id);
  
      if(!imagePath){
        return null;
      }
      
      res.sendFile(imagePath, { root: './uploads/users' });
    }catch(e){
      return null;
    }
  }

  // find by email
  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
