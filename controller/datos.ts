import { Response, Request } from 'express';
import { Dato } from '../models/datos';
import { IDato } from '../interfaces/datos';
import { Sensor } from '../models/sensor';



export default class Datos {

    private static _instance: Datos;

    public static get instance() {
        return this._instance || (this._instance = new Datos());
    }

    async crearDatos(req: Request, res: Response) {


        const id_Sensor: string = req.body.id_Sensor;
        const dato: number = Number(req.body.dato);
        const fecha = new Date();

        const idato: IDato = {
            id_Sensor,
            dato,
            fecha
        }

        try {
            const dbDato = new Dato(idato);

            await dbDato.save();

            return res.status(201).json({
                ok: true,
                msg: 'El dato se ha creado'
            });

        } catch (error) {
            //console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    }

    async guardarDatos(topico: string, dato: number) {
        try {
            const sensor = await Sensor.findOne({ topico });

            if (sensor) {
                const idato: IDato = {
                    id_Sensor: sensor.id,
                    dato,
                    fecha: new Date()
                }
                const dbDato = new Dato(idato);
                await dbDato.save();
            }

        } catch (error) {
            console.log('dato no se pudo guardar');
        }
    }

    async consultarDatos(req: Request | any, res: Response) {
        const { id } = req.query;
        console.log('111111111', id);
        try {
            const datos: IDato[] = await Dato.find({ id_Sensor: id }).sort({ $natural: -1 }).limit(5);
            if (datos.length !== 0) {
                return res.status(201).json({
                    ok: true,
                    datos: datos.reverse()
                });
            } else {
                return res.status(201).json({
                    ok: true,
                    datos: []
                });
            }


        } catch (error) {
            //console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }

    }

}