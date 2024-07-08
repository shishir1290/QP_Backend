import { IsString, IsNotEmpty, IsEmail, IsDate, IsBoolean, IsArray, IsOptional } from 'class-validator';
import { CreateGenderDto } from 'src/gender/dto/create-gender.dto';
import { CreateReligionDto } from 'src/religion/dto/create-religion.dto';

export class CreateUserDto {

    _id: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  profile_pic: string;

  @IsString()
  cover_pic: string;

  @IsOptional()
  @IsString()
  user_status: string;

  @IsNotEmpty()
  gender: CreateGenderDto;

  @IsNotEmpty()
  religion: CreateReligionDto;

  @IsDate()
  @IsNotEmpty()
  date_of_birth: Date;

  @IsString()
  @IsNotEmpty()
  user_bio: string;

  @IsOptional()
  @IsString()
  language: string;

  @IsOptional()
  @IsString()
  passport: string;

  @IsDate()
  @IsNotEmpty()
  last_login: string;

  @IsOptional()
  @IsString()
  user_2fa_status: string;

  @IsOptional()
  @IsEmail()
  secondary_email: string;

  @IsOptional()
  @IsEmail()
  recovery_email: string;

  @IsString()
  @IsNotEmpty()
  relation_status: string;

  @IsString()
  @IsNotEmpty()
  home_town: string;

  @IsString()
  @IsNotEmpty()
  birth_place: string;

  @IsOptional()
  @IsString()
  blood_group: string;

  @IsString()
  @IsNotEmpty()
  reset_password_token: string;

  @IsString()
  @IsNotEmpty()
  reset_password_token_expires: string;

  @IsOptional()
  @IsString()
  user_role: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  ip_address: string;

  @IsNotEmpty()
  lock_profile: string;

  @IsArray()
  @IsNotEmpty()
  email_list: string[];

  @IsOptional()
  @IsArray()
  phone_list: string[];

  @IsString()
  @IsNotEmpty()
  user_about: string;

  @IsString()
  @IsNotEmpty()
  user_nickname: string;

  @IsOptional()
  @IsString()
  present_town: string;

  @IsBoolean()
  @IsNotEmpty()
  turn_on_earning_dashboard: boolean;

  @IsString()
  @IsNotEmpty()
  date_of_birth_show_type: string;

  @IsString()
  @IsNotEmpty()
  email_privacy: string;

  @IsBoolean()
  @IsNotEmpty()
  isProfileVerified: boolean;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  __v: number;
}


