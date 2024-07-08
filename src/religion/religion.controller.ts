import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ReligionService } from './religion.service';
import { CreateReligionDto } from './dto/create-religion.dto';
import { Religion } from './entities/religion.entity';

@Controller('religions')
export class ReligionController {
  constructor(private readonly religionService: ReligionService) {}

  @Post()
  create(@Body() createReligionDto: CreateReligionDto): Promise<Religion> {
    return this.religionService.create(createReligionDto);
  }

  @Get()
  findAll(): Promise<Religion[]> {
    return this.religionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Religion> {
    return this.religionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateReligionDto: CreateReligionDto): Promise<Religion> {
    return this.religionService.update(id, updateReligionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.religionService.remove(id);
  }
}
