import { Secret } from "jsonwebtoken";


// Server
export const SERVER_PORT: number = Number(process.env.PORT) || 5000;
// DB if not found then proof 'mongodb://127.0.0.0:27017/dataIoT'
export const DB_CNN: string = 'mongodb://localhost:27017/dataIoT';
// Create jsonwebtokens key
export const SECRET_JWT: Secret = 'M1Clav3S3creta1oT';
// Connection protocol mqtt if not found then proof 'mqtt://127.0.0.0:1883'
export const MQTT: string = 'mqtt://localhost:1883';

// Cloudinary
export const cloud_name: string = 'dkdwgznvg';
export const api_key: string = '535479672546232';
export const api_secret: string = 'dh8B8mDNrrCj5r2ChraAfhKZHjs';


// Email

export const EMAIL_HOST: string = "smtp.gmail.com";
export const EMAIL_PORT: number = 465;
export const EMAIL_SECURE: boolean = true;
export const EMAIL_USER: string = 'elprogramador.nogenio@gmail.com';
export const EMAIL_PASSWORD: string = 'tgkiglnchthhfjbx';