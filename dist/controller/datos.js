"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const datos_1 = require("../models/datos");
const sensor_1 = require("../models/sensor");
class Datos {
    static get instance() {
        return this._instance || (this._instance = new Datos());
    }
    crearDatos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Sensor = req.body.id_Sensor;
            const dato = Number(req.body.dato);
            const fecha = new Date();
            const idato = {
                id_Sensor,
                dato,
                fecha
            };
            try {
                const dbDato = new datos_1.Dato(idato);
                yield dbDato.save();
                return res.status(201).json({
                    ok: true,
                    msg: 'El dato se ha creado'
                });
            }
            catch (error) {
                //console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
        });
    }
    guardarDatos(topico, dato) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sensor = yield sensor_1.Sensor.findOne({ topico });
                if (sensor) {
                    const idato = {
                        id_Sensor: sensor.id,
                        dato,
                        fecha: new Date()
                    };
                    const dbDato = new datos_1.Dato(idato);
                    yield dbDato.save();
                }
            }
            catch (error) {
                console.log('dato no se pudo guardar');
            }
        });
    }
    consultarDatos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            console.log('111111111', id);
            try {
                const datos = yield datos_1.Dato.find({ id_Sensor: id }).sort({ $natural: -1 }).limit(5);
                if (datos.length !== 0) {
                    return res.status(201).json({
                        ok: true,
                        datos: datos.reverse()
                    });
                }
                else {
                    return res.status(201).json({
                        ok: true,
                        datos: []
                    });
                }
            }
            catch (error) {
                //console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
        });
    }
}
exports.default = Datos;
