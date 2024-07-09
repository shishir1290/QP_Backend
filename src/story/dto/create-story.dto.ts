import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateStoryImageDto {
  @IsString()
  _id: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsOptional()
  image_scale?: string;

  @IsString()
  @IsOptional()
  image_position_x?: string;

  @IsString()
  @IsOptional()
  image_position_y?: string;

  @IsString()
  @IsOptional()
  post?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  text_color?: string;

  @IsString()
  @IsOptional()
  background_color?: string;

  @IsString()
  @IsOptional()
  text_size?: string;

  @IsString()
  @IsOptional()
  text_position?: string;

  @IsString()
  @IsOptional()
  text_padding?: string;

  @IsString()
  @IsOptional()
  text_family?: string;

  @IsString()
  @IsOptional()
  text_style?: string;

  @IsString()
  @IsOptional()
  text_weight?: string;

  @IsString()
  @IsOptional()
  text_decoration?: string;

  @IsString()
  @IsOptional()
  text_shadow?: string;

  @IsString()
  @IsOptional()
  text_outline?: string;

  @IsString()
  @IsOptional()
  text_align?: string;

  @IsString()
  @IsOptional()
  created_by?: string;

  @IsString()
  @IsOptional()
  updated_by?: string;

  @IsDateString()
  @IsOptional()
  CreatedAt?: Date;

  @IsDateString()
  @IsOptional()
  UpdatedAt?: Date;

  @IsDateString()
  user_id?: string;

  @IsOptional()
  @IsNotEmpty()
  __v?: number;
}
