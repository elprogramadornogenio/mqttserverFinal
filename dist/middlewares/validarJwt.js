"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const enviorenment_1 = require("../global/enviorenment");
class ValidarJwt {
    static get instance() {
        return this._instance || (this._instance = new ValidarJwt());
    }
    validarJWT(req, res, next) {
        const token = req.header('x-token');
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'error no existe token'
            });
        }
        try {
            const objToken = (0, jsonwebtoken_1.verify)(token, enviorenment_1.SECRET_JWT);
            const { uid, nombre, apellido } = objToken;
            req.uid = uid;
            req.nombre = nombre;
            req.apellido = apellido;
        }
        catch (error) {
            return res.status(401).json({
                ok: false,
                msg: 'token no valido'
            });
        }
        next();
    }
}
exports.default = ValidarJwt;
