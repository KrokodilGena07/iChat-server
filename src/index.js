import express from 'express';
import 'dotenv/config';
import {WebSocketServer} from 'ws';
import {Logger} from './services/Logger.js';
import {db} from './config/db.js';
import cors from 'cors';
import url from 'url';
import {errorMiddleware} from './middlewares/errorMiddleware.js';

cors({
    origin: process.env.CLIENT_URL,
    credentials: true
});
const app = express();
const logger = new Logger();
const server = app.listen(
    process.env.PORT,
    () => logger.info(`Server started on PORT ${process.env.PORT}`)
);

app.use(errorMiddleware);

const wss = new WebSocketServer({
    server
});

const userSockets = new Map();

wss.on('listening', () => {
    logger.info(`Websocket server started on PORT ${process.env.PORT}`)
});

wss.on('connection', (ws, req) => {
    logger.log('User connected');

    const parsedUrl = url.parse(req.url, true);
    const token = parsedUrl.query.token;

    if (!token) {
        logger.error('User hasn\'t token');
        return ws.close(1003, 'unauthorized error');
    }
});

const connecting = async () => {
    try {
        await db.authenticate();
        logger.info('DB connected successfully')
    } catch (e) {
        logger.error('DB connection error')
    }
};

connecting().then();