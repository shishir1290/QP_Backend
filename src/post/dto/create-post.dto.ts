// post.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  post_type: string;

  @IsOptional()
  user_id?: string;

  @IsOptional()
  event_type?: string;

  @IsOptional()
  event_sub_type?: string;

  @IsOptional()
  location_id?: string;

  @IsOptional()
  location_name?: string;

  @IsOptional()
  feeling_id?: string;

  @IsOptional()
  activity_id?: string;

  @IsOptional()
  sub_activity_id?: string;

  @IsOptional()
  group_id?: string;

  @IsOptional()
  post_privacy?: string;

  @IsOptional()
  page_id?: string;

  @IsOptional()
  campaign_id?: string;

  @IsOptional()
  share_post_id?: string;

  @IsOptional()
  share_reels_id?: string;

  @IsOptional()
  workplace_id?: string;

  @IsOptional()
  institute_id?: string;

  @IsOptional()
  life_event_id?: string;

  @IsOptional()
  link?: string;

  @IsOptional()
  link_title?: string;

  @IsOptional()
  link_description?: string;

  @IsOptional()
  link_image?: string;

  @IsOptional()
  post_background_color?: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  ip_address?: string;

  @IsOptional()
  is_hidden?: boolean;

  @IsOptional()
  pin_post?: boolean;

  @IsOptional()
  created_by?: string;

  @IsOptional()
  updated_by?: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;

  @IsOptional()
  __v?: number;

  @IsOptional()
  media?: any[];

  @IsOptional()
  shareMedia?: any[];

  @IsOptional()
  tagged_user_list?: any[];

  @IsOptional()
  isFriend?: boolean;

  @IsOptional()
  isFriendRequestSended?: boolean;

  @IsOptional()
  comments?: any[];

  @IsOptional()
  totalComments?: number;

  @IsOptional()
  reactionCount?: number;

  @IsOptional()
  postShareCount?: number;

  @IsOptional()
  reactionTypeCountsByPost?: any[];

  @IsOptional()
  isBookMarked?: boolean;

  @IsOptional()
  isIgnored?: boolean;
}
