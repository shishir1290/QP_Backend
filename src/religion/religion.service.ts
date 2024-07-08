import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Religion } from './entities/religion.entity';
import { CreateReligionDto } from './dto/create-religion.dto';

@Injectable()
export class ReligionService {
  constructor(
    @InjectRepository(Religion)
    private readonly religionRepository: Repository<Religion>,
  ) {}

  async create(createReligionDto: CreateReligionDto): Promise<Religion> {
    const religion = this.religionRepository.create(createReligionDto);
    return this.religionRepository.save(religion);
  }

  async findAll(): Promise<Religion[]> {
    return this.religionRepository.find();
  }

  async findOne(id: string): Promise<Religion> {
    return this.religionRepository.findOne({ where: { _id : id } });
  }

  async update(id: string, updateReligionDto: CreateReligionDto): Promise<Religion> {
    const religion = await this.religionRepository.findOne({ where: { _id : id } });
    if (!religion) {
      throw new Error('Religion not found');
    }

    // Update properties
    religion.religion_name = updateReligionDto.religion_name;

    return this.religionRepository.save(religion);
  }

  async remove(id: string): Promise<void> {
    await this.religionRepository.delete(id);
  }
}
