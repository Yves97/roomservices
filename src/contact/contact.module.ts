import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './contact.controller';
import { ContactRepository } from './contact.repository';
import { ContactServices } from './contact.service';

@Module({
  imports : [TypeOrmModule.forFeature([ContactRepository])],
  controllers: [ContactController],
  providers : [ContactServices]
})
export class ContactModule {}
