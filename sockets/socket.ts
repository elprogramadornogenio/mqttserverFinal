import { Server, Socket } from "socket.io";


export default class SocketFunction {
    private static _instance: SocketFunction;

    public static get instance() {
        return this._instance || (this._instance = new SocketFunction());
    }

    public recibirMensaje(cliente: Socket, io: Server, topicos: string[]) {
        for(let topico of topicos ){
            cliente.on(topico, (payload : any)=>{
                console.log(`Socket con topico: ${topico}`);
            })
        }
    }

    public enviarMensaje(cliente: Socket, topico: string, dato: number) {
        console.log(topico, dato);
        cliente.emit(topico, dato);
    }

    public desconectar(cliente: Socket, io: Server){
        cliente.on('disconnect', ()=>{
            console.log(`Cliente ${cliente.id} desconectado`);
        });
    }
    
}

