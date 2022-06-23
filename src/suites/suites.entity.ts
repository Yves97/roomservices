import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, JoinColumn } from 'typeorm';
import { SuitesRanking } from './suites.ranking.enum';
import { Auth } from 'src/auth/auth.entity';
import { Reservations } from 'src/reservations/reservations.entity';

@Entity()
export class Suites extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column("text")
    description : string;

    @Column()
    price :number;

    @Column()
    ranking : SuitesRanking;

    @Column()
    image : string;

    @Column()
    status  : number;

    // @OneToMany(() => Reservations,(reservations)=> reservations.id)
    // public reservations : Reservations
}