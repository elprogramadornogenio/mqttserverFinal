"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuario_1 = __importDefault(require("../controller/usuario"));
const validarJwt_1 = __importDefault(require("../middlewares/validarJwt"));
const validarCampos_1 = __importDefault(require("../middlewares/validarCampos"));
const routerUsuario = (0, express_1.Router)();
routerUsuario.post('/registrar', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellido', 'El apellido es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    validarCampos_1.default.instance.validarCampos
], usuario_1.default.instance.crearUsuario);
routerUsuario.post('/login', [
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    validarCampos_1.default.instance.validarCampos
], usuario_1.default.instance.loginUsuario);
routerUsuario.get('/jwt', validarJwt_1.default.instance.validarJWT, usuario_1.default.instance.revalidarToken);
exports.default = routerUsuario;
