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
class Reportes {
    static get instance() {
        return this._instance || (this._instance = new Reportes());
    }
    //primera consulta
    consultarDatosFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //fecha inicial
            //fecha final
            const fecha_ini = req.body.fecha_ini;
            const fecha_final = req.body.fecha_final;
            try {
                const datos = yield datos_1.Dato.find({ fecha: { $gte: fecha_ini, $lte: fecha_final } }).sort({ $natural: -1 }).limit(5);
                if (datos) {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
                else {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
            //returna
            // fechas y datos
        });
    }
    // Segunda consulta
    consultarDatosFechaId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //id_Sensor
            //fecha inicial
            //fecha final
            const id_Sensor = req.body.id_Sensor;
            const fecha_ini = req.body.fecha_ini;
            const fecha_final = req.body.fecha_final;
            try {
                const datos = yield datos_1.Dato.find({ id_Sensor, fecha: { $gte: fecha_ini, $lte: fecha_final } }).limit(5);
                if (datos) {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
                else {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
            //returna
            // fechas y datos
        });
    }
    //tercera consulta
    consultarDatoMayor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //consultar dato mayor
            try {
                const datos = yield datos_1.Dato.find().sort({ dato: -1 }).limit(1);
                console.log(datos);
                if (datos) {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
                else {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
            //returna
            // fechas y dato mayor id sensor
        });
    }
    // Consultar dato mayor por ids
    consultarDatoMayorIds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //consultar dato mayor
            try {
                const datos = yield datos_1.Dato.aggregate([
                    {
                        $group: {
                            _id: "$id_Sensor",
                            max: { $max: "$dato" }
                        }
                    },
                    {
                        $sort: {
                            max: -1
                        }
                    },
                    {
                        $limit: 3
                    }
                ]);
                console.log(datos);
                if (datos) {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
                else {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
            //returna
            // fechas y dato mayor id sensor
        });
    }
    consultarDatoMayorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //
            //consultar dato mayor
            const id_Sensor = req.body.id_Sensor;
            try {
                const datos = yield datos_1.Dato.find({ id_Sensor }).sort({ dato: -1 }).limit(1);
                console.log(datos);
                if (datos) {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
                else {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
            //returna
            // fechas y dato mayor
        });
    }
    // tercera consulta
    consultarDatoMenor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //consultar dato menor
            try {
                const datos = yield datos_1.Dato.find().sort({ dato: 1 }).limit(1);
                console.log(datos);
                if (datos) {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
                else {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
            //returna
            // fechas y dato menor id sensor
        });
    }
    // Consultar dato menor por ids
    consultarDatoMenorIds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //consultar dato menor
            try {
                const datos = yield datos_1.Dato.aggregate([
                    {
                        $group: {
                            _id: "$id_Sensor",
                            min: { $min: "$dato" }
                        }
                    },
                    {
                        $sort: {
                            min: 1
                        }
                    },
                    {
                        $limit: 3
                    }
                ]);
                console.log(datos);
                if (datos) {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
                else {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
            //returna
            // fechas y dato mayor id sensor
        });
    }
    consultarDatoMenorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Sensor = req.body.id_Sensor;
            //consultar dato menor
            try {
                const datos = yield datos_1.Dato.find({ id_Sensor }).sort({ dato: 1 }).limit(1);
                console.log(datos);
                if (datos) {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
                else {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
            //returna
            // fechas y dato menor
        });
    }
    consultarDatoPromedio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //consultar dato promedio de todos los sensores
            try {
                const datos = yield datos_1.Dato.aggregate([
                    {
                        $group: {
                            _id: null,
                            avg: {
                                $avg: "$dato"
                            }
                        },
                    },
                    {
                        $project: {
                            _id: "$_id",
                            avg: { $ceil: "$avg" }
                        }
                    }
                ]);
                if (datos) {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
                else {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
            //returna
            // promedio
        });
    }
    consultarDatoPromedioId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Sensor = req.body.id_Sensor;
            //consultar dato promedio de los sensores en especifico por id
            console.log(id_Sensor);
            try {
                const datos = yield datos_1.Dato.aggregate([
                    {
                        $match: { id_Sensor }
                    },
                    {
                        $group: {
                            _id: "$id_Sensor",
                            avg: {
                                $avg: "$dato"
                            }
                        },
                    },
                    {
                        $project: {
                            _id: "$_id",
                            avg: { $ceil: "$avg" }
                        }
                    }
                ]);
                if (datos) {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
                else {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
            //returna
            // promedio
        });
    }
    consultarDatoPromedioIds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //consultar dato promedio de los sensores en especifico por ids
            try {
                const datos = yield datos_1.Dato.aggregate([
                    {
                        $group: {
                            _id: "$id_Sensor",
                            avg: {
                                $avg: "$dato"
                            }
                        },
                    },
                    {
                        $project: {
                            _id: "$_id",
                            avg: { $ceil: "$avg" }
                        }
                    },
                    {
                        $sort: {
                            avg: -1
                        }
                    },
                    {
                        $limit: 3
                    }
                ]);
                if (datos) {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
                else {
                    return res.status(201).json({
                        ok: true,
                        datos
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
            //returna
            // promedio
        });
    }
}
exports.default = Reportes;
