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
Object.defineProperty(exports, "__esModule", { value: true });
const sensor_1 = require("../models/sensor");
class Topico {
    constructor() {
    }
    static get instance() {
        return this._instance || (this._instance = new Topico());
    }
    consultarTopicos() {
        return __awaiter(this, void 0, void 0, function* () {
            let _topicos = [];
            const topicos = yield sensor_1.Sensor.find();
            return new Promise((resolve, reject) => {
                if (topicos) {
                    for (let topico of topicos) {
                        console.log(topico.topico);
                        _topicos.push(topico.topico);
                    }
                    resolve(_topicos);
                }
                else {
                    reject(_topicos);
                }
            });
        });
    }
}
exports.default = Topico;
