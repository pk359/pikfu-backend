"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketManager = void 0;
const ws_1 = __importStar(require("ws"));
class WebSocketManager {
    static init(server) {
        WebSocketManager.wss = new ws_1.Server({ server });
        WebSocketManager.wss.on('connection', ws => {
            ws['isAlive'] = true;
            ws.on('pong', () => { ws['alive'] = true; });
        });
        const interval = setInterval(function ping() {
            WebSocketManager.wss.clients.forEach((ws) => {
                if (ws['isAlive'] === false) {
                    return ws.terminate();
                }
                ws['isAlive'] = false;
                ws.ping(() => { });
            });
        }, 30000);
        WebSocketManager.wss.on('close', function close() {
            clearInterval(interval);
        });
    }
    static sendMessage(data) {
        WebSocketManager.wss.clients.forEach((client) => {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(JSON.stringify(data || {}));
            }
        });
    }
}
exports.WebSocketManager = WebSocketManager;
//# sourceMappingURL=web-sockets.util.js.map