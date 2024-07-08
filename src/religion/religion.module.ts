import { Module } from '@nestjs/common';
import { ReligionService } from './religion.service';
import { ReligionController } from './religion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Religion } from './entities/religion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Religion])],
  controllers: [ReligionController],
  providers: [ReligionService],
  exports: [ReligionService, TypeOrmModule],
})
export class ReligionModule {}
