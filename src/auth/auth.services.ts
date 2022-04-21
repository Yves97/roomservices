import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "./auth.entity";
import { AuthRepository } from "./auth.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthServices {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository : AuthRepository,
    ){}

    async createUser(user : CreateUserDto):Promise<Auth>{
        const newUser = new Auth()
        const {name,email,phone,password} = user
        newUser.name = name
        newUser.email = email
        newUser.salt = await bcrypt.genSalt()
        newUser.password = await this.hashPassword(password,newUser.salt)
        newUser.phone = phone
        const create = this.authRepository.create(newUser)
        
        try{
            await this.authRepository.save(newUser)
            // await this.mailServices.sendWelcome(user)
            return create;
        }catch(e){
            if(e.code === 'ER_DUP_ENTRY'){
                throw new ConflictException('Cet utilisateur existe deja')
            }else{
                throw new InternalServerErrorException()
            }
        }
    }
    async getUser(id :number){
        return await this.authRepository.findOne(id)
    }

    private async hashPassword(password:string,salt:string):Promise<string>{
        return bcrypt.hash(password,salt)
    }

    async validateUserPassword(userDto : CreateUserDto){
        const {email,password} = userDto
        const user = await this.authRepository.findOne({email})
        // console.log('user',user)
        if(user && await (await user).validatePassword(password)){
            console.log('in user ok')
            return user;
        }else{
            return null
        }
    }
}