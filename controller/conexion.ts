import { Request, Response } from "express";
import ProbarConexion from "../classes/ProbarMqtt";
import ServerMqtt from "../classes/ServerMqtt";


export default class Conexion {

    private static _instance: Conexion;

    public static get instance() {
        return this._instance || (this._instance = new Conexion());
    }

    async probarConexion(req: Request, res: Response) {

        const { topico } = req.body;

        try {

            const probarConexion = new ProbarConexion(topico);

            probarConexion.inicializarProbarConexion();

            await new Promise(resolve => setTimeout(() => {
                const conexion = probarConexion.booleanConexion();
                if (conexion) {
                    return res.status(201).json({
                        prueba: conexion,
                        msg: 'El sensor esta conectado'
                    });
                } else {
                    return res.status(201).json({
                        prueba: conexion,
                        msg: 'El sensor no esta conectado'
                    });
                }
            }, 5000));

        } catch (error) {
            //console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    }
}