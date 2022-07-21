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
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const mongoose_1 = require("mongoose");
const router_1 = require("./router");
const PORT = 8999;
const app = express();
const server = http.createServer(app);
const DB_URL = 'mongodb+srv://Admin:Admin@cluster0.7s8yi.mongodb.net/?retryWrites=true&w=majority';
const wss = new WebSocket.Server({ server });
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});
app.use(express.json());
app.use('/api', router_1.default);
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(DB_URL);
            app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
        }
        catch (e) {
            console.log(e);
        }
    });
}
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        ws.send(`${message}`);
    });
});
startApp();
//# sourceMappingURL=server.js.map