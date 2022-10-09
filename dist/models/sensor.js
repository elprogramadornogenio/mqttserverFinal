"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sensor = void 0;
const mongoose_1 = require("mongoose");
const SensorSchema = new mongoose_1.Schema({
    id_Usuario: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    tipo: {
        type: String,
        required: true
    },
    topico: {
        type: String,
        required: true,
        unique: true
    }
});
exports.Sensor = (0, mongoose_1.model)('Sensor', SensorSchema);
