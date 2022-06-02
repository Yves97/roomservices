import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SuitesController } from './suites.controller';
import { SuitesRepository } from './suites.repository';
import { SuitesServices } from './suites.services';

@Module({
    imports : [
        TypeOrmModule.forFeature([SuitesRepository]),AuthModule
    ],
  controllers: [SuitesController],
  providers : [SuitesServices]
})
export class SuitesModule {}
