import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Ip } from '@nestjs/common';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';

@Controller('api/gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  create(@Body() createGenderDto: CreateGenderDto, @Req() request, @Ip() Ip: string) {
    console.log(createGenderDto);
    return this.genderService.create(createGenderDto, {ipAddress: Ip, userAgent: request.headers['user-agent']});
  }

  @Get()
  findAll() {
    return this.genderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto) {
    return this.genderService.update(id, updateGenderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genderService.remove(id);
  }
}
