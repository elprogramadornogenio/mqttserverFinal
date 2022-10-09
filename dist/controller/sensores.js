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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sensor_1 = require("../models/sensor");
const ServerMqtt_1 = __importDefault(require("../classes/ServerMqtt"));
const datos_1 = require("../models/datos");
class Sensores {
    static get instance() {
        return this._instance || (this._instance = new Sensores());
    }
    crearSensor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_Usuario, nombre, tipo, topico } = req.body;
            /* const id_Usuario: string = req.body.id_Usuario;
            const nombre: string = req.body.nombre;
            const tipo: string = req.body.tipo;
            const topico: string = req.body.topico; */
            try {
                const sensor = yield sensor_1.Sensor.findOne({ nombre });
                if (sensor) {
                    return res.status(400).json({
                        ok: false,
                        msg: `El sensor con nombre: ${nombre} ya existe`
                    });
                }
                const topic = yield sensor_1.Sensor.findOne({ topico });
                if (topic) {
                    return res.status(400).json({
                        ok: false,
                        msg: `El sensor con topico: ${topico} ya existe`
                    });
                }
                const isensor = {
                    nombre,
                    tipo,
                    id_Usuario,
                    topico
                };
                const dbSensor = new sensor_1.Sensor(isensor);
                yield dbSensor.save();
                const mqtt = ServerMqtt_1.default.instance.client;
                mqtt.subscribe(topico);
                return res.status(201).json({
                    ok: true,
                    msg: 'El sensor se ha creado exitosamente'
                });
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
        });
    }
    editarSensor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, id_Usuario, nombre, tipo, topico } = req.body;
            const sensor = yield sensor_1.Sensor.findOne({ nombre });
            console.log("editar", sensor === null || sensor === void 0 ? void 0 : sensor.nombre, nombre);
            console.log("editar", sensor === null || sensor === void 0 ? void 0 : sensor._id.toString(), _id);
            if ((sensor === null || sensor === void 0 ? void 0 : sensor.nombre) === nombre && (sensor === null || sensor === void 0 ? void 0 : sensor._id.toString()) !== _id) {
                return res.status(400).json({
                    ok: false,
                    msg: `El sensor con nombre: ${nombre} ya existe en otro sensor`
                });
            }
            const topic = yield sensor_1.Sensor.findOne({ topico });
            if ((topic === null || topic === void 0 ? void 0 : topic.topico) === topico && (topic === null || topic === void 0 ? void 0 : topic._id.toString()) !== _id) {
                return res.status(400).json({
                    ok: false,
                    msg: `El sensor con topico: ${topico} ya existe en otro sensor`
                });
            }
            const dbSensor = yield sensor_1.Sensor.findById(_id);
            if (topico !== (dbSensor === null || dbSensor === void 0 ? void 0 : dbSensor.topico)) {
                const mqtt = ServerMqtt_1.default.instance.client;
                mqtt.unsubscribe(dbSensor === null || dbSensor === void 0 ? void 0 : dbSensor.topico);
                mqtt.subscribe(topico);
            }
            const isensor = {
                nombre,
                tipo,
                id_Usuario,
                topico
            };
            try {
                const sensor = yield sensor_1.Sensor.updateOne({ _id }, {
                    $set: isensor
                });
                if (!sensor) {
                    return res.status(400).json({
                        ok: false,
                        msg: `El Sensor no se ha podido actualizar`
                    });
                }
                else {
                    return res.status(201).json({
                        ok: true,
                        msg: 'El Sensor se ha actualizado exitosamente'
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
        });
    }
    eliminarSensor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            try {
                const sensor = yield sensor_1.Sensor.deleteOne({ _id: id });
                if (sensor.acknowledged && sensor.deletedCount) {
                    return res.status(201).json({
                        ok: true,
                        msg: 'El Sensor se ha eliminado exitosamente'
                    });
                }
                else {
                    return res.status(400).json({
                        ok: false,
                        msg: `No se ha podido encontrar información de sensor`
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
        });
    }
    eliminarDatosSensor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Sensor = req.query.id_Sensor;
            const topico = req.query.topico;
            try {
                const datos = yield datos_1.Dato.deleteMany({ id_Sensor });
                console.log(datos);
                if (datos.acknowledged && datos.deletedCount) {
                    const mqtt = ServerMqtt_1.default.instance.client;
                    mqtt.unsubscribe(topico);
                    return res.status(201).json({
                        ok: true,
                        msg: 'El Sensor y los datos se ha eliminado exitosamente'
                    });
                }
                return res.status(201).json({
                    ok: true,
                    msg: 'El Sensor no tiene datos registrados'
                });
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador de esto'
                });
            }
        });
    }
    listarSensores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sensor = yield sensor_1.Sensor.find();
                if (sensor.length !== 0) {
                    return res.status(200).json({
                        ok: true,
                        listaSensores: sensor
                    });
                }
                else {
                    return res.status(200).json({
                        ok: true
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
        });
    }
    listarSensoresUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            console.log(id);
            try {
                const sensor = yield sensor_1.Sensor.find({ id_Usuario: id });
                if (sensor.length !== 0) {
                    return res.status(200).json({
                        ok: true,
                        listaSensores: sensor
                    });
                }
                else {
                    return res.status(200).json({
                        ok: true,
                        listarSensores: []
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
        });
    }
    buscarSensor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            try {
                const sensor = yield sensor_1.Sensor.findById(id);
                if (sensor) {
                    return res.status(200).json({
                        ok: true,
                        listaSensores: [sensor]
                    });
                }
                else {
                    return res.status(200).json({
                        ok: true,
                        sensor: []
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
        });
    }
}
exports.default = Sensores;
