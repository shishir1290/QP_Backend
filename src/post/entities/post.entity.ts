// src/posts/entities/post.entity.ts
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  _id: string; // Assuming UUID as primary key

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  post_type: string;

  @Column({ nullable: true })
  to_user_id: string;

  @Column({ nullable: true })
  event_type: string;

  @Column({ nullable: true })
  event_sub_type: string;

  @ManyToOne(() => User)
  user: User;

  @Column({ nullable: true })
  location_id: string;

  @Column({ nullable: true })
  location_name: string;

  @Column({ nullable: true })
  feeling_id: string;

  @Column({ nullable: true })
  activity_id: string;

  @Column({ nullable: true })
  sub_activity_id: string;

  @Column({ nullable: true })
  group_id: string;

  @Column({ nullable: true })
  post_privacy: string;

  @Column({ nullable: true })
  page_id: string;

  @Column({ nullable: true })
  campaign_id: string;

  @Column({ nullable: true })
  share_post_id: string;

  @Column({ nullable: true })
  share_reels_id: string;

  @Column({ nullable: true })
  workplace_id: string;

  @Column({ nullable: true })
  institute_id: string;

  @Column({ nullable: true, type: 'jsonb' }) // Assuming life_event_id is stored as JSONB in PostgreSQL
  life_event_id: any;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  link_title: string;

  @Column({ nullable: true })
  link_description: string;

  @Column({ nullable: true })
  link_image: string;

  @Column({ nullable: true })
  post_background_color: string;

  @Column({ nullable: true })
  status: string; // Corrected to use a specific data type compatible with PostgreSQL

  @Column({ nullable: true })
  ip_address: string; // Corrected assuming it's a string type

  @Column({ nullable: true })
  is_hidden: boolean;

  @Column({ nullable: true })
  pin_post: boolean;

  @Column({ nullable: true })
  created_by: string; // Corrected assuming it's a string type

  @Column({ nullable: true })
  updated_by: string; // Corrected assuming it's a string type

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  __v: number;

  @Column({ nullable: true, type: 'jsonb' }) // Assuming media is stored as JSONB in PostgreSQL
  media: any[];

  @Column({ nullable: true, type: 'jsonb' }) // Assuming shareMedia is stored as JSONB in PostgreSQL
  shareMedia: any[];

  @Column({ nullable: true, type: 'jsonb' }) // Assuming tagged_user_list is stored as JSONB in PostgreSQL
  tagged_user_list: any[];

  @Column({ nullable: true })
  isFriend: boolean;

  @Column({ nullable: true })
  isFriendRequestSended: boolean;

  @Column({ nullable: true, type: 'jsonb' }) // Assuming comments is stored as JSONB in PostgreSQL
  comments: any[];

  @Column({ nullable: true })
  totalComments: number;

  @Column({ nullable: true })
  reactionCount: number;

  @Column({ nullable: true })
  postShareCount: number;

  @Column({ nullable: true, type: 'jsonb' }) // Assuming reactionTypeCountsByPost is stored as JSONB in PostgreSQL
  reactionTypeCountsByPost: any[];

  @Column({ nullable: true })
  isBookMarked: boolean;

  @Column({ nullable: true })
  isIgnored: boolean;
}
