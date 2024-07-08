import { IsString, IsNotEmpty, IsEmail, IsDate, IsBoolean, IsArray, IsOptional } from 'class-validator';

export class CreateReligionDto {
    @IsString()
    @IsNotEmpty()
    religion_name: string;
  
    @IsOptional()
    @IsString()
    data_status: string;
  
    @IsOptional()
    @IsString()
    ip_address: string;
  
    @IsOptional()
    @IsString()
    created_by: string;
  
    @IsOptional()
    @IsString()
    update_by: string;
  
    @IsDate()
    @IsNotEmpty()
    createdAt: Date;
  
    @IsDate()
    @IsNotEmpty()
    updatedAt: Date;
  
    @IsOptional()
    @IsString()
    __v: number;
  }
  