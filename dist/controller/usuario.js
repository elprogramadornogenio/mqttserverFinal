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
                return res.status(201).json({
                    ok: true,
                    uid: dbUsuario.id,
                    nombre,
                    apellido,
                    email,
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
                console.log('token', token);
                return res.json({
                    ok: true,
                    uid: dbUsuario.id,
                    nombre: dbUsuario.nombre,
                    apellido: dbUsuario.apellido,
                    email: dbUsuario.email,
                    token: token
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
}
exports.default = Usuarios;
