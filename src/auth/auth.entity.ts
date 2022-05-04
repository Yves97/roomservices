import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Suites } from "src/suites/suites.entity";
import { Reservations } from "src/reservations/reservations.entity";
@Entity()
@Unique(['email','phone'])
export class Auth extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    email : string;

    @Column()
    phone : string;

    @Column()
    password : string;

    @Column()
    salt : string;

    // @ManyToMany(() => Suites)
    // @JoinTable()
    // suites : Suites[]

    async validatePassword(password:string):Promise<boolean>{
        const isPasswordMatched = await bcrypt.compare(password,this.password)
        return isPasswordMatched;
    }

}