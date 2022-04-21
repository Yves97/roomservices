import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.services';

@Module({
    imports : [TypeOrmModule.forFeature([AuthRepository])],
    controllers: [AuthController],
    providers : [AuthServices]
})
export class AuthModule {}
