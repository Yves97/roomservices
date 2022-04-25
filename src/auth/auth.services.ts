import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "./auth.entity";
import { AuthRepository } from "./auth.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { UpdatePayload } from "./update-payload.interface";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Injectable()
export class AuthServices {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository : AuthRepository,
        private jwtService : JwtService
    ){}

    async createUser(user : CreateUserDto):Promise<void>{
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
        if(user && await user.validatePassword(password)){
            return user;
        }else{
            return null
        }
    }

    async loginUser(userDto:CreateUserDto):Promise<{accessToken : string}>{
        const user = await this.validateUserPassword(userDto)
        if(!user){
            throw new UnauthorizedException("Mot de passe ou e-mail invalide")
        }
        const payload : JwtPayload = {
            id : user.id,
            name : user.name,
            email : user.email,
            phone : user.phone
        }
        const accessToken = await this.jwtService.sign(payload)

        return {accessToken}
    }

    async updateProfile(id:number,userDto:UpdateUserDto):Promise<void>{
        const user = await this.getUser(id)
        if(!user){
            throw new NotFoundException("Utilisateur introuvable")
        }
        const updatePayload : UpdatePayload = {
            name : userDto.name,
            email : userDto.email,
            phone : userDto.phone
        }
        const update = await this.authRepository.update(id,updatePayload)
    }

    async updatePassword(id:number,credentials : UpdatePasswordDto){
        const {currentPassword,newPassword} = credentials
        const user = await this.authRepository.findOne(id)
        if(!user) throw new NotFoundException('Utilisateur introuvable')
        const isPasswordValid = await user.validatePassword(currentPassword)
        console.log(isPasswordValid)
        if(isPasswordValid){
            const auth = new Auth()
            // auth.salt = await bcrypt.genSalt()
            const nPass = await bcrypt.hash(newPassword,user.salt)
            const update = await this.authRepository.update(id,{password : nPass})
            // console.log(update)
            return update;
        }else{
            throw new UnauthorizedException("Mot de passe incorrecte")
        }
        // console.log(user)

    }
}