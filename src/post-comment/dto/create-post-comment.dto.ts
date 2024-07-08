import { IsUUID, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostCommentDto {
  @IsUUID()
  @IsNotEmpty()
  post_id: string;

  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  comment_text: string;

  @IsOptional()
  @IsString()
  image_or_video?: string;
}
