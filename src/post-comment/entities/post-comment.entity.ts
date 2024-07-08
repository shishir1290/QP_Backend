import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  post_id: string;

  @Column()
  user_id: string;

  @Column()
  comment_text: string;

  @Column({ nullable: true })
  image_or_video?: string;
}
