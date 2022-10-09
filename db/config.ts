import mongoose from 'mongoose';
import { DB_CNN } from '../global/enviorenment';


export default class DbConnection {

    private static _instance: DbConnection;
    private uri: string;

    constructor() {
        this.uri = DB_CNN;
    }

    public static get instance() {
        return this._instance || (this._instance = new DbConnection());
    }

    async dbConnection (): Promise<void> {
        try {
            await mongoose.connect(this.uri, {

            });

            console.log('Base de datos conectada');
        } catch (error) {

            console.log(error);

            throw new Error('Error al momento de inicializar base de datos');
            
        }
    }

    


}