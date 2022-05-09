import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Contact extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    firstname : string;

    @Column()
    lastname : string;
    
    @Column()
    phone : string;

    @Column()
    message : string;

    @Column()
    email : string;

}