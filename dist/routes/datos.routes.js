"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const datos_1 = __importDefault(require("../controller/datos"));
const routerDatos = (0, express_1.Router)();
routerDatos.post('/dato', datos_1.default.instance.crearDatos);
routerDatos.get('/buscarDatos', datos_1.default.instance.consultarDatos);
exports.default = routerDatos;
