import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Response, Request } from 'express'; // Import Response and Request from express

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: CreateUserDto,
    @Ip() Ip: string,
  ) {
    const { email, password } = body;

    const all = await this.authService.login(email, password, {
      ipAddress: Ip, // Assuming `Ip` is the correct IP decorator, otherwise use `request.ip`
      userAgent: request.headers['user-agent'],
    });

    // Set cookies
    response.cookie('refreshToken', all.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    response.cookie('accessToken', all.accessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    response.cookie('auth', 'true', {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return response.json(all); // Ensure to return a JSON response
  }

  @Post('signup')
  async signup(@Req() request, @Ip() Ip: string, @Body() body: CreateUserDto) {
    return this.authService.signup(body, {
      ipAddress: Ip,
      userAgent: request.headers['user-agent'],
    });
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Post('logout')
  async logout(
    @Body() body: CreateUserDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {

    const refreshToken = request.cookies['refreshToken'];
    const accessToken = request.cookies['accessToken'];
    const auth = request.cookies['auth'];

    if(!refreshToken || !accessToken || !auth) {
      return response.json({ message: 'Login your account first' });
    }
    
    const info = await this.authService.logout(body.email, body.password);

    if(!info){
      return response.json({ message: 'User not found' });
    }

    response.clearCookie('refreshToken');
    response.clearCookie('accessToken');
    response.clearCookie('auth');

    return response.json({ message: 'Logged out successfully' });
  }
}
