import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Post } from "./post.entity";

@Entity()
export class Images{

    @PrimaryGeneratedColumn('uuid')
    _id: string;

    constructor(){
        this._id = uuidv4();
    }

    @Column()
    image: string;

    @ManyToOne(() => Post, (post) => post.images)
    post: Post;

}