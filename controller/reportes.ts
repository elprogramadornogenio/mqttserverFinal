import { Response, Request } from 'express';
import { Dato } from '../models/datos';

export default class Reportes {

    private static _instance: Reportes;

    public static get instance() {
        return this._instance || (this._instance = new Reportes());
    }

    //primera consulta
    async consultarDatosFecha(req: Request | any, res: Response) {
        //fecha inicial
        //fecha final
        const fecha_ini: Date = req.body.fecha_ini;
        const fecha_final: Date = req.body.fecha_final;

        try {
            const datos = await Dato.find({ fecha: { $gte: fecha_ini, $lte: fecha_final } }).sort({ $natural: -1 }).limit(5);
            if (datos) {
                return res.status(201).json({
                    ok: true,
                    datos
                });

            } else {
                return res.status(201).json({
                    ok: true,
                    datos
                });
            }

        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });

        }
        //returna
        // fechas y datos
    }
    // Segunda consulta
    async consultarDatosFechaId(req: Request | any, res: Response) {
        //id_Sensor
        //fecha inicial
        //fecha final
        const id_Sensor: string = req.body.id_Sensor;
        const fecha_ini: Date = req.body.fecha_ini;
        const fecha_final: Date = req.body.fecha_final;

        try {
            const datos = await Dato.find({ id_Sensor, fecha: { $gte: fecha_ini, $lte: fecha_final } }).limit(5);
            if (datos) {
                return res.status(201).json({
                    ok: true,
                    datos
                });

            } else {
                return res.status(201).json({
                    ok: true,
                    datos
                });
            }

        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });

        }
        //returna
        // fechas y datos
    }

    //tercera consulta
    async consultarDatoMayor(req: Request | any, res: Response) {
        //consultar dato mayor

        try {
            const datos = await Dato.find().sort({ dato: -1 }).limit(1);
            console.log(datos);
            if (datos) {
                return res.status(201).json({
                    ok: true,
                    datos
                });

            } else {
                return res.status(201).json({
                    ok: true,
                    datos
                });
            }

        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });

        }

        //returna
        // fechas y dato mayor id sensor
    }
    // Consultar dato mayor por ids
    async consultarDatoMayorIds(req: Request | any, res: Response) {
        //consultar dato mayor

        try {
            const datos = await Dato.aggregate([
                {
                    $group: {
                        _id: "$id_Sensor",
                        max: {$max: "$dato"}
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

            } else {
                return res.status(201).json({
                    ok: true,
                    datos
                });
            }

        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });

        }

        //returna
        // fechas y dato mayor id sensor
    }

    async consultarDatoMayorId(req: Request | any, res: Response) {
        //
        //consultar dato mayor
        const id_Sensor: string = req.body.id_Sensor;

        try {
            const datos = await Dato.find({ id_Sensor }).sort({ dato: -1 }).limit(1);
            console.log(datos);
            if (datos) {
                return res.status(201).json({
                    ok: true,
                    datos
                });

            } else {
                return res.status(201).json({
                    ok: true,
                    datos
                });
            }

        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });

        }

        //returna
        // fechas y dato mayor
    }

    // tercera consulta
    async consultarDatoMenor(req: Request | any, res: Response) {

        //consultar dato menor
        try {
            const datos = await Dato.find().sort({ dato: 1 }).limit(1);
            console.log(datos);
            if (datos) {
                return res.status(201).json({
                    ok: true,
                    datos
                });

            } else {
                return res.status(201).json({
                    ok: true,
                    datos
                });
            }

        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });

        }

        //returna
        // fechas y dato menor id sensor
    }

    // Consultar dato menor por ids
    async consultarDatoMenorIds(req: Request | any, res: Response) {
        //consultar dato menor

        try {
            const datos = await Dato.aggregate([
                {
                    $group: {
                        _id: "$id_Sensor",
                        min: {$min: "$dato"}
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

            } else {
                return res.status(201).json({
                    ok: true,
                    datos
                });
            }

        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });

        }

        //returna
        // fechas y dato mayor id sensor
    }

    async consultarDatoMenorId(req: Request | any, res: Response) {

        const id_Sensor: string = req.body.id_Sensor;
        //consultar dato menor
        try {
            const datos = await Dato.find({ id_Sensor }).sort({ dato: 1 }).limit(1);
            console.log(datos);
            if (datos) {
                return res.status(201).json({
                    ok: true,
                    datos
                });

            } else {
                return res.status(201).json({
                    ok: true,
                    datos
                });
            }

        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });

        }

        //returna
        // fechas y dato menor
    }

    async consultarDatoPromedio(req: Request | any, res: Response) {

        //consultar dato promedio de todos los sensores
        try {

            const datos = await Dato.aggregate(
                [
                    {
                        $group:
                        {
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
                ]
            );
            if (datos) {
                return res.status(201).json({
                    ok: true,
                    datos
                });

            } else {
                return res.status(201).json({
                    ok: true,
                    datos
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });

        }

        //returna
        // promedio
    }

    async consultarDatoPromedioId(req: Request | any, res: Response) {

        const id_Sensor: string = req.body.id_Sensor;
        //consultar dato promedio de los sensores en especifico por id
        console.log(id_Sensor)
        try {

            const datos = await Dato.aggregate(
                [
                    {
                        $match: {id_Sensor}
                    },
                    {
                        $group:
                        {
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

                ]
            );
            if (datos) {
                return res.status(201).json({
                    ok: true,
                    datos
                });

            } else {
                return res.status(201).json({
                    ok: true,
                    datos
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });

        }

        //returna
        // promedio
    }

    async consultarDatoPromedioIds(req: Request | any, res: Response) {

        //consultar dato promedio de los sensores en especifico por ids
        try {

            const datos = await Dato.aggregate(
                [
                    {
                        $group:
                        {
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
                ]
            );
            if (datos) {
                return res.status(201).json({
                    ok: true,
                    datos
                });

            } else {
                return res.status(201).json({
                    ok: true,
                    datos
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });

        }

        //returna
        // promedio
    }

}