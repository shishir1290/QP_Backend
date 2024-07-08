import { Gender } from "src/gender/entities/gender.entity";
import { Post } from "src/posts/entities/post.entity";
import { Religion } from "src/religion/entities/religion.entity";
import { StoryImage } from "src/story/entities/story-image.entity";
import { StoryText } from "src/story/entities/story-text.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  constructor(){
    this._id = uuid4();
  }

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profile_pic: string;

  @Column({ nullable: true })
  cover_pic: string;

  @Column({ nullable: true })
  user_status: string;

  @Column({ nullable: true })
  date_of_birth: Date;

  @ManyToOne(() => Gender, (gender) => gender.user)
  gender: Gender;

  @ManyToOne(() => Religion, (religion) => religion.user)
  religion: Religion;

  @Column({ nullable: true })
  user_bio: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  passport: string;

  @Column({ nullable: true })
  last_login: string;

  @Column({ nullable: true })
  user_2fa_status: string;

  @Column({ nullable: true })
  secondary_email: string;

  @Column({ nullable: true })
  recovery_email: string;

  @Column({ nullable: true })
  relation_status: string;

  @Column({ nullable: true })
  home_town: string;

  @Column({ nullable: true })
  birth_place: string;

  @Column({ nullable: true })
  blood_group: string;

  @Column({ nullable: true })
  reset_password_token: string;

  @Column({ nullable: true })
  reset_password_token_expires: Date;

  @Column({ nullable: true })
  user_role: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  ip_address: string;

  @Column({ nullable: true })
  created_by: string;

  @Column({ nullable: true })
  updated_by: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ nullable: true })
  __v: number;

  @Column({ nullable: true })
  lock_profile: boolean;

  @Column('text', { array: true, nullable: true })
  email_list: string[];

  @Column('text', { array: true, nullable: true })
  phone_list: string[];

  @Column({ nullable: true })
  user_about: string;

  @Column({ nullable: true })
  user_nickname: string;

  @Column({ nullable: true })
  present_town: string;

  @Column({ nullable: true })
  turn_on_earning_dashboard: boolean;

  @Column({ nullable: true })
  date_of_birth_show_type: string;

  @Column({ nullable: true })
  email_privacy: string;

  @Column({ nullable: true })
  fullName: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => StoryImage, (storyImage) => storyImage.user)
  storyImages: StoryImage[];

  @OneToMany(() => StoryText, (storyText) => storyText.user)
  storyTexts: StoryText[];
  
}