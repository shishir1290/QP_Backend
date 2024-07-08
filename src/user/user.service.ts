import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  // get profile picture by id
  async getProfilePicture(id: string) {
    const user = await this.userRepository.findOne({where: {_id: id}, relations: ['gender', 'religion']});
    if (!user) {
      return null;
    }
    const profilePicture = user.profile_pic;
    return profilePicture;
  }


  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email: email}, relations: ['gender', 'religion']});
    if (!user) {
      return null;
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({where:{_id: id}, relations: ['gender', 'religion']});
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({where:{_id: id}, relations: ['gender', 'religion']});
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
