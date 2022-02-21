import { v4 } from "uuid";
import { store } from './store'

if(!localStorage.getItem("user_id")) localStorage.setItem('user_id', v4());

class SketchSocket {
    constructor() {
        this.user_id = v4();
        // this.socket = new WebSocket(`ws://${window.location.hostname}:5000`);
        // this.socket.onopen = this.onopen;
        // this.socket.onmessage = this.onmessage;
    }

    send = (msg) => {
        console.log(JSON.stringify({...msg, id: this.user_id}))
        this.socket.send(JSON.stringify({...msg, id: this.user_id}))

    }
    onopen = e => {
        console.log("[open]");
        this.send({ method: "connection" })
    }

    onmessage = (e) => {
        console.log(`[message]: ${e.data}`);
        const msg = JSON.parse(e.data);

        if(msg.method == "sync") {
            store.dispatch(msg)
        }
    }

    sync = (action) => {

        this.send({
            
            method: "sync",
            ...action
        });
    }
}



export default new SketchSocket();