import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AuthRole } from "./auth.roles.enum";

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

    @Column({
        type : 'enum',
        enum : AuthRole,
        default : AuthRole.CLIENT
    })
    role : AuthRole;

    // @ManyToMany(() => Suites)
    // @JoinTable()
    // suites : Suites[]

    async validatePassword(password:string):Promise<boolean>{
        const isPasswordMatched = await bcrypt.compare(password,this.password)
        return isPasswordMatched;
    }

}