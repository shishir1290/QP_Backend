import { IsString, IsNotEmpty, IsEmail, IsDate, IsBoolean, IsArray, IsOptional } from 'class-validator';


export class CreateGenderDto {
    @IsString()
    @IsNotEmpty()
    gender_name: string;
  
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