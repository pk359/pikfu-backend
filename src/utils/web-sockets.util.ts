import WebSocket, { Server as WebSocketServer } from 'ws';



function noop() { }

function heartbeat() {
    this.isAlive = true;
}

export const startWebSocketServer = ({ port }: { port: number }) => {
    const wss = new WebSocketServer({
        port
    });

    wss.on('connection', (ws) => {
        ws['isAlive'] = true;
        ws.on('pong', heartbeat);

        ws.on('message', (data, isBinary) => {
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(data, { binary: isBinary });
                }
            });
        });
    });

    const interval = setInterval(function ping() {
        wss.clients.forEach(function each(ws) {
            if (ws['isAlive'] === false) {return ws.terminate();}

            ws['isAlive'] = false;
            ws.ping(noop);
        });
    }, 30000);

    wss.on('close', function close() {
        clearInterval(interval);
    });

}