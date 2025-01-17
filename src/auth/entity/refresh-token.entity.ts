import { sign } from 'jsonwebtoken';

export class RefreshToken {

    constructor(init?: Partial<RefreshToken>) {
        Object.assign(this, init);
    }
  id: number;
  userId: string;
  userAgent: string;
  ipAddress: string;
  role: string;

  sign(): string {
    return sign({...this}, process.env.REFRESH_TOKEN_SECRET)
  }
}