import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { GenderModule } from 'src/gender/gender.module';
import { ReligionModule } from 'src/religion/religion.module';

@Module({
  imports: [forwardRef(() => UserModule), GenderModule, ReligionModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
