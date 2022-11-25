import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';
import { IUsuario } from '../interfaces/usuario';
import { Usuario } from '../models/usuario';
import JwtGenerate from '../helpers/jwt';
import Imagen from '../helpers/cloudinary';
import { generate } from 'generate-password';
import Email from '../helpers/email';

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

            let imagen = "";

            if (!dbUsuario.imagen) {
                imagen = 'https://res.cloudinary.com/dkdwgznvg/image/upload/v1666217579/no-photo-id-auth-server.png';
            }

            return res.status(201).json({
                ok: true,
                uid: dbUsuario.id,
                nombre,
                apellido,
                email,
                imagen,
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

            let imagen = "";

            if (!dbUsuario.imagen) {
                imagen = 'https://res.cloudinary.com/dkdwgznvg/image/upload/v1666217579/no-photo-id-auth-server.png';
            } else {
                imagen = dbUsuario.imagen
            }
            return res.json({
                ok: true,
                uid: dbUsuario.id,
                nombre: dbUsuario.nombre,
                apellido: dbUsuario.apellido,
                email: dbUsuario.email,
                token: token,
                imagen
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

    async actualizarImagenPerfil(req: Request | any, res: Response) {
        const { _id } = req.params;

        if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
            return res.status(400).json({
                msg: 'No hay imagen que subir'
            });
        }

        const dbUsuario = await Usuario.findById({ _id });

        if (!dbUsuario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe el usuario con id ${_id}`
            });
        }

        if (dbUsuario.imagen) {
            const nombreArr = dbUsuario.imagen.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            Imagen.instance.cloudinary.uploader.destroy(public_id);
        }

        try {
            const { tempFilePath } = req.files.imagen;

            const { secure_url } = await Imagen.instance.cloudinary.uploader.upload(tempFilePath);

            dbUsuario.imagen = secure_url;

            await dbUsuario.save();

            return res.status(201).json({
                ok: true,
                imagen: dbUsuario.imagen
            });

        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Error en la subida de la imagen'
            })
        }
    }

    async editarUsuario(req: Request, res: Response) {
        const { _id, nombre, apellido, email } = req.body;

        try {
            const dbUsuario = await Usuario.findOne({ email });

            if (dbUsuario && dbUsuario._id.toString() !== _id) {
                return res.status(400).json({
                    ok: false,
                    msg: `El correo ${email} ya tiene una cuenta registrada`
                });
            }

            const dbUser = await Usuario.findById({ _id });

            if (!dbUser) {
                return res.status(400).json({
                    ok: false,
                    msg: `El usuario con id ${_id} no existe`
                });
            }

            const iusuario: IUsuario = {
                nombre,
                apellido,
                email,
                password: dbUser.password,
                imagen: dbUser.imagen
            }

            const resUsuario = await Usuario.updateOne({ _id }, {
                $set: iusuario
            });

            if (!resUsuario) {
                return res.status(400).json({
                    ok: false,
                    msg: `El usuario con id ${_id} no se puedo actualizar`
                });
            }

            return res.status(201).json({
                ok: true,
                msg: `El usuario con id ${_id} se ha actualizado exitosamente`
            });
        } catch (error) {

            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            })

        }
    }

    async cambiarPassword(req: Request, res: Response) {

        const { _id, password, newPassword } = req.body;

        console.log(req.body);

        try {
            const dbUsuario = await Usuario.findById(_id);

            if (!dbUsuario) {
                return res.status(400).json({
                    ok: false,
                    msg: `El usuario con id ${_id} no existe`
                });
            }

            const validPassword = bcryptjs.compareSync(password, dbUsuario.password);

            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: `El password es incorrecto`
                });
            }

            const validNewPassword = bcryptjs.compareSync(newPassword, dbUsuario.password);

            if (validNewPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: `El nuevo password es igual al antiguo`
                });
            }

            const salt = bcryptjs.genSaltSync();
            dbUsuario.password = bcryptjs.hashSync(newPassword, salt);

            dbUsuario.save();

            return res.status(201).json({
                ok: true,
                msg: `El email ${dbUsuario.email} ha cambiado de contraseña`
            });


        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    }

    async recuperarPassword(req: Request, res: Response) {
        const { nombre, apellido, email } = req.body;

        try {
            const dbUser = await Usuario.findOne({ email });

            if (!dbUser) {
                return res.status(400).json({
                    ok: false,
                    msg: `El email es incorrecto`
                });
            }

            if (dbUser.nombre !== nombre) {
                return res.status(400).json({
                    ok: false,
                    msg: `El nombre es incorrecto`
                });
            }

            if (dbUser.apellido !== apellido) {
                return res.status(400).json({
                    ok: false,
                    msg: `El apellido es incorrecto`
                });
            }

            const passwordNew = generate({
                length: 6,
                numbers: true,
                uppercase: false
            });

            const _id = dbUser.id;
            const salt = bcryptjs.genSaltSync();

            const iuser: IUsuario = {
                nombre: dbUser.nombre,
                apellido: dbUser.apellido,
                email: dbUser.email,
                imagen: dbUser.imagen,
                password: bcryptjs.hashSync(passwordNew, salt)
            }

            const dbUsuario = await Usuario.updateOne({ _id }, {
                $set: iuser
            });

            if (!dbUsuario) {
                return res.status(400).json({
                    ok: false,
                    msg: `El usuario con id ${_id} no se puedo actualizar`
                });
            }

            Email.instance.enviarEmail(email, passwordNew);

            return res.status(201).json({
                ok: true,
                msg: `Correo enviado a: ${email} satisfactoriamente`
            });


        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    }

}