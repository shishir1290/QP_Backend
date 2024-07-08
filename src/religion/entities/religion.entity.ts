import { User } from "src/user/entities/user.entity";
import { Column, Entity,  OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Religion {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    constructor(){
        this._id = uuidv4();
    }

    @Column()
    religion_name: string;

    @Column({nullable: true})
    data_status: string;

    @Column({nullable: true})
    ip_address: string;

    @Column({nullable: true})
    created_by: string;

    @Column({nullable: true})
    updated_by: string;

    @Column({nullable: true})
    CreatedAt: Date;

    @Column({nullable: true})
    UpdatedAt: Date;

    @Column({nullable: true})
    __v: number;


    @OneToMany(() => User, (user) => user.religion)
    user: User;
}
