import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreatePostReactionDto {
  @IsUUID()
  @IsNotEmpty()
  post_id: string;

  @IsString()
  @IsNotEmpty()
  reaction_type: string;

  @IsUUID()
  @IsNotEmpty()
  user_id: string;
}
