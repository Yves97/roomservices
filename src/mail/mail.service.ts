import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Auth } from 'src/auth/auth.entity';

@Injectable()
export class MailService {
    constructor(private mailerService : MailerService){}

    async userWelcome(user : Auth){
        await this.mailerService.sendMail({
            to : user.email,
            subject : 'Bienvenue a roomservices',
            template : 'welcome',
            context : {
                name : user.name
            }
        })
    }


}
