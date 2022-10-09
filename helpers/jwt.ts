import { sign } from 'jsonwebtoken';
import { SECRET_JWT } from '../global/enviorenment';


export default class JwtGenerate{

    private static _instance: JwtGenerate;

    

    public static get instance() {
        return this._instance || (this._instance = new JwtGenerate());
    }

    generarJWT(uid: string, nombre: string, apellido: string): Promise<unknown> {

        const payload = {uid, nombre, apellido};

        return new Promise((resolve, reject) =>{
            sign(payload, SECRET_JWT, {
                expiresIn: '24h'
            }, (error, token) =>{
                if(error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve(token);
                }
            })
        })
    }


}