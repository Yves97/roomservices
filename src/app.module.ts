import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuitesModule } from './suites/suites.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { ReservationsModule } from './reservations/reservations.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    SuitesModule,
    ReservationsModule,
    MulterModule.register({
    dest : './file'
  }),
    AuthModule,
    MailModule],
  providers: [AppService],
})
export class AppModule {}
