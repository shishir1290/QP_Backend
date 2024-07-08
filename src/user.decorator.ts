// user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user/entities/user.entity';

export const Users = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Assuming user information is attached to the request
  },
);
