import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "./contact.entity";
import { ContactRepository } from "./contact.repository";
import { CreateContactDto } from "./dto/create-contact.dto";

export class ContactServices {
    constructor(
        @InjectRepository(ContactRepository)
        private contactRepository : ContactRepository
    ){}


    async list(){
        const contacts = await this.contactRepository.find()
        return contacts
    }

    async contactUs(createContactDto : CreateContactDto){
        const contact = new Contact()
        contact.firstname = createContactDto.firstname
        contact.lastname = createContactDto.lastname
        contact.phone = createContactDto.phone
        contact.email = createContactDto.email
        contact.message = createContactDto.message

        const create = await this.contactRepository.create(contact)
        return await this.contactRepository.save(contact)

    }
}