import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Images } from "./images.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    _id: string

    constructor(){
        this._id = uuidv4()
    }

    @Column({nullable: true})
    title: string;

    @Column({nullable: true})
    content: string;

    @Column("simple-array", { nullable: true })
    postImage: string[];

    @Column({nullable: true})
    postDate: Date;

    @Column({nullable: true})
    postStatus: string;

    @Column({nullable: true})
    postView: number;

    @Column({nullable: true})
    postLike: number;

    @Column({nullable: true})
    postComment: number;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @OneToMany(() => Images, (images) => images.post)
    images: Images[]
}
