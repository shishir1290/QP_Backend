import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';


@Entity()
export class StoryText {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    constructor(){
        this._id = uuidv4();
    }

    @Column()
    text: string;

    @Column({nullable: true})
    text_color: string;

    @Column({nullable: true})
    background_color: string;

    @Column({nullable: true})
    font_size: string;

    @Column({nullable: true})
    text_position: string;

    @Column({nullable: true})
    font_family: string;

    @Column({nullable: true})
    text_style: string;

    @Column({nullable: true})
    text_padding: string;

    @Column({nullable: true})
    text_weight: string;

    @Column({nullable: true})
    text_align: string;

    @Column({nullable: true})
    text_decoration: string;

    @Column({nullable: true})
    text_shadow: string;

    @Column({nullable: true})
    text_outline: string;

    @Column({nullable: true})
    text_underline: string;

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

    @ManyToOne(() => User, (user) => user.storyTexts)
    user: User;
}