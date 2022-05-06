import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b95e8edce2eeb7",
      pass: "9a90c547df7fcc"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject,body}: SendMailData){
       
        await transport.sendMail({
            from:'Equipe Feedget <oi@feedget.com>',
            to:'Felipe Almeida <falcaoab10@gmail.com>',
            subject,
            html: body
            });
    }
}