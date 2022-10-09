import { Response, Request } from 'express';
import { Sensor } from '../models/sensor';
import { ISensor } from '../interfaces/sensor';
import ServerMqtt from '../classes/ServerMqtt';
import { Dato } from '../models/datos';


export default class Sensores {
    private static _instance: Sensores;

    public static get instance() {
        return this._instance || (this._instance = new Sensores());
    }

    async crearSensor(req: Request | any, res: Response) {

        const { id_Usuario, nombre, tipo, topico } = req.body;
        /* const id_Usuario: string = req.body.id_Usuario;
        const nombre: string = req.body.nombre;
        const tipo: string = req.body.tipo;
        const topico: string = req.body.topico; */

        try {

            const sensor = await Sensor.findOne({ nombre });

            if (sensor) {
                return res.status(400).json({
                    ok: false,
                    msg: `El sensor con nombre: ${nombre} ya existe`
                })
            }

            const topic = await Sensor.findOne({ topico });

            if (topic) {
                return res.status(400).json({
                    ok: false,
                    msg: `El sensor con topico: ${topico} ya existe`
                })
            }

            const isensor: ISensor = {
                nombre,
                tipo,
                id_Usuario,
                topico
            }

            const dbSensor = new Sensor(isensor)

            await dbSensor.save();

            const mqtt = ServerMqtt.instance.client;

            mqtt.subscribe(topico);

            return res.status(201).json({
                ok: true,
                msg: 'El sensor se ha creado exitosamente'
            });

        } catch (error) {

            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    }

    async editarSensor(req: Request | any, res: Response) {

        const { _id, id_Usuario, nombre, tipo, topico } = req.body;

        const sensor = await Sensor.findOne({ nombre });
        console.log("editar", sensor?.nombre, nombre);
        console.log("editar", sensor?._id.toString(), _id);
        if (sensor?.nombre === nombre && sensor?._id.toString() !== _id) {
            return res.status(400).json({
                ok: false,
                msg: `El sensor con nombre: ${nombre} ya existe en otro sensor`
            })
        }

        const topic = await Sensor.findOne({ topico });

        if (topic?.topico === topico && topic?._id.toString() !== _id) {
            return res.status(400).json({
                ok: false,
                msg: `El sensor con topico: ${topico} ya existe en otro sensor`
            })
        }

        const dbSensor = await Sensor.findById(_id);

        if (topico !== dbSensor?.topico) {
            const mqtt = ServerMqtt.instance.client;
            mqtt.unsubscribe(dbSensor?.topico!);
            mqtt.subscribe(topico);
        }


        const isensor: ISensor = {
            nombre,
            tipo,
            id_Usuario,
            topico
        }

        try {
            const sensor = await Sensor.updateOne({ _id }, {
                $set: isensor
            });

            if (!sensor) {
                return res.status(400).json({
                    ok: false,
                    msg: `El Sensor no se ha podido actualizar`
                })
            } else {
                return res.status(201).json({
                    ok: true,
                    msg: 'El Sensor se ha actualizado exitosamente'
                });
            }
        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    }

    async eliminarSensor(req: Request | any, res: Response) {

        const id: string = req.query.id;
        try {

            const sensor = await Sensor.deleteOne({ _id: id });
            if (sensor.acknowledged && sensor.deletedCount) {
                return res.status(201).json({
                    ok: true,
                    msg: 'El Sensor se ha eliminado exitosamente'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    msg: `No se ha podido encontrar información de sensor`
                })
            }
        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    }
    async eliminarDatosSensor(req: Request | any, res: Response) {
        
        const id_Sensor: string = req.query.id_Sensor;
        const topico: string = req.query.topico;

        try {
            const datos = await Dato.deleteMany({ id_Sensor });
            console.log(datos)
            if (datos.acknowledged && datos.deletedCount) {
                const mqtt = ServerMqtt.instance.client;
                mqtt.unsubscribe(topico!);
                return res.status(201).json({
                    ok: true,
                    msg: 'El Sensor y los datos se ha eliminado exitosamente'
                });
            }

            return res.status(201).json({
                ok: true,
                msg: 'El Sensor no tiene datos registrados'
            });

        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador de esto'
            });
        }
    }

    async listarSensores(req: Request, res: Response) {
        try {

            const sensor: ISensor[] = await Sensor.find();

            if (sensor.length !== 0) {
                return res.status(200).json({
                    ok: true,
                    listaSensores: sensor
                })
            } else {
                return res.status(200).json({
                    ok: true
                })
            }
        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    }

    async listarSensoresUsuario(req: Request, res: Response) {

        const { id } = req.query;
        console.log(id);
        try {

            const sensor: ISensor[] = await Sensor.find({ id_Usuario: id });
            if (sensor.length !== 0) {
                return res.status(200).json({
                    ok: true,
                    listaSensores: sensor
                })
            } else {
                return res.status(200).json({
                    ok: true,
                    listarSensores: []
                })
            }
        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    }

    async buscarSensor(req: Request | any, res: Response) {

        const { id } = req.query;
        try {

            const sensor = await Sensor.findById(id);

            if (sensor) {
                return res.status(200).json({
                    ok: true,
                    listaSensores: [sensor]
                })
            } else {
                return res.status(200).json({
                    ok: true,
                    sensor: []
                })
            }
        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    }

}