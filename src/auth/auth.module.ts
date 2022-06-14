import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.services';
import {JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from 'src/mail/mail.service';

@Module({
    imports : [
        TypeOrmModule.forFeature([AuthRepository]),
        JwtModule.register({
            secret : 'roomSecret',
            signOptions : {
                expiresIn : 10800
            }
        }),
        PassportModule.register({defaultStrategy : 'jwt'}),
        MailerModule,
],
    controllers: [AuthController],
    providers : [
        AuthServices,
        JwtStrategy,
        MailService
    ],
    exports : [
        JwtStrategy,
        PassportModule,
        AuthServices
    ]
})
export class AuthModule {}
