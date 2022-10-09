import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';
import { IUsuario } from '../interfaces/usuario';
import { Usuario } from '../models/usuario';
import JwtGenerate from '../helpers/jwt';


export default class Usuarios {

    private static _instance: Usuarios;

    public static get instance() {
        return this._instance || (this._instance = new Usuarios());
    }

    async crearUsuario(req: Request | any, res: Response) {

        const { email, nombre, apellido, password } = req.body;

        /* const email: string = req.body.email;
        const nombre: string = req.body.nombre;
        const apellido: string = req.body.apellido;
        const password: string = req.body.password; */

        try {
            const usuario = await Usuario.findOne({ email });

            if (usuario) {
                return res.status(400).json({
                    ok: false,
                    msg: `El usuario con email: ${email} ya existe`
                })
            }

            const iusuario: IUsuario = {
                email,
                nombre,
                apellido,
                password
            }

            const dbUsuario = new Usuario(iusuario);

            const salt = bcryptjs.genSaltSync();
            dbUsuario.password = bcryptjs.hashSync(password, salt);

            const token = await JwtGenerate.instance.generarJWT(dbUsuario.id, nombre, apellido);

            await dbUsuario.save();

            return res.status(201).json({
                ok: true,
                uid: dbUsuario.id,
                nombre,
                apellido,
                email,
                token
            })


        } catch (error) {
            return res.status(500).json({
                ok: true,
                msg: 'Hable con el administrador'
            })
        }

    }

    async loginUsuario(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const dbUsuario = await Usuario.findOne({ email });
            if (!dbUsuario) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo no existe'
                });
            }

            const validarPassword = bcryptjs.compareSync(password, dbUsuario.password);

            if (!validarPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El password es incorrecto'
                });
            }

            const token = await JwtGenerate.instance.generarJWT(dbUsuario.id, dbUsuario.nombre, dbUsuario.apellido);

            console.log('token', token);
            return res.json({
                ok: true,
                uid: dbUsuario.id,
                nombre: dbUsuario.nombre,
                apellido: dbUsuario.apellido,
                email: dbUsuario.email,
                token: token
            });

        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            })
        }
    }

    async revalidarToken(req: Request | any, res: Response) {

        const { uid, nombre, apellido } = req;

        const dbUsuario = await Usuario.findById(uid);

        const token = await JwtGenerate.instance.generarJWT(uid, nombre, apellido);

        return res.json({
            ok: true,
            uid,
            nombre,
            apellido,
            email: dbUsuario?.email,
            token
        });


    }

}