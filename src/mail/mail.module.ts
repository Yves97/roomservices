import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

@Module({
    imports : [
        MailerModule.forRoot({
            transport : {
                host : 'smtp.mailtrap.io',
                secure : false,
                auth : {
                    user : '289d486488d553',
                    pass : '981a77017bb278',
                },
                port : 2525,
            },
            defaults : {
                from : ' "From noreply" <noreply@roomservices.com> '
            },
            template : {
                dir : __dirname + '/templates',
                adapter : new HandlebarsAdapter(),
                options: { 
                    strict : true,
                },
            },

            
            
        })
    ],
  providers: [MailService],
  exports : [MailService]
})
export class MailModule {}
