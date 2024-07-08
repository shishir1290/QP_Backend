import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { Gender } from './entities/gender.entity';

@Controller('genders')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  create(@Body() createGenderDto: CreateGenderDto): Promise<Gender> {
    return this.genderService.create(createGenderDto);
  }

  @Get()
  findAll(): Promise<Gender[]> {
    return this.genderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Gender> {
    return this.genderService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGenderDto: CreateGenderDto): Promise<Gender> {
    return this.genderService.update(id, updateGenderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.genderService.remove(id);
  }
}
