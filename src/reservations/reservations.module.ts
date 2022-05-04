import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsController } from './reservations.controller';
import { ReservationRepository } from './reservations.repository';
import { AuthModule } from 'src/auth/auth.module';
import { SuitesModule } from 'src/suites/suites.module';
import { ReservationsServices } from './reservations.services';
@Module({
  imports : [TypeOrmModule.forFeature([ReservationRepository]),AuthModule,SuitesModule],
  controllers: [ReservationsController],
  providers : [ReservationsServices]
})
export class ReservationsModule {}
