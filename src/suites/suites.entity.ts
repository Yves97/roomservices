import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { SuitesRanking } from './suites.ranking.enum';


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

}