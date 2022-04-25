import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.services';
import {JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports : [
        TypeOrmModule.forFeature([AuthRepository]),
        JwtModule.register({
            secret : 'roomSecret',
            signOptions : {
                expiresIn : 3600
            }
        }),
        PassportModule.register({defaultStrategy : 'jwt'})
],
    controllers: [AuthController],
    providers : [
        AuthServices,
        JwtStrategy
    ],
    exports : [
        JwtStrategy,
        PassportModule
    ]
})
export class AuthModule {}
