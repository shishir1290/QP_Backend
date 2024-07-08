import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshToken } from './entity/refresh-token.entity';
import { sign, verify } from 'jsonwebtoken';

import { hash, compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { response } from 'express';
import { GenderService } from 'src/gender/gender.service';
import { ReligionService } from 'src/religion/religion.service';

@Injectable()
export class AuthService {
  private refreshToken: RefreshToken[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly genderService: GenderService,
    private readonly religionService: ReligionService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUserById(userId: string): Promise<User> {
    // Assuming UserRepository has a method to find user by ID
    return this.userRepository.findOne({where: { _id: userId }});
  }

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const userId = refreshToken.userId;
    let accessToken: { userId: string } | undefined;

    const userInfo = await this.userRepository.findOne({
      where: { _id: userId },
    });
    if (!userInfo) {
      throw new UnauthorizedException();
    }

    accessToken = { userId: userInfo._id };

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    return sign(accessToken, process.env.ACCESS_TOKEN_SECRET);
  }

  private retrieveRefreshToken(refreshStr: string): RefreshToken | undefined {
    try {
      const decoded = verify(refreshStr, process.env.REFRESH_TOKEN_SECRET);
      if (typeof decoded === 'string') {
        return undefined;
      }
      return this.refreshToken.find(
        (token: RefreshToken) => token.id === decoded.id,
      );
    } catch (e) {
      return undefined;
    }
  }

  // Login
  // ----------------------------------------------------------------------------

  async login(
    email: string,
    password: string,
    value: { ipAddress: string; userAgent: string },
  ): Promise<
    { user: User; accessToken: string; refreshToken: string } | undefined
  > {
    const userInfo = await this.userRepository.findOne({
      where: { email: email },
      relations: ['gender', 'religion'], // Specify the relations to be loaded
    });

    if (!userInfo) {
      throw new UnauthorizedException();
    }

    const isMatch = await compare(password, userInfo.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const token = await this.newRefreshToken(userInfo, value);

    userInfo.last_login = new Date().toString();
    await this.userRepository.save(userInfo);

    delete userInfo.password;

    const info = {
      status: response.statusCode, // Assuming response is defined elsewhere
      user: userInfo,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      message: 'Login successful',
    };

    return info;
  }

  // signup
  // ----------------------------------------------------------------------------

  async signup(
    user: any,
    value: { userAgent: string; ipAddress: string },
  ): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (userExists) {
      throw new Error('User already exists');
    }

    let gender: any = null;
    let religion: any = null;

    if (user.gender) {
      gender = await this.genderService.findOne(user.gender);
    }

    if (user.religion) {
      religion = await this.religionService.findOne(user.religion);
    }

    console.log(gender);
    console.log(religion);

    const day = user.day;
    const month = user.month;
    const year = user.year;
    const date_of_birth = new Date(year, month, day);

    const hashedPassword = await hash(user.password, 10);
    const newUser = new User();
    newUser.first_name = user.first_name;
    newUser.last_name = user.last_name;
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.password = hashedPassword;
    newUser.phone = user.phone;
    newUser.gender = gender;
    newUser.religion = religion;
    newUser.date_of_birth = date_of_birth;
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    newUser.ip_address = value.ipAddress;
    newUser.fullName = `${user.first_name} ${user.last_name}`;
    newUser.__v = 1;

    console.log(newUser.gender);

    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  // ----------------------------------------------------------------------------

  private async newRefreshToken(
    user: User,
    value: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = new RefreshToken({
      id:
        this.refreshToken.length === 0
          ? 0
          : this.refreshToken[this.refreshToken.length - 1].id + 1,
      ...value,
      userId: user._id,
    });
    this.refreshToken.push(refreshObject);

    return {
      refreshToken: refreshObject.sign(),
      accessToken: sign(
        {
          userId: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '1d',
        },
      ),
    };
  }

  async logout(
    email: string,
    password: string,
  ): Promise<User> {
    const userInfo = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!userInfo) {
      throw new UnauthorizedException();
    }

    const isMatch = await compare(password, userInfo.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    
    return userInfo;
  }
}
