import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ContactServices } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
    constructor(
        private contactService : ContactServices
    ){}


    @Get()
    async getContacts(){
        return await this.contactService.list()
    }

    @Post()
    async contactUs(@Body(ValidationPipe) createContactDto : CreateContactDto ){
        return await this.contactService.contactUs(createContactDto)
    }

}
