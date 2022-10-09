"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dato = void 0;
const mongoose_1 = require("mongoose");
const DatoSchema = new mongoose_1.Schema({
    id_Sensor: {
        type: String,
        required: true
    },
    dato: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
});
exports.Dato = (0, mongoose_1.model)('Dato', DatoSchema);
