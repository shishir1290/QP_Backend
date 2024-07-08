import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';
import { UserModule } from 'src/user/user.module';
import { GenderModule } from 'src/gender/gender.module';
import { ReligionModule } from 'src/religion/religion.module';
import { PostController } from './post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post]),UserModule,GenderModule, ReligionModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService, TypeOrmModule],
})
export class PostModule {}
