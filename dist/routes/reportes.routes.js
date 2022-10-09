"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const reportes_1 = __importDefault(require("../controller/reportes"));
const validarCampos_1 = __importDefault(require("../middlewares/validarCampos"));
const routerReportes = (0, express_1.Router)();
routerReportes.post('/consultarDatosFecha', [
    (0, express_validator_1.check)('fecha_ini', 'La fecha inicial es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fecha_final', 'La fecha final es obligatorio').not().isEmpty(),
    validarCampos_1.default.instance.validarCampos
], reportes_1.default.instance.consultarDatosFecha);
routerReportes.post('/consultarDatoMayor', [], reportes_1.default.instance.consultarDatoMayor);
routerReportes.post('/consultarDatoMenor', [], reportes_1.default.instance.consultarDatoMenor);
routerReportes.post('/consultarDatoPromedio', [], reportes_1.default.instance.consultarDatoPromedio);
routerReportes.post('/consultarDatosFechaId', [
    (0, express_validator_1.check)('id_Sensor', 'El id del sensor es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fecha_ini', 'La fecha inicial es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fecha_final', 'La fecha final es obligatorio').not().isEmpty(),
    validarCampos_1.default.instance.validarCampos
], reportes_1.default.instance.consultarDatosFechaId);
routerReportes.post('/consultarDatoMayorId', [
    (0, express_validator_1.check)('id_Sensor', 'El id del sensor es obligatorio').not().isEmpty(),
    validarCampos_1.default.instance.validarCampos
], reportes_1.default.instance.consultarDatoMayorId);
routerReportes.post('/consultarDatoMenorId', [
    (0, express_validator_1.check)('id_Sensor', 'El id del sensor es obligatorio').not().isEmpty(),
    validarCampos_1.default.instance.validarCampos
], reportes_1.default.instance.consultarDatoMenorId);
routerReportes.post('/consultarDatoPromedioId', [
    (0, express_validator_1.check)('id_Sensor', 'El id del sensor es obligatorio').not().isEmpty(),
    validarCampos_1.default.instance.validarCampos
], reportes_1.default.instance.consultarDatoPromedioId);
routerReportes.post('/consultarDatoMayorIds', [], reportes_1.default.instance.consultarDatoMayorIds);
routerReportes.post('/consultarDatoMenorIds', [], reportes_1.default.instance.consultarDatoMenorIds);
routerReportes.post('/consultarDatoPromedioIds', [], reportes_1.default.instance.consultarDatoPromedioIds);
exports.default = routerReportes;
