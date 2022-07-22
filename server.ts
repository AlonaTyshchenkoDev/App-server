import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import mongoose from 'mongoose';
import router from './router';

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
app.use('/api', router);

async function startApp(){
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
    }catch(e){
        console.log(e);
    }
}

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        ws.send(`${message}`);
    });
});

startApp();