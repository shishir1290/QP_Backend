import { Gender } from 'src/gender/entities/gender.entity';
import { Religion } from 'src/religion/entities/religion.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  profile_pic: string;

  @Column({ nullable: true })
  cover_pic: string;

  @Column({ nullable: true })
  user_status: string;

  @ManyToOne(() => Gender, { nullable: true })
  gender: Gender;

  @ManyToOne(() => Religion, { nullable: true })
  religion: Religion;

  @Column({ nullable: true })
  date_of_birth: Date;

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

  @Column({ nullable: true})
  reset_password_token_expires: string;

  @Column({ nullable: true })
  user_role: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  ip_address: string;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @VersionColumn({ nullable: true })
  __v: number;

  @Column({ nullable: true })
  lock_profile: string;

  @Column("simple-array", { nullable: true })
  email_list: string[];

  @Column("simple-array", { nullable: true })
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
  isProfileVerified: boolean;

  @Column({ nullable: true})
  fullName: string;

  @Column()
  password: string;
}
