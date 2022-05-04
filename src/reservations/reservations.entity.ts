import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Auth } from "src/auth/auth.entity";
import { Suites } from "src/suites/suites.entity";


@Entity()
export class Reservations extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @CreateDateColumn()
    createDate : Date;

    @Column()
    duration : string;

    @Column()
    ranking : string;

    @OneToOne(() => Suites)
    @JoinColumn()
    // @Index({unique : false})
    // @Column()
    suite : number;

    @OneToOne(() => Auth)
    @JoinColumn()
    // @Index({unique : false})
    // @Column()
    user : number;

}