import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {Strategy,ExtractJwt} from 'passport-jwt';
import { AuthRepository } from "./auth.repository";
import { JwtPayload } from "./jwt-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository : AuthRepository
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : 'roomSecret'
        })
    }


    async validate(payload : JwtPayload){
        const {name,email,phone} = payload
        const user = this.authRepository.findOne({email})
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}