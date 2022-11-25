"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_PASSWORD = exports.EMAIL_USER = exports.EMAIL_SECURE = exports.EMAIL_PORT = exports.EMAIL_HOST = exports.api_secret = exports.api_key = exports.cloud_name = exports.MQTT = exports.SECRET_JWT = exports.DB_CNN = exports.SERVER_PORT = void 0;
// Server
exports.SERVER_PORT = Number(process.env.PORT) || 5000;
// DB if not found then proof 'mongodb://127.0.0.0:27017/dataIoT'
exports.DB_CNN = 'mongodb://localhost:27017/dataIoT';
// Create jsonwebtokens key
exports.SECRET_JWT = 'M1Clav3S3creta1oT';
// Connection protocol mqtt if not found then proof 'mqtt://127.0.0.0:1883'
exports.MQTT = 'mqtt://localhost:1883';
// Cloudinary
exports.cloud_name = 'dkdwgznvg';
exports.api_key = '535479672546232';
exports.api_secret = 'dh8B8mDNrrCj5r2ChraAfhKZHjs';
// Email
exports.EMAIL_HOST = "smtp.gmail.com";
exports.EMAIL_PORT = 465;
exports.EMAIL_SECURE = true;
exports.EMAIL_USER = 'elprogramador.nogenio@gmail.com';
exports.EMAIL_PASSWORD = 'tgkiglnchthhfjbx';
