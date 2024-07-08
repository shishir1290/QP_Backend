import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostReaction {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  post_id: string;

  @Column()
  reaction_type: string;

  @Column()
  user_id: string;
}
