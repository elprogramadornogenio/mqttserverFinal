import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EMAIL_PORT, EMAIL_HOST, EMAIL_SECURE, EMAIL_USER, EMAIL_PASSWORD } from '../global/enviorenment';

export default class Email {

    private static _instance: Email;
    private transporter: Transporter<SMTPTransport.SentMessageInfo>;

    public static get instance() {
        return this._instance || (this._instance = new Email());
    }

    constructor() {
        this.transporter = createTransport({
            host: EMAIL_HOST,
            port: EMAIL_PORT,
            secure: EMAIL_SECURE,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD
            }
        });
    }

    public verificarEmail() {
        this.transporter.verify().then(() => {
            console.log('Listo para enviar emails');
        });
    }

    public async enviarEmail(email: string, passwordNew: string) {
        return await this.transporter.sendMail({
            from: `"Recuperación de Contraseña 👻" ${EMAIL_USER}`, // sender address
            to: email, // list of receivers
            subject: "Recuperación de Contraseña ✔", // Subject line
            text: "Recuerde que su contraseña es privada recuerde cambiarla o si quiere puede conservarla puesto que es generada automaticamente con ciertos requerimientos de seguridad", // plain text body
            html: `<b> Su email es ${email} y su contraseña será ${passwordNew} por favor cambie su contraseña</b>`, // html body
        });
    }
}