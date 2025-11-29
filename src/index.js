import express from 'express';
import 'dotenv/config';
import {WebSocketServer} from 'ws';
import {Logger} from '../services/Logger.js';
import {db} from '../config/db.js';

const app = express();
const logger = new Logger();
const server = app.listen(
    process.env.PORT,
    () => logger.info(`Server started on PORT ${process.env.PORT}`)
);

const wss = new WebSocketServer({
    server
});

const userSockets = new Map();

wss.on('listening', () => {
    logger.info(`Websocket server started on PORT ${process.env.PORT}`)
});

wss.on('connection', ws => {

});

const connecting = async () => {
    try {
        await db.authenticate();
        logger.info('DB connected successfully')
    } catch (e) {
        logger.error('DB connection error')
    }
};

connecting().then()