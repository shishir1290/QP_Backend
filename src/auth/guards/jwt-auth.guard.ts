import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      if (err instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid JWT token');
      }
      throw err || new UnauthorizedException();
    }
    return user; // Attach the user object to the request
  }
}
