import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
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
    
    async validatePassword(password:string):Promise<boolean>{
        const hash = await bcrypt.hash(password,this.salt)
        console.log('hash=',hash)
        console.log('password=',this.password)
        return hash === this.password
    }

}