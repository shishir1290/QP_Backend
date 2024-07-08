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

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  profile_pic: string;

  @Column({ nullable: true })
  cover_pic: string;

  @Column({ nullable: true })
  user_status: string;

  @ManyToOne(() => Gender)
  gender: Gender;

  @ManyToOne(() => Religion)
  religion: Religion;

  @Column({ nullable: true })
  date_of_birth: Date;

  @Column({ nullable: true })
  user_bio: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  passport: string;

  @Column()
  last_login: string;

  @Column({ nullable: true })
  user_2fa_status: string;

  @Column({ nullable: true })
  secondary_email: string;

  @Column({ nullable: true })
  recovery_email: string;

  @Column()
  relation_status: string;

  @Column()
  home_town: string;

  @Column()
  birth_place: string;

  @Column({ nullable: true })
  blood_group: string;

  @Column()
  reset_password_token: string;

  @Column()
  reset_password_token_expires: string;

  @Column({ nullable: true })
  user_role: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  ip_address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  __v: number;

  @Column()
  lock_profile: string;

  @Column("simple-array")
  email_list: string[];

  @Column("simple-array", { nullable: true })
  phone_list: string[];

  @Column()
  user_about: string;

  @Column()
  user_nickname: string;

  @Column({ nullable: true })
  present_town: string;

  @Column()
  turn_on_earning_dashboard: boolean;

  @Column()
  date_of_birth_show_type: string;

  @Column()
  email_privacy: string;

  @Column()
  isProfileVerified: boolean;

  @Column()
  fullName: string;

  @Column()
  password: string;
}
