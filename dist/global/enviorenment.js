"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQTT = exports.SECRET_JWT = exports.DB_CNN = exports.SERVER_PORT = void 0;
exports.SERVER_PORT = Number(process.env.PORT) || 5000;
exports.DB_CNN = 'mongodb://localhost:27017/dataIoT';
exports.SECRET_JWT = 'M1Clav3S3creta1oT';
exports.MQTT = 'mqtt://localhost:1883';
