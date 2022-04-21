import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuitesModule } from './suites/suites.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    SuitesModule,
    MulterModule.register({
    dest : './file'
  }),
    AuthModule],
  providers: [AppService],
})
export class AppModule {}
