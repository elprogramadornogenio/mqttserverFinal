"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_result_1 = require("express-validator/src/validation-result");
class ValidarCampos {
    static get instance() {
        return this._instance || (this._instance = new ValidarCampos());
    }
    validarCampos(req, res, next) {
        const error = (0, validation_result_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                ok: false,
                errors: error.mapped()
            });
        }
        next();
    }
}
exports.default = ValidarCampos;
