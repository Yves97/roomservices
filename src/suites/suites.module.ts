import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuitesController } from './suites.controller';
import { SuitesRepository } from './suites.repository';
import { SuitesServices } from './suites.services';

@Module({
    imports : [
        TypeOrmModule.forFeature([SuitesRepository])
    ],
  controllers: [SuitesController],
  providers : [SuitesServices]
})
export class SuitesModule {}
