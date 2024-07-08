import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from './entities/gender.entity';
import { CreateGenderDto } from './dto/create-gender.dto';

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}

  async create(createGenderDto: CreateGenderDto): Promise<Gender> {
    const gender = this.genderRepository.create(createGenderDto);
    return this.genderRepository.save(gender);
  }

  async findAll(): Promise<Gender[]> {
    return this.genderRepository.find();
  }

  async findOne(id: string): Promise<Gender> {
    return this.genderRepository.findOne({ where: { _id : id } });
  }

  async update(id: string, updateGenderDto: CreateGenderDto): Promise<Gender> {
    const gender = await this.genderRepository.findOne({ where: { _id : id } });
    if (!gender) {
      throw new Error('Gender not found');
    }

    // Update properties
    gender.gender_name = updateGenderDto.gender_name;

    return this.genderRepository.save(gender);
  }

  async remove(id: string): Promise<void> {
    await this.genderRepository.delete(id);
  }
}
