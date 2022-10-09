import { Secret } from "jsonwebtoken";

export const SERVER_PORT: number = Number(process.env.PORT) || 5000;
export const DB_CNN: string = 'mongodb://localhost:27017/dataIoT';
export const SECRET_JWT: Secret = 'M1Clav3S3creta1oT';
export const MQTT: string = 'mqtt://localhost:1883';