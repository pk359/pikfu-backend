"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_listeners_1 = require("./utils/route-listeners");
const utils_1 = require("./utils");
const web_sockets_util_1 = require("./utils/web-sockets.util");
// The Express app is exported so that it can be used by serverless Functions.
const app = () => {
    const server = (0, express_1.default)();
    server.use((0, cors_1.default)(utils_1.corsOptions));
    server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,access-token,Access-Control-Allow-Methods,grant_type");
        next();
    });
    // gzip
    server.use((0, compression_1.default)());
    // cokies
    server.use((0, cookie_parser_1.default)());
    server.use(body_parser_1.default.json({ limit: "50mb" }));
    server.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
    (0, route_listeners_1.listenForApis)(server);
    return server;
};
function run() {
    const port = utils_1.environments.PORT || 2001;
    utils_1.DatabaseService.initialize();
    // Start up the Node server
    const server = app();
    const listener = server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
    web_sockets_util_1.WebSocketManager.init(listener);
}
run();
//# sourceMappingURL=main.js.map