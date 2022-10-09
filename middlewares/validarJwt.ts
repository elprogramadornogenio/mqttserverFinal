import {Response, Request, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_JWT } from '../global/enviorenment';

export default class ValidarJwt {

    private static _instance: ValidarJwt;

    public static get instance() {
        return this._instance || (this._instance = new ValidarJwt());
    }

    validarJWT(req: Request | any, res: Response, next: NextFunction) {
        
        const token = req.header('x-token');
        if(!token) {
            return res.status(401).json({
                ok: false,
                msg: 'error no existe token'
            });
        }

        try {
            const objToken: any = verify(token, SECRET_JWT);
            
            const {uid, nombre, apellido} = objToken;

            req.uid = uid;
            req.nombre = nombre;
            req.apellido = apellido;


        } catch (error) {
            return res.status(401).json({
                ok: false,
                msg: 'token no valido'
            });
        }

        next();
    }
}