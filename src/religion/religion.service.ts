import { Injectable } from '@nestjs/common';
import { CreateReligionDto } from './dto/create-religion.dto';
import { UpdateReligionDto } from './dto/update-religion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Religion } from './entities/religion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReligionService {


  constructor(
    @InjectRepository(Religion) private readonly religionRepository: Repository<Religion>,
  ){}


  async create(createReligionDto: CreateReligionDto, value: { ipAddress: string; userAgent: string }): Promise<Religion> {
    const religion = new Religion();
    religion.religion_name = createReligionDto.religion_name;
    religion.data_status = createReligionDto.data_status;
    religion.ip_address = value.ipAddress;
    religion.CreatedAt = new Date();
    religion.UpdatedAt = new Date();
    return await this.religionRepository.save(religion);
  }

  async findAll(): Promise<Religion[]> {
    return await this.religionRepository.find();
  }

  async findOne(id: string): Promise<Religion> {
    return await this.religionRepository.findOneBy({ _id: id });
  }

  async update(id: string, updateReligionDto: UpdateReligionDto): Promise<Religion> {
    await this.religionRepository.update(id, updateReligionDto);
    return await this.religionRepository.findOneBy({ _id: id });
  }

  async remove(id: string) {
    return await this.religionRepository.delete(id);
  }
}
