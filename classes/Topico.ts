import { Sensor } from "../models/sensor";
import { ISensor } from '../interfaces/sensor';


export default class Topico {

    private static _instance: Topico;
    
    constructor() {
    }

    public static get instance() {
        return this._instance || (this._instance = new Topico());
    }

    async consultarTopicos() {
        let _topicos: string[] = [];
        const topicos: ISensor[] = await Sensor.find();
        return new Promise<string[]>((resolve, reject) =>{
            if(topicos) {
                for(let topico of topicos) {
                    console.log(topico.topico);
                    _topicos.push(topico.topico);
                }
                resolve(_topicos);
            } else {
                reject(_topicos);
            }
        }) ;
        
        
    }

}