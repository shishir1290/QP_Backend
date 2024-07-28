import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Story {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  image_scale?: string;

  @Column({ nullable: true })
  image_position_x?: string;

  @Column({ nullable: true })
  image_position_y?: string;

  @Column({ nullable: true })
  post?: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  text_color?: string;

  @Column({ nullable: true })
  background_color?: string;

  @Column({ nullable: true })
  text_size?: string;

  @Column({ nullable: true })
  text_position?: string;

  @Column({ nullable: true })
  text_padding?: string;

  @Column({ nullable: true })
  text_family?: string;

  @Column({ nullable: true })
  text_style?: string;

  @Column({ nullable: true })
  text_weight?: string;

  @Column({ nullable: true })
  text_decoration?: string;

  @Column({ nullable: true })
  text_shadow?: string;

  @Column({ nullable: true })
  text_outline?: string;

  @Column({ nullable: true })
  text_align?: string;

  @Column({ nullable: true })
  created_by?: string;

  @Column({ nullable: true })
  updated_by?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  UpdatedAt: Date;

  @Column({ default: 0 })
  __v: number;

  @Column({type: 'uuid'})
    user_id: string;
}
