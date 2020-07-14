import * as http from 'http';
import * as WebSocket from 'ws';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET, MONGO_CONNECTION_STRING } from '../api/consts';
import { ConnectedEntity } from '../model/connectedEntity';
import { MongoClient } from 'mongodb';
import { GroupConnection } from '../data/groupConnection';

interface Conn {
    entity: ConnectedEntity
    ws: WebSocket
}

const connectedEntities: Conn[] = []

export const bindWsToServer = (server: http.Server) => {
    //initialize the WebSocket server instance
    const wss = new WebSocket.Server({ server, });

    wss.on('connection', (ws: WebSocket) => {
        let entity: ConnectedEntity | null = null;
        const sendObject = (obj: Object = {}) => {
            ws.send(JSON.stringify(obj));
        }
        //connection is up, let's add a simple simple event
        ws.on('message', (message: string) => {
            //log the received message and send it back to the client
            const msg = JSON.parse(message);
            const { command, payload } = msg;
            console.log(message);

            if (command === 'SET_TOKEN') {
                if (entity) {
                    sendObject({
                        message: 'You already provided a token',
                    });
                    return;
                }
                try {
                    const decoded = jwt.verify(payload, JWT_SECRET)
                    entity = decoded as ConnectedEntity;
                    connectedEntities.push({entity, ws});
                    if (entity.user) {
                        sendObject({
                            message: 'Hello, ' + entity.user?.email,
                        });
                    } else {
                    sendObject({
                        message: 'Hello, ' + entity.device?.deviceId,
                    });}
                } catch(e) {
                    console.log('Token invalid');
                    sendObject({
                        message: 'Token is not valid',
                    });
                    ws.close();
                }
            }
            if (!entity) {
                sendObject({
                    message: 'First message must be of a type "SET_TOKEN"',
                });
                ws.close();
                return;
            }
            switch (command) {
                case 'GET_ME': sendObject(entity?.user || entity?.device); break;
                case 'CONNECTION_COUNT': sendObject({ count: connectedEntities.length }); break;
                case 'GET_DEVICES': sendObject({ devices: connectedEntities.filter(e => e.entity.device).map(e => e.entity.device) }); break;
                case 'UPDATE_DEVICES': connectedEntities.filter(ce => ce.entity.device).forEach(ce => ce.ws.send(JSON.stringify({ command: 'UPDATE' }))); break;
                case 'START_DEVICES': connectedEntities.filter(ce => ce.entity.device).forEach(ce => ce.ws.send(JSON.stringify({ command: 'START' }))); break;
                case 'STOP_DEVICES': connectedEntities.filter(ce => ce.entity.device).forEach(ce => ce.ws.send(JSON.stringify({ command: 'STOP' }))); break;
                case 'GET_TASK': 
                    if (entity.device) {
                        const client = new MongoClient(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
                        const { groupId } = entity.device;
                        client.connect().then(() => {
                            const connection = new GroupConnection(client, entity as ConnectedEntity);
                            connection.getById(groupId).then((group) => {
                                sendObject({
                                    command: 'SET_TASK',
                                    payload: group?.tasks.find(task => task.isActive),
                                });
                                client.close();
                            });
                        });
                        
                    }
                    break;
            }
        });

        ws.on('close', (connection) => {
            // close user connection
            if (entity) {
                connectedEntities.splice(connectedEntities.findIndex(e => e.entity == entity), 1);
            }
        });
    });
};
