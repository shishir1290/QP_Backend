import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class StoryImage {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    constructor(){
        this._id = uuidv4();
    }

    @Column({nullable: true})
    image: string;

    @Column({nullable: true})
    image_scale: string;

    @Column({nullable: true})
    image_position_x: string;

    @Column({nullable: true})
    image_position_y: string;

    @Column({nullable: true})
    post: string;

    @Column({nullable: true})
    title: string;

    @Column({nullable: true})
    text_color: string;

    @Column({nullable: true})
    background_color: string;

    @Column({nullable: true})
    text_size: string;

    @Column({nullable: true})
    text_position: string;

    @Column({nullable: true})
    text_padding: string;

    @Column({nullable: true})
    text_family: string;

    @Column({nullable: true})
    text_style: string;

    @Column({nullable: true})
    text_weight: string;

    @Column({nullable: true})
    text_decoration: string;

    @Column({nullable: true})
    text_shadow: string;

    @Column({nullable: true})
    text_outline: string;

    @Column({nullable: true})
    text_align: string;

    @Column({nullable: true})
    created_by: string;

    @Column({nullable: true})
    updated_by: string;

    @Column({nullable: true})
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;

    @Column({nullable: true})
    deletedAt: Date;

    @Column({nullable: true})
    __v: number;

    @ManyToOne(() => User, (user) => user.storyImages)
    user: User;

}
