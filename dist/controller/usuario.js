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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = require("../models/usuario");
const jwt_1 = __importDefault(require("../helpers/jwt"));
const cloudinary_1 = __importDefault(require("../helpers/cloudinary"));
const generate_password_1 = require("generate-password");
const email_1 = __importDefault(require("../helpers/email"));
class Usuarios {
    static get instance() {
        return this._instance || (this._instance = new Usuarios());
    }
    crearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, nombre, apellido, password } = req.body;
            /* const email: string = req.body.email;
            const nombre: string = req.body.nombre;
            const apellido: string = req.body.apellido;
            const password: string = req.body.password; */
            try {
                const usuario = yield usuario_1.Usuario.findOne({ email });
                if (usuario) {
                    return res.status(400).json({
                        ok: false,
                        msg: `El usuario con email: ${email} ya existe`
                    });
                }
                const iusuario = {
                    email,
                    nombre,
                    apellido,
                    password
                };
                const dbUsuario = new usuario_1.Usuario(iusuario);
                const salt = bcryptjs_1.default.genSaltSync();
                dbUsuario.password = bcryptjs_1.default.hashSync(password, salt);
                const token = yield jwt_1.default.instance.generarJWT(dbUsuario.id, nombre, apellido);
                yield dbUsuario.save();
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
                });
            }
            catch (error) {
                return res.status(500).json({
                    ok: true,
                    msg: 'Hable con el administrador'
                });
            }
        });
    }
    loginUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const dbUsuario = yield usuario_1.Usuario.findOne({ email });
                if (!dbUsuario) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El correo no existe'
                    });
                }
                const validarPassword = bcryptjs_1.default.compareSync(password, dbUsuario.password);
                if (!validarPassword) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El password es incorrecto'
                    });
                }
                const token = yield jwt_1.default.instance.generarJWT(dbUsuario.id, dbUsuario.nombre, dbUsuario.apellido);
                let imagen = "";
                if (!dbUsuario.imagen) {
                    imagen = 'https://res.cloudinary.com/dkdwgznvg/image/upload/v1666217579/no-photo-id-auth-server.png';
                }
                else {
                    imagen = dbUsuario.imagen;
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
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
        });
    }
    revalidarToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid, nombre, apellido } = req;
            const dbUsuario = yield usuario_1.Usuario.findById(uid);
            const token = yield jwt_1.default.instance.generarJWT(uid, nombre, apellido);
            return res.json({
                ok: true,
                uid,
                nombre,
                apellido,
                email: dbUsuario === null || dbUsuario === void 0 ? void 0 : dbUsuario.email,
                token
            });
        });
    }
    actualizarImagenPerfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
                return res.status(400).json({
                    msg: 'No hay imagen que subir'
                });
            }
            const dbUsuario = yield usuario_1.Usuario.findById({ _id });
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
                cloudinary_1.default.instance.cloudinary.uploader.destroy(public_id);
            }
            try {
                const { tempFilePath } = req.files.imagen;
                const { secure_url } = yield cloudinary_1.default.instance.cloudinary.uploader.upload(tempFilePath);
                dbUsuario.imagen = secure_url;
                yield dbUsuario.save();
                return res.status(201).json({
                    ok: true,
                    imagen: dbUsuario.imagen
                });
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Error en la subida de la imagen'
                });
            }
        });
    }
    editarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, nombre, apellido, email } = req.body;
            try {
                const dbUsuario = yield usuario_1.Usuario.findOne({ email });
                if (dbUsuario && dbUsuario._id.toString() !== _id) {
                    return res.status(400).json({
                        ok: false,
                        msg: `El correo ${email} ya tiene una cuenta registrada`
                    });
                }
                const dbUser = yield usuario_1.Usuario.findById({ _id });
                if (!dbUser) {
                    return res.status(400).json({
                        ok: false,
                        msg: `El usuario con id ${_id} no existe`
                    });
                }
                const iusuario = {
                    nombre,
                    apellido,
                    email,
                    password: dbUser.password,
                    imagen: dbUser.imagen
                };
                const resUsuario = yield usuario_1.Usuario.updateOne({ _id }, {
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
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
        });
    }
    cambiarPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, password, newPassword } = req.body;
            console.log(req.body);
            try {
                const dbUsuario = yield usuario_1.Usuario.findById(_id);
                if (!dbUsuario) {
                    return res.status(400).json({
                        ok: false,
                        msg: `El usuario con id ${_id} no existe`
                    });
                }
                const validPassword = bcryptjs_1.default.compareSync(password, dbUsuario.password);
                if (!validPassword) {
                    return res.status(400).json({
                        ok: false,
                        msg: `El password es incorrecto`
                    });
                }
                const validNewPassword = bcryptjs_1.default.compareSync(newPassword, dbUsuario.password);
                if (validNewPassword) {
                    return res.status(400).json({
                        ok: false,
                        msg: `El nuevo password es igual al antiguo`
                    });
                }
                const salt = bcryptjs_1.default.genSaltSync();
                dbUsuario.password = bcryptjs_1.default.hashSync(newPassword, salt);
                dbUsuario.save();
                return res.status(201).json({
                    ok: true,
                    msg: `El email ${dbUsuario.email} ha cambiado de contraseña`
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
    recuperarPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, apellido, email } = req.body;
            try {
                const dbUser = yield usuario_1.Usuario.findOne({ email });
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
                const passwordNew = (0, generate_password_1.generate)({
                    length: 6,
                    numbers: true,
                    uppercase: false
                });
                const _id = dbUser.id;
                const salt = bcryptjs_1.default.genSaltSync();
                const iuser = {
                    nombre: dbUser.nombre,
                    apellido: dbUser.apellido,
                    email: dbUser.email,
                    imagen: dbUser.imagen,
                    password: bcryptjs_1.default.hashSync(passwordNew, salt)
                };
                const dbUsuario = yield usuario_1.Usuario.updateOne({ _id }, {
                    $set: iuser
                });
                if (!dbUsuario) {
                    return res.status(400).json({
                        ok: false,
                        msg: `El usuario con id ${_id} no se puedo actualizar`
                    });
                }
                email_1.default.instance.enviarEmail(email, passwordNew);
                return res.status(201).json({
                    ok: true,
                    msg: `Correo enviado a: ${email} satisfactoriamente`
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
}
exports.default = Usuarios;
