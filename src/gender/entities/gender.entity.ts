import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@Entity()
export class Gender {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  gender_name: string;

  @Column({ nullable: true })
  data_status: string;

  @Column({ nullable: true })
  ip_address: string;

  @Column({ nullable: true })
  created_by: string;

  @Column({ nullable: true })
  update_by: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  __v: number;
}