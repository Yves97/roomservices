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

    @Column()
    price :number;

    @Column()
    ranking : SuitesRanking;

    @Column()
    image : string;

    // @OneToMany(() => Reservations,(reservations)=> reservations.id)
    // public reservations : Reservations
}