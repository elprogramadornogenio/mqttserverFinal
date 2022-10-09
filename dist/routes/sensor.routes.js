"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const sensores_1 = __importDefault(require("../controller/sensores"));
const validarCampos_1 = __importDefault(require("../middlewares/validarCampos"));
const routerSensor = (0, express_1.Router)();
routerSensor.post('/sensor', [
    (0, express_validator_1.check)('id_Usuario', 'El id del usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'El nombre del sensor es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('tipo', 'El tipo del sensor es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('topico', 'El tipo del sensor es obligatorio').not().isEmpty(),
    validarCampos_1.default.instance.validarCampos
], sensores_1.default.instance.crearSensor);
routerSensor.get('/listarSensores', sensores_1.default.instance.listarSensores);
routerSensor.get('/listarSensoresUsuario', [
    (0, express_validator_1.check)('id', 'El id del usuario es obligatorio').not().isEmpty(),
    validarCampos_1.default.instance.validarCampos
], sensores_1.default.instance.listarSensoresUsuario);
routerSensor.put('/sensor', [
    (0, express_validator_1.check)('_id', 'El id del sensor es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('id_Usuario', 'El id del usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'El nombre del sensor es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('tipo', 'El tipo del sensor es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('topico', 'El topico del sensor es obligatorio').not().isEmpty(),
    validarCampos_1.default.instance.validarCampos
], sensores_1.default.instance.editarSensor);
routerSensor.delete('/sensor', [
    (0, express_validator_1.check)('id', 'El id del sensor es obligatorio').not().isEmpty(),
    validarCampos_1.default.instance.validarCampos
], sensores_1.default.instance.eliminarSensor);
routerSensor.delete('/sensorDatos', [
    (0, express_validator_1.check)('id_Sensor', 'El id del usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('topico', 'El topico del sensor es obligatorio').not().isEmpty(),
    validarCampos_1.default.instance.validarCampos
], sensores_1.default.instance.eliminarDatosSensor);
routerSensor.get('/buscarSensor', [
    (0, express_validator_1.check)('id', 'El id del sensor es obligatorio').not().isEmpty(),
    validarCampos_1.default.instance.validarCampos
], sensores_1.default.instance.buscarSensor);
exports.default = routerSensor;
