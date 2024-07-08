import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender) private readonly genderRepository: Repository<Gender>,
  ){}


  async create(createGenderDto: CreateGenderDto, value: { ipAddress: string; userAgent: string },): Promise<Gender> {
    const gender = new Gender();
    gender.gender_name = createGenderDto.gender_name;
    gender.data_status = createGenderDto.data_status;
    gender.ip_address = value.ipAddress;
    gender.CreatedAt = new Date();
    gender.UpdatedAt = new Date();
    gender.__v = 0;

    return await this.genderRepository.save(gender);
  }

  async findAll(): Promise<Gender[]> {
    return await this.genderRepository.find();
  }

  async findOne(id: string): Promise<Gender> {
    return await this.genderRepository.findOneBy({ _id: id });
  }

  async update(id: string, updateGenderDto: UpdateGenderDto): Promise<Gender> {
    await this.genderRepository.update(id, updateGenderDto);
    return await this.genderRepository.findOneBy({ _id: id });
  }

  async remove(id: string) {
    return await this.genderRepository.delete(id);
  }
}
