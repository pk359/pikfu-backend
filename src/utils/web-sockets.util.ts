import WebSocket, { Server as WebSocketServer } from 'ws';
import { IWebSocketActions } from '../models';


export class WebSocketManager {
    static wss; 
    static init(server: any) {
        WebSocketManager.wss = new WebSocketServer({server});
        WebSocketManager.wss.on('connection', ws => {
            ws['isAlive'] = true;
            ws.on('pong', () => { ws['alive'] = true });
        })


        const interval = setInterval(function ping() {
            WebSocketManager.wss.clients.forEach((ws) => {
                if (ws['isAlive'] === false) { return ws.terminate(); }

                ws['isAlive'] = false;
                ws.ping(() => { });
            });
        }, 30000);

        WebSocketManager.wss.on('close', function close() {
            clearInterval(interval);
        });

    }

    static sendMessage(data: { action: IWebSocketActions; payload: any }) {
        WebSocketManager.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data || {}));
            }
        });
    }
}