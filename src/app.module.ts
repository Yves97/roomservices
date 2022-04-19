import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuitesModule } from './suites/suites.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    SuitesModule,
    MulterModule.register({
    dest : './file'
  })],
  providers: [AppService],
})
export class AppModule {}
