import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Ip } from '@nestjs/common';
import { ReligionService } from './religion.service';
import { CreateReligionDto } from './dto/create-religion.dto';
import { UpdateReligionDto } from './dto/update-religion.dto';

@Controller('api/religion')
export class ReligionController {
  constructor(private readonly religionService: ReligionService) {}

  @Post()
  create(@Body() createReligionDto: CreateReligionDto, @Req() request, @Ip() Ip: string) {
    return this.religionService.create(createReligionDto, {ipAddress: Ip, userAgent: request.headers['user-agent']});
  }

  @Get()
  findAll() {
    return this.religionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.religionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReligionDto: UpdateReligionDto) {
    return this.religionService.update(id, updateReligionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.religionService.remove(id);
  }
}
